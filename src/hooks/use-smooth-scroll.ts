'use client';

import { useCallback, useEffect, useState } from 'react';
import { 
  prefersReducedMotion, 
  onReducedMotionChange, 
  smoothScrollTo, 
  scrollToTop, 
  scrollToPosition 
} from '../scroll';

export function useSmoothScroll() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());

    const cleanup = onReducedMotionChange((matches: boolean) => {
      setReducedMotion(matches);
    });

    return cleanup;
  }, []);

  const scrollTo = useCallback(
    (target: string | Element, options?: ScrollIntoViewOptions) => {
      smoothScrollTo(target, options);
    },
    []
  );

  const toTop = useCallback(() => {
    scrollToTop();
  }, []);

  const toPosition = useCallback((x: number, y: number) => {
    scrollToPosition(x, y);
  }, []);

  return {
    scrollTo,
    scrollToTop: toTop,
    scrollToPosition: toPosition,
    reducedMotion,
    shouldAnimate: !reducedMotion,
  };
}

