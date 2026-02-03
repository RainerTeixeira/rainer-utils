/**
 * Scroll Utilities
 *
 * Utilitários de scroll acessíveis que respeitam automaticamente
 * as preferências de acessibilidade do usuário.
 *
 * @module @rainersoft/ui/scroll-utils
 * @author Rainer Teixeira
 */

/**
 * Verifica se o usuário prefere movimento reduzido
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Faz scroll suave para um elemento específico
 */
export function smoothScrollTo(
  target: string | Element,
  options?: ScrollIntoViewOptions
): void {
  const element =
    typeof target === 'string' ? document.querySelector(target) : target;

  if (!element) {
    console.warn(`Elemento não encontrado: ${target}`);
    return;
  }

  const shouldAnimate = !prefersReducedMotion();

  element.scrollIntoView({
    behavior: shouldAnimate ? 'smooth' : 'auto',
    block: 'start',
    inline: 'nearest',
    ...options,
  });
}

/**
 * Faz scroll para o topo da página
 */
export function scrollToTop(): void {
  const shouldAnimate = !prefersReducedMotion();

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: shouldAnimate ? 'smooth' : 'auto',
  });
}

/**
 * Faz scroll para uma posição específica
 */
export function scrollToPosition(
  x: number,
  y: number,
  smooth = true
): void {
  const shouldAnimate = smooth && !prefersReducedMotion();

  window.scrollTo({
    top: y,
    left: x,
    behavior: shouldAnimate ? 'smooth' : 'auto',
  });
}

/**
 * Desabilita scroll da página
 */
export function disableScroll(): void {
  document.body.style.overflow = 'hidden';
}

/**
 * Habilita scroll da página
 */
export function enableScroll(): void {
  document.body.style.overflow = '';
}

/**
 * Observa mudanças na preferência de movimento reduzido
 */
export function onReducedMotionChange(
  callback: (matches: boolean) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const handler = (event: MediaQueryListEvent | MediaQueryList) => {
    callback(event.matches);
  };

  handler(mediaQuery);

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }

  if (mediaQuery.addListener) {
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }

  return () => {};
}
