/**
 * Table of Contents Hook
 *
 * Hook universal que extrai headings (h2, h3) e detecta qual seção
 * está ativa usando Intersection Observer para navegação suave.
 *
 * @module @rainersoft/utils/hooks
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { useEffect, useState } from 'react';

/**
 * Interface de um heading extraído
 */
export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Opções de configuração do hook
 */
export interface UseTableOfContentsOptions {
  containerRef?: React.RefObject<HTMLElement>;
  rootMargin?: string;
  threshold?: number;
  offset?: number;
}

/**
 * Hook useTableOfContents
 *
 * Gerencia a extração e navegação de headings em um artigo.
 * Detecta automaticamente qual seção está visível usando Intersection Observer.
 *
 * @param options - Opções de configuração
 * @returns Objeto com headings e controles
 *
 * @example
 * ```ts
 * const { headings, activeId, scrollToHeading } = useTableOfContents({
 *   rootMargin: '-20% 0px -35% 0px',
 *   offset: 100
 * });
 * ```
 */
export function useTableOfContents({
  containerRef,
  rootMargin = '-20% 0px -35% 0px',
  threshold = 0,
  offset = 100,
}: UseTableOfContentsOptions = {}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extrair headings do DOM
  useEffect(() => {
    const container = containerRef?.current || document;

    const generateUniqueId = (
      text: string,
      index: number,
      level: number,
      usedIds: Set<string>
    ): string => {
      const slug = text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 50);

      const baseId = slug
        ? `heading-${slug}-${level}-${index}`
        : `heading-${level}-${index}`;

      let uniqueId = baseId;
      let counter = 0;
      while (usedIds.has(uniqueId)) {
        counter++;
        uniqueId = `${baseId}-${counter}`;
      }

      return uniqueId;
    };

    const elements = container.querySelectorAll('h2, h3');
    const headingList: Heading[] = [];
    const usedIds = new Set<string>();

    elements.forEach((element, index) => {
      let id = element.id;
      const text = element.textContent || '';
      const level = parseInt(element.tagName[1] || '2');

      if (!id || usedIds.has(id)) {
        id = generateUniqueId(text, index, level, usedIds);
        element.id = id;
      }

      usedIds.add(id);
      headingList.push({ id, text, level });
    });

    setHeadings(headingList);
  }, [containerRef]);

  // Intersection Observer para detectar seção ativa
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin, threshold }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings, rootMargin, threshold]);

  /**
   * Scroll suave até um heading específico
   */
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return {
    headings,
    activeId,
    scrollToHeading,
  };
}
