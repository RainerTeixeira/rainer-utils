'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Opções para o hook {@link useIntersectionObserver}.
 */
interface UseIntersectionObserverOptions {
  /** Threshold único ou lista para disparo do observer. */
  threshold?: number | number[];
  /** Margem aplicada ao root para cálculo de interseção. */
  rootMargin?: string;
  /** Elemento raiz para observação (default: viewport). */
  root?: Element | null;
  /** Paralisa o observer após primeira visibilidade. */
  freezeOnceVisible?: boolean;
}

/**
 * Resultado retornado pelo hook {@link useIntersectionObserver}.
 */
interface UseIntersectionObserverResult {
  /** Informa se o elemento está em interseção. */
  isIntersecting: boolean;
  /** Ref a ser atribuída ao elemento observado. */
  targetRef: React.RefObject<Element | null>;
  /** Última entrada capturada pelo IntersectionObserver. */
  entry?: IntersectionObserverEntry;
}

/**
 * Hook para usar Intersection Observer de forma reutilizável
 * 
 * @param options - Opções do Intersection Observer
 * @returns Objeto com estado de interseção e ref para o elemento
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverResult {
  const {
    threshold = 0,
    rootMargin = '0px',
    root = null,
    freezeOnceVisible = false
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const targetRef = useRef<Element | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const hasSupport = 'IntersectionObserver' in window;
    if (!hasSupport) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;

        setEntry(entry);
        setIsIntersecting(isElementIntersecting);

        if (freezeOnceVisible && isElementIntersecting) {
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
        root
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [
    threshold,
    rootMargin,
    root,
    freezeOnceVisible,
    targetRef.current
  ]);

  return {
    isIntersecting,
    targetRef,
    entry
  };
}
