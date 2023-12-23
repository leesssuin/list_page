"use client";

import { RefObject, useEffect } from "react";

export function useIntersectionObserver<T extends HTMLElement>(
  effect: IntersectionObserverCallback,
  targetRef: RefObject<T | null>
): void {
  useEffect(() => {
    const observer = new IntersectionObserver(effect, { threshold: 1 });
    const target = targetRef.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [effect, targetRef]);
}
