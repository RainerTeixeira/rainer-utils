/**
 * DOM Utilities
 *
 * Utilitários para manipulação do DOM e interações com o browser.
 * Funciona em qualquer ambiente browser moderno.
 *
 * @module @rainersoft/utils/dom
 * @author Rainer Teixeira
 */

/**
 * Verifica se usuário prefere movimento reduzido (accessibility)
 *
 * @returns true se preferir movimento reduzido
 *
 * @example
 * if (prefersReducedMotion()) {
 *   // Desabilitar animações
 * }
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Adiciona listener para mudanças na preferência de movimento
 *
 * @param callback - Função chamada quando a preferência muda
 * @returns Função para remover o listener
 *
 * @example
 * const unsubscribe = onReducedMotionChange((prefersReduced) => {
 *   console.log('Motion preference changed:', prefersReduced);
 * });
 * 
 * // Remover listener quando necessário
 * unsubscribe();
 */
export function onReducedMotionChange(
  callback: (prefersReduced: boolean) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  // Adicionar listener (compatibilidade com browsers antigos)
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange);
  } else {
    // Fallback para browsers mais antigos
    (mediaQuery as any).addListener(handleChange);
  }
  
  // Retornar função de cleanup
  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback para browsers mais antigos
      (mediaQuery as any).removeListener(handleChange);
    }
  };
}

/**
 * Rola a página para uma posição específica
 *
 * @param x - Posição horizontal (padrão: 0)
 * @param y - Posição vertical (padrão: 0)
 * @param options - Opções de scroll
 *
 * @example
 * scrollToPosition(0, 500); // Rola para o topo com 500px de margem
 * scrollToPosition(0, 0, { smooth: true }); // Scroll suave para o topo
 */
export function scrollToPosition(
  x: number = 0,
  y: number = 0,
  options: {
    smooth?: boolean;
    behavior?: ScrollBehavior;
  } = {}
): void {
  if (typeof window === 'undefined') return;
  
  const { smooth = false, behavior } = options;
  
  window.scrollTo({
    left: x,
    top: y,
    behavior: behavior || (smooth ? 'smooth' : 'auto')
  });
}

/**
 * Rola a página para o topo
 *
 * @param smooth - Se deve usar scroll suave (padrão: false)
 *
 * @example
 * scrollToTop(); // Scroll instantâneo para o topo
 * scrollToTop(true); // Scroll suave para o topo
 */
export function scrollToTop(smooth: boolean = false): void {
  scrollToPosition(0, 0, { smooth });
}

/**
 * Rola suavemente para uma posição
 *
 * @param x - Posição horizontal
 * @param y - Posição vertical
 * @param duration - Duração da animação em ms (padrão: 300)
 *
 * @example
 * smoothScrollTo(0, 500, 500); // Animação de 500ms para rolar 500px
 */
export function smoothScrollTo(
  x: number,
  y: number,
  duration: number = 300
): void {
  if (typeof window === 'undefined') return;
  
  const startX = window.scrollX;
  const startY = window.scrollY;
  const distanceX = x - startX;
  const distanceY = y - startY;
  const startTime = performance.now();
  
  function animate(currentTime: number): void {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    const currentX = startX + (distanceX * easeProgress);
    const currentY = startY + (distanceY * easeProgress);
    
    window.scrollTo(currentX, currentY);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

/**
 * Rola para um elemento específico
 *
 * @param element - Elemento ou seletor CSS
 * @param options - Opções de scroll
 *
 * @example
 * scrollToElement('#my-element'); // Scroll instantâneo
 * scrollToElement('.section', { smooth: true, offset: 100 }); // Scroll suave com offset
 */
export function scrollToElement(
  element: string | Element,
  options: {
    smooth?: boolean;
    offset?: number;
    behavior?: ScrollBehavior;
  } = {}
): void {
  if (typeof window === 'undefined') return;
  
  const { smooth = false, offset = 0, behavior } = options;
  
  let targetElement: Element | null;
  
  if (typeof element === 'string') {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }
  
  if (!targetElement) return;
  
  const rect = targetElement.getBoundingClientRect();
  const absoluteY = rect.top + window.scrollY - offset;
  
  window.scrollTo({
    left: 0,
    top: absoluteY,
    behavior: behavior || (smooth ? 'smooth' : 'auto')
  });
}

/**
 * Verifica se elemento está visível na viewport
 *
 * @param element - Elemento ou seletor CSS
 * @param threshold - Limiar de visibilidade (0 a 1, padrão: 0)
 * @returns true se elemento estiver visível
 *
 * @example
 * isElementVisible('#my-element'); // true se elemento estiver na viewport
 * isElementVisible('.section', 0.5); // true se 50% do elemento estiver visível
 */
export function isElementVisible(
  element: string | Element,
  threshold: number = 0
): boolean {
  if (typeof window === 'undefined') return false;
  
  let targetElement: Element | null;
  
  if (typeof element === 'string') {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }
  
  if (!targetElement) return false;
  
  const rect = targetElement.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  
  const verticalThreshold = windowHeight * threshold;
  const horizontalThreshold = windowWidth * threshold;
  
  const isVisibleVertically = 
    rect.bottom >= verticalThreshold && 
    rect.top <= windowHeight - verticalThreshold;
  
  const isVisibleHorizontally = 
    rect.right >= horizontalThreshold && 
    rect.left <= windowWidth - horizontalThreshold;
  
  return isVisibleVertically && isVisibleHorizontally;
}

/**
 * Obtém a posição de um elemento em relação ao documento
 *
 * @param element - Elemento ou seletor CSS
 * @returns Posição { x, y } ou null se elemento não for encontrado
 *
 * @example
 * const position = getElementPosition('#my-element');
 * console.log('X:', position.x, 'Y:', position.y);
 */
export function getElementPosition(
  element: string | Element
): { x: number; y: number } | null {
  if (typeof window === 'undefined') return null;
  
  let targetElement: Element | null;
  
  if (typeof element === 'string') {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }
  
  if (!targetElement) return null;
  
  const rect = targetElement.getBoundingClientRect();
  
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY
  };
}

/**
 * Verifica se está em dispositivo móvel
 *
 * @returns true se for dispositivo móvel
 *
 * @example
 * if (isMobile()) {
 *   // Aplicar layout mobile
 * }
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Verificar User Agent
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Verificar tamanho de tela (fallback)
  const isMobileScreen = window.innerWidth <= 768;
  
  return isMobileUA || isMobileScreen;
}

/**
 * Verifica se está em modo escuro
 *
 * @returns true se o sistema preferir modo escuro
 *
 * @example
 * if (isDarkMode()) {
 *   // Aplicar tema escuro
 * }
 */
export function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Adiciona listener para mudanças no tema do sistema
 *
 * @param callback - Função chamada quando o tema muda
 * @returns Função para remover o listener
 *
 * @example
 * const unsubscribe = onDarkModeChange((isDark) => {
 *   console.log('Theme changed:', isDark ? 'dark' : 'light');
 * });
 */
export function onDarkModeChange(
  callback: (isDark: boolean) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  // Adicionar listener
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange);
  } else {
    (mediaQuery as any).addListener(handleChange);
  }
  
  // Retornar função de cleanup
  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', handleChange);
    } else {
      (mediaQuery as any).removeListener(handleChange);
    }
  };
}

/**
 * Copia texto para a área de transferência
 *
 * @param text - Texto para copiar
 * @returns Promise que resolve para true se sucesso
 *
 * @example
 * copyToClipboard('Hello World').then(success => {
 *   if (success) {
 *     console.log('Texto copiado!');
 *   }
 * });
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  try {
    // Tentar usar a API moderna
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback para browsers mais antigos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const result = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return result;
  } catch {
    return false;
  }
}

/**
 * Baixa um arquivo como blob
 *
 * @param blob - Blob para baixar
 * @param filename - Nome do arquivo
 *
 * @example
 * downloadFile(new Blob(['Hello World'], { type: 'text/plain' }), 'hello.txt');
 */
export function downloadFile(blob: Blob, filename: string): void {
  if (typeof window === 'undefined') return;
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
