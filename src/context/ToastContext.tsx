import React, { useState, useCallback, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ToastContext, type Toast } from './ToastContextData';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback((message: string, actionLabel?: string, onAction?: () => void) => {
    const id = nextId.current++;
    setToasts(prev => [...prev, { id, message, actionLabel, onAction }]);
    
    // Auto-dismiss after 3s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(elementRef.current, 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div 
      ref={elementRef}
      className="pointer-events-auto flex items-center gap-4 bg-[var(--kb-charcoal)] text-white px-6 py-4 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-l-4 border-[var(--kb-green)] min-w-[320px]"
      style={{ fontFamily: 'DM Sans, sans-serif' }}
    >
      <div className="flex-1 text-[13px] font-medium tracking-wide">
        <span className="text-[var(--kb-green)] mr-3 text-lg">✓</span>
        {toast.message}
      </div>
      {toast.actionLabel && (
        <button 
          onClick={toast.onAction}
          className="text-[var(--kb-green)] text-[12px] font-bold uppercase tracking-widest hover:brightness-125 transition-all"
        >
          {toast.actionLabel}
        </button>
      )}
    </div>
  );
}
