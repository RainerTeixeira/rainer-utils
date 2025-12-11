/**
 * Carousel Keyboard Hook
 *
 * Hook universal para navegação por teclado em carrosséis/sliders.
 * Inclui autoplay, controles de pausa e acessibilidade completa.
 *
 * @module @rainersoft/utils/hooks
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import React from 'react';

/**
 * Opções de configuração do hook
 */
export interface UseCarouselKeyboardOptions {
  slideCount: number;
  initialSlide?: number;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
  pauseOnInteraction?: boolean;
  respectReducedMotion?: boolean;
  onSlideChange?: (index: number) => void;
  onNext?: (index: number) => void;
  onPrevious?: (index: number) => void;
  onAutoplayToggle?: (isPlaying: boolean) => void;
}

/**
 * Retorno do hook
 */
export interface CarouselKeyboardReturn {
  currentSlide: number;
  goToSlide: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  isPlaying: boolean;
  toggleAutoplay: () => void;
  pauseAutoplay: () => void;
  resumeAutoplay: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

/**
 * Hook useCarouselKeyboard
 *
 * Gerencia navegação por teclado em carrosséis com autoplay e controles.
 *
 * Atalhos de teclado:
 * - ArrowLeft / ←: Slide anterior
 * - ArrowRight / →: Próximo slide
 * - Home: Primeiro slide
 * - End: Último slide
 * - Space: Pausar/Retomar autoplay
 * - Escape: Parar autoplay
 *
 * @param options - Opções de configuração
 * @returns Objeto com estado e funções de controle
 *
 * @example
 * ```ts
 * const { currentSlide, goToNext, goToPrevious, isPlaying } = useCarouselKeyboard({
 *   slideCount: slides.length,
 *   loop: true,
 *   autoplay: true,
 *   autoplayInterval: 5000
 * });
 * ```
 */
export function useCarouselKeyboard({
  slideCount,
  initialSlide = 0,
  loop = true,
  autoplay = false,
  autoplayInterval = 5000,
  // pauseOnHover = true, // Implementação futura
  pauseOnInteraction = true,
  respectReducedMotion = true,
  onSlideChange,
  onNext,
  onPrevious,
  onAutoplayToggle,
}: UseCarouselKeyboardOptions): CarouselKeyboardReturn {
  const [currentSlide, setCurrentSlide] = React.useState(
    Math.min(Math.max(0, initialSlide), slideCount - 1)
  );
  const [isPlaying, setIsPlaying] = React.useState(autoplay);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const autoplayTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Verificar preferência de movimento reduzido apenas no cliente
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    return undefined;
  }, []);

  const goToSlide = React.useCallback(
    (index: number) => {
      const validIndex = Math.min(Math.max(0, index), slideCount - 1);
      if (validIndex !== currentSlide) {
        setCurrentSlide(validIndex);
        onSlideChange?.(validIndex);
      }
    },
    [currentSlide, slideCount, onSlideChange]
  );

  const goToNext = React.useCallback(() => {
    let nextIndex: number;
    if (currentSlide === slideCount - 1) {
      nextIndex = loop ? 0 : currentSlide;
    } else {
      nextIndex = currentSlide + 1;
    }

    if (nextIndex !== currentSlide) {
      setCurrentSlide(nextIndex);
      onSlideChange?.(nextIndex);
      onNext?.(nextIndex);

      if (pauseOnInteraction && isPlaying) {
        setIsPlaying(false);
        onAutoplayToggle?.(false);
      }
    }
  }, [
    currentSlide,
    slideCount,
    loop,
    pauseOnInteraction,
    isPlaying,
    onSlideChange,
    onNext,
    onAutoplayToggle,
  ]);

  const goToPrevious = React.useCallback(() => {
    let prevIndex: number;
    if (currentSlide === 0) {
      prevIndex = loop ? slideCount - 1 : 0;
    } else {
      prevIndex = currentSlide - 1;
    }

    if (prevIndex !== currentSlide) {
      setCurrentSlide(prevIndex);
      onSlideChange?.(prevIndex);
      onPrevious?.(prevIndex);

      if (pauseOnInteraction && isPlaying) {
        setIsPlaying(false);
        onAutoplayToggle?.(false);
      }
    }
  }, [
    currentSlide,
    slideCount,
    loop,
    pauseOnInteraction,
    isPlaying,
    onSlideChange,
    onPrevious,
    onAutoplayToggle,
  ]);

  const goToFirst = React.useCallback(() => goToSlide(0), [goToSlide]);
  const goToLast = React.useCallback(() => goToSlide(slideCount - 1), [goToSlide, slideCount]);

  const pauseAutoplay = React.useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      onAutoplayToggle?.(false);
    }
  }, [isPlaying, onAutoplayToggle]);

  const resumeAutoplay = React.useCallback(() => {
    if (
      autoplay &&
      !isPlaying &&
      (!respectReducedMotion || !prefersReducedMotion)
    ) {
      setIsPlaying(true);
      onAutoplayToggle?.(true);
    }
  }, [
    autoplay,
    isPlaying,
    respectReducedMotion,
    prefersReducedMotion,
    onAutoplayToggle,
  ]);

  const toggleAutoplay = React.useCallback(() => {
    if (isPlaying) {
      pauseAutoplay();
    } else {
      resumeAutoplay();
    }
  }, [isPlaying, pauseAutoplay, resumeAutoplay]);

  // Gerenciar autoplay
  React.useEffect(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }

    if (respectReducedMotion && prefersReducedMotion) {
      setIsPlaying(false);
      return;
    }

    if (isPlaying) {
      autoplayTimerRef.current = setInterval(() => {
        goToNext();
      }, autoplayInterval);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [
    isPlaying,
    autoplayInterval,
    goToNext,
    respectReducedMotion,
    prefersReducedMotion,
  ]);

  // Listeners de teclado
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
        case 'Left':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
        case 'Right':
          event.preventDefault();
          goToNext();
          break;
        case 'Home':
          event.preventDefault();
          goToFirst();
          break;
        case 'End':
          event.preventDefault();
          goToLast();
          break;
        case ' ':
        case 'Spacebar':
          event.preventDefault();
          toggleAutoplay();
          break;
        case 'Escape':
        case 'Esc':
          event.preventDefault();
          pauseAutoplay();
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
    toggleAutoplay,
    pauseAutoplay,
  ]);

  const canGoNext = loop || currentSlide < slideCount - 1;
  const canGoPrevious = loop || currentSlide > 0;

  return {
    currentSlide,
    goToSlide,
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
    isPlaying,
    toggleAutoplay,
    pauseAutoplay,
    resumeAutoplay,
    canGoNext,
    canGoPrevious,
  };
}
