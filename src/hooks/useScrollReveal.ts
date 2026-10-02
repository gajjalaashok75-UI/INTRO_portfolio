import { useEffect, useRef } from 'react';
import { animate, createScope, stagger } from 'animejs';

type Scope = ReturnType<typeof createScope>;

interface ScrollRevealOptions {
  /** CSS selector (relative to root) for items to animate, e.g. '.reveal-item' */
  targets?: string;
  translateY?: number;
  duration?: number;
  delayStep?: number;
  once?: boolean;
  threshold?: number;
}

/**
 * useScrollReveal
 * Attaches an Anime.js v4 scope to `rootRef` and plays a staggered
 * fade + rise animation the first time the element scrolls into view.
 * Cleans up automatically on unmount via scope.revert().
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const rootRef = useRef<T | null>(null);
  const scopeRef = useRef<Scope | null>(null);
  const playedRef = useRef(false);

  const {
    targets = '.reveal-item',
    translateY = 28,
    duration = 700,
    delayStep = 90,
    once = true,
    threshold = 0.15,
  } = options;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    scopeRef.current = createScope({ root }).add((self) => {
      self?.add('play', () => {
        animate(targets, {
          opacity: [0, 1],
          translateY: [translateY, 0],
          duration,
          delay: stagger(delayStep),
          ease: 'out(3)',
        });
      });
    });

    const els = root.querySelectorAll(targets);
    els.forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !playedRef.current)) {
            playedRef.current = true;
            scopeRef.current?.methods.play();
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      scopeRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return rootRef;
}
