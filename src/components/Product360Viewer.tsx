import { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCw, Pause, Play, RefreshCw, Maximize2, Minimize2, Loader2, Sparkles } from 'lucide-react';
import { preloadFrames } from '../modules/media-loader';
import { renderFrame, wrapIndex, dragToFrame, type DragState } from '../modules/sequence-viewer';
import { Button } from './ui/button';

interface Product360ViewerProps {
  sequenceId: string;
  frameCount: number;
  productName: string;
  posterImage?: string;
  className?: string;
  autoRotateDefault?: boolean;
}

export default function Product360Viewer({
  sequenceId,
  frameCount,
  productName,
  posterImage,
  className = '',
  autoRotateDefault = true,
}: Product360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);

  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotateDefault);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStateRef = useRef<DragState>({ isDragging: false, startX: 0, startFrame: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    frameRef.current = currentFrame;
  }, [currentFrame]);

  // Draw current frame on canvas
  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderFrame(canvas, imagesRef.current, index);
  }, []);

  const [prevSequenceId, setPrevSequenceId] = useState(sequenceId);

  if (sequenceId !== prevSequenceId) {
    setPrevSequenceId(sequenceId);
    setIsLoading(true);
    setLoadError(false);
  }

  // Preload frames progressively
  useEffect(() => {
    let isCancelled = false;

    preloadFrames(
      sequenceId,
      frameCount,
      6, // Priority frames for instant first render
      () => {
        if (!isCancelled) {
          setIsLoading(false);
          draw(0);
        }
      }
    )
      .then((loadedImages) => {
        if (isCancelled) return;
        imagesRef.current = loadedImages;
        setIsLoading(false);
        draw(frameRef.current);
      })
      .catch((err) => {
        console.error('Failed to load 360 sequence:', err);
        if (!isCancelled) {
          setLoadError(true);
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [sequenceId, frameCount, draw]);

  // Adjust canvas size for crisp HiDPI rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        draw(frameRef.current);
      }
    });

    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [draw]);

  // Redraw when currentFrame updates
  useEffect(() => {
    draw(currentFrame);
  }, [currentFrame, draw]);

  // Auto-rotation loop using requestAnimationFrame
  useEffect(() => {
    if (!isAutoRotating || isLoading) return;

    let animId: number;
    let lastTime = performance.now();
    const frameDuration = 1000 / 24; // ~24 fps turntable spin

    const tick = (now: number) => {
      const delta = now - lastTime;
      if (delta >= frameDuration) {
        const framesToAdvance = Math.max(1, Math.floor(delta / frameDuration));
        setCurrentFrame((prev) => wrapIndex(prev + framesToAdvance, frameCount));
        lastTime = now;
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotating, isLoading, frameCount]);

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (clientX: number) => {
    setIsAutoRotating(false);
    setHasInteracted(true);
    setIsDragging(true);
    dragStateRef.current = {
      isDragging: true,
      startX: clientX,
      startFrame: frameRef.current,
    };
  };

  const handlePointerMove = (clientX: number) => {
    if (!dragStateRef.current.isDragging) return;
    const newFrame = dragToFrame(dragStateRef.current, clientX, frameCount, 8);
    setCurrentFrame(newFrame);
  };

  const handlePointerUp = () => {
    dragStateRef.current.isDragging = false;
    setIsDragging(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setIsAutoRotating(false);
      setHasInteracted(true);
      setCurrentFrame((prev) => wrapIndex(prev - 1, frameCount));
    } else if (e.key === 'ArrowRight') {
      setIsAutoRotating(false);
      setHasInteracted(true);
      setCurrentFrame((prev) => wrapIndex(prev + 1, frameCount));
    } else if (e.key === ' ') {
      e.preventDefault();
      setIsAutoRotating((prev) => !prev);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Degrees calculated from current frame
  const degrees = Math.round((currentFrame / frameCount) * 360);

  if (loadError && posterImage) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#F8FAFC] ${className}`}>
        <img src={posterImage} alt={productName} className="h-full w-full object-contain" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label={`360 interactive view of ${productName}`}
      onKeyDown={handleKeyDown}
      className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#E2E8F0] bg-gradient-to-b from-[#FFFFFF] to-[#F8FAFC] select-none outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
      onMouseDown={(e) => handlePointerDown(e.clientX)}
      onMouseMove={(e) => handlePointerMove(e.clientX)}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
      onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
      onTouchEnd={handlePointerUp}
    >
      {/* 360 Degree Canvas */}
      <canvas
        ref={canvasRef}
        className="h-full w-full object-contain touch-none"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/75 backdrop-blur-xs transition-opacity">
          <Loader2 className="h-8 w-8 animate-spin text-[#C2410C]" />
          <p className="mt-2 font-['DM_Sans'] text-xs font-semibold text-[#64748B]">Loading 3D Turntable...</p>
        </div>
      )}

      {/* Interactive Guidance Hint Pill */}
      {!hasInteracted && !isLoading && (
        <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 animate-pulse flex items-center gap-1.5 rounded-full bg-black/75 px-3.5 py-1 text-xs font-medium text-white shadow-md backdrop-blur-md">
          <RotateCw size={13} className="text-[#FDBA74]" />
          <span>Drag or swipe to rotate 360°</span>
        </div>
      )}

      {/* Degree Badge Pill */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-bold text-[#1E293B] shadow-sm backdrop-blur-md border border-[#E2E8F0]/80">
        <Sparkles size={13} className="text-[#C2410C]" />
        <span>{degrees}° view</span>
        <span className="text-[#94A3B8]">({currentFrame + 1}/{frameCount})</span>
      </div>

      {/* Interactive Controls Overlay */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-xl bg-white/90 p-1 shadow-sm backdrop-blur-md border border-[#E2E8F0]/80">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-lg text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
          onClick={(e) => {
            e.stopPropagation();
            setIsAutoRotating((prev) => !prev);
          }}
          aria-label={isAutoRotating ? 'Pause rotation' : 'Start auto-rotation'}
          title={isAutoRotating ? 'Pause rotation' : 'Auto-rotate'}
        >
          {isAutoRotating ? <Pause size={15} /> : <Play size={15} />}
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-lg text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentFrame(0);
            setIsAutoRotating(false);
          }}
          aria-label="Reset orientation"
          title="Reset to front"
        >
          <RefreshCw size={14} />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-lg text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
          onClick={(e) => {
            e.stopPropagation();
            toggleFullscreen();
          }}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
          title="Fullscreen"
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </Button>
      </div>
    </div>
  );
}
