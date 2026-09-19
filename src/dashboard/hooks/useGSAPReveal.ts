import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useGSAPReveal(stagger = 0.08) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll<HTMLElement>('.gsap-reveal');
    if (!cards.length) return;
    gsap.fromTo(cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, stagger, ease: 'power2.out', clearProps: 'all' }
    );
  }, [stagger]);

  return containerRef;
}

export function useGSAPFadeIn() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, []);

  return ref;
}
