import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { RotateCw, Pause, Play, RefreshCw, Maximize2, Minimize2, Loader2, Sparkles } from 'lucide-react';
import { preloadFrames } from '../modules/media-loader';
import { renderFrame, wrapIndex, shortestFrameDistance, type DragState } from '../modules/sequence-viewer';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface WebKitDocument extends Document {
  webkitFullscreenElement?: Element;
  webkitExitFullscreen?: () => Promise<void> | void;
}

interface WebKitHTMLDivElement extends HTMLDivElement {
  webkitRequestFullscreen?: () => Promise<void> | void;
}

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
  const [isResetting, setIsResetting] = useState(false);

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

  // Preload frames progressively with caching
  useEffect(() => {
    let isCancelled = false;

    preloadFrames(
      sequenceId,
      frameCount,
      6, // Priority frames for instant first render
      () => {
        if (!isCancelled) {
          setIsLoading(false);
          draw(frameRef.current);
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
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
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

  // Synchronize fullscreen state with browser events (e.g. Esc key)
  useEffect(() => {
    const onFullscreenChange = () => {
      const doc = document as WebKitDocument;
      const isFull = Boolean(document.fullscreenElement || doc.webkitFullscreenElement);
      setIsFullscreen(isFull);
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
    };
  }, []);

  // Auto-rotation loop using requestAnimationFrame with delta timing
  useEffect(() => {
    if (!isAutoRotating || isLoading || isResetting || isDragging) return;

    let animId: number;
    let lastTime = performance.now();
    const frameDuration = 1000 / 24; // 24 fps turntable spin

    const tick = (now: number) => {
      const delta = now - lastTime;
      if (delta >= frameDuration) {
        const framesToAdvance = Math.max(1, Math.floor(delta / frameDuration));
        setCurrentFrame((prev) => wrapIndex(prev + framesToAdvance, frameCount));
        lastTime = now - (delta % frameDuration);
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotating, isLoading, isResetting, isDragging, frameCount]);

  // Unified Pointer Drag Handlers with pointer capture
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Avoid triggering drag when interacting with controls or buttons
    if ((e.target as HTMLElement).closest('button, [data-no-drag="true"]')) {
      return;
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignored if pointer capture is not supported
    }

    setIsAutoRotating(false);
    setHasInteracted(true);
    setIsDragging(true);
    dragStateRef.current = {
      isDragging: true,
      startX: e.clientX,
      startFrame: frameRef.current,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.isDragging) return;
    const rect = containerRef.current?.getBoundingClientRect();
    const width = rect?.width || 400;
    const pixelsPerFrame = Math.max(4, width / frameCount);
    const deltaX = e.clientX - dragStateRef.current.startX;
    const framesDelta = Math.round(deltaX / pixelsPerFrame);
    const newFrame = wrapIndex(dragStateRef.current.startFrame + framesDelta, frameCount);
    setCurrentFrame(newFrame);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignored
      }
      dragStateRef.current.isDragging = false;
      setIsDragging(false);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setIsAutoRotating(false);
      setHasInteracted(true);
      setCurrentFrame((prev) => wrapIndex(prev - (e.shiftKey ? 5 : 1), frameCount));
    } else if (e.key === 'ArrowRight') {
      setIsAutoRotating(false);
      setHasInteracted(true);
      setCurrentFrame((prev) => wrapIndex(prev + (e.shiftKey ? 5 : 1), frameCount));
    } else if (e.key === ' ') {
      e.preventDefault();
      setIsAutoRotating((prev) => !prev);
    } else if (e.key === 'Home' || e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      smoothResetToFront();
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current as WebKitHTMLDivElement | null;
    if (!container) return;
    const doc = document as WebKitDocument;
    const isDocFull = Boolean(document.fullscreenElement || doc.webkitFullscreenElement);

    if (!isDocFull) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
    }
  };

  // Smoothly rotate turntable back to 0° (front view)
  const smoothResetToFront = () => {
    if (isResetting) return;
    setIsAutoRotating(false);
    setHasInteracted(true);

    const start = frameRef.current;
    if (start === 0) {
      // If already at 0, initiate a showcase continuous spin
      setIsAutoRotating(true);
      return;
    }

    setIsResetting(true);
    const startTime = performance.now();
    const duration = 350; // ms
    const diff = shortestFrameDistance(start, 0, frameCount);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      const nextFrame = wrapIndex(Math.round(start + diff * ease), frameCount);
      setCurrentFrame(nextFrame);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentFrame(0);
        setIsResetting(false);
      }
    };

    requestAnimationFrame(animate);
  };

  // Degrees calculated from current frame (0 to 359)
  const degrees = Math.round((currentFrame / frameCount) * 360) % 360;

  // Cardinal view direction label
  const cardinalLabel = useMemo(() => {
    if (degrees >= 345 || degrees <= 15) return 'Front';
    if (degrees >= 75 && degrees <= 105) return 'Right';
    if (degrees >= 165 && degrees <= 195) return 'Back';
    if (degrees >= 255 && degrees <= 285) return 'Left';
    return null;
  }, [degrees]);

  // Snap to next 90° angle quadrant when clicking degree badge
  const snapToNextQuarter = () => {
    const currentQuarter = Math.floor((degrees + 45) / 90) % 4;
    const nextQuarter = (currentQuarter + 1) % 4;
    const targetDegrees = nextQuarter * 90;
    const targetFrame = wrapIndex(Math.round((targetDegrees / 360) * frameCount), frameCount);

    setIsAutoRotating(false);
    setHasInteracted(true);

    const start = frameRef.current;
    const diff = shortestFrameDistance(start, targetFrame, frameCount);
    const startTime = performance.now();
    const duration = 280;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      const nextF = wrapIndex(Math.round(start + diff * ease), frameCount);
      setCurrentFrame(nextF);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentFrame(targetFrame);
      }
    };
    requestAnimationFrame(animate);
  };

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
      aria-label={`360 interactive turntable view of ${productName}`}
      aria-valuenow={degrees}
      aria-valuemin={0}
      aria-valuemax={360}
      onKeyDown={handleKeyDown}
      className={cn(
        'group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#E2E8F0] bg-gradient-to-b from-[#FFFFFF] to-[#F8FAFC] select-none outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] touch-none',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
        isFullscreen && 'fixed inset-0 z-50 rounded-none border-0 bg-white p-4',
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* 360 Degree Canvas */}
      <canvas
        ref={canvasRef}
        className="h-full w-full object-contain pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xs transition-opacity z-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#C2410C]" />
          <p className="mt-2 font-['DM_Sans'] text-xs font-semibold text-[#64748B]">Loading 3D Turntable...</p>
        </div>
      )}

      {/* Interactive Guidance Hint Pill */}
      {!hasInteracted && !isLoading && (
        <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 animate-pulse flex items-center gap-1.5 rounded-full bg-black/75 px-3.5 py-1 text-xs font-medium text-white shadow-md backdrop-blur-md z-10">
          <RotateCw size={13} className="text-[#FDBA74]" />
          <span>Drag or swipe to rotate 360°</span>
        </div>
      )}

      {/* Degree Badge Pill (Interactive: click to snap to next 90° angle) */}
      <button
        type="button"
        data-no-drag="true"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={snapToNextQuarter}
        title="Click to snap to next 90° view"
        className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-1.5 text-xs font-bold text-[#1E293B] shadow-sm backdrop-blur-md border border-[#E2E8F0]/80 transition-all active:scale-95 hover:border-[#FDBA74] hover:bg-white select-none cursor-pointer"
      >
        <Sparkles size={13} className="text-[#C2410C] shrink-0" />
        <span>{degrees}° view</span>
        {cardinalLabel && (
          <span className="text-[#C2410C] font-semibold text-[11px] bg-[#FFF7ED] px-1.5 py-0.5 rounded-md border border-[#FFEDD5]">
            {cardinalLabel}
          </span>
        )}
        <span className="text-[#94A3B8] font-medium">({currentFrame + 1}/{frameCount})</span>
      </button>

      {/* Interactive Controls Overlay */}
      <div
        data-no-drag="true"
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-xl bg-white/95 p-1 shadow-sm backdrop-blur-md border border-[#E2E8F0]/80"
      >
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={cn(
            'h-8 w-8 rounded-lg transition-all',
            isAutoRotating
              ? 'bg-[#FFF7ED] text-[#C2410C] ring-1 ring-[#FDBA74]'
              : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
          )}
          onClick={(e) => {
            e.stopPropagation();
            setIsAutoRotating((prev) => !prev);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={isAutoRotating ? 'Pause rotation' : 'Start auto-rotation'}
          title={isAutoRotating ? 'Pause rotation' : 'Auto-rotate (360° spin)'}
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
            smoothResetToFront();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Reset to front view"
          title="Reset to front (0°)"
        >
          <RefreshCw size={14} className={isResetting ? 'animate-spin' : ''} />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={cn(
            'h-8 w-8 rounded-lg transition-all',
            isFullscreen
              ? 'bg-[#FFF7ED] text-[#C2410C]'
              : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
          )}
          onClick={(e) => {
            e.stopPropagation();
            toggleFullscreen();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
          title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </Button>
      </div>
    </div>
  );
}
