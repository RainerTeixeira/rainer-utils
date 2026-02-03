'use client';

import { useState, useEffect } from 'react';

/**
 * Hook para monitorar posição de scroll
 * 
 * @returns Posição atual do scroll e informações relacionadas
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;

      setScrollPosition({ x: currentScrollX, y: currentScrollY });

      // Detectar direção do scroll
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }

      // Detectar quando parou de rolar
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return {
    scrollPosition,
    isScrolling,
    scrollDirection,
    isScrolledDown: scrollPosition.y > 0,
    scrollPercentage: Math.round(
      (scrollPosition.y / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    ),
  };
}
