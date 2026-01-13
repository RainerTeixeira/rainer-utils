/**
 * Accessibility Utilities
 * 
 * Utilitários para verificação e garantia de conformidade com padrões WCAG.
 * Funções para cálculo de contraste, luminância e validação de acessibilidade.
 * 
 * @module @rainersoft/utils/accessibility
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// COLOR CONVERSION
// ============================================================================

/**
 * Converte cor hexadecimal para RGB
 * 
 * @param hex - Cor em formato hexadecimal (#RRGGBB ou RRGGBB)
 * @returns Objeto com valores RGB { r, g, b }
 * 
 * @example
 * ```typescript
 * const rgb = hexToRgb('#0891b2');
 * // { r: 8, g: 145, b: 178 }
 * ```
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

// ============================================================================
// LUMINANCE CALCULATION
// ============================================================================

/**
 * Calcula a luminância relativa de uma cor RGB
 * 
 * @param r - Componente vermelho (0-255)
 * @param g - Componente verde (0-255)
 * @param b - Componente azul (0-255)
 * @returns Luminância relativa (0-1)
 * 
 * @description
 * Fórmula baseada na recomendação WCAG 2.1 para cálculo de luminância.
 * 
 * @example
 * ```typescript
 * const luminance = getLuminance(8, 145, 178);
 * // 0.234
 * ```
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// ============================================================================
// CONTRAST CALCULATION
// ============================================================================

/**
 * Calcula o contraste entre duas cores
 * 
 * @param color1 - Primeira cor em hexadecimal
 * @param color2 - Segunda cor em hexadecimal
 * @returns Razão de contraste (1-21)
 * 
 * @description
 * Retorna a razão de contraste entre duas cores conforme WCAG 2.1.
 * Valores mínimos recomendados:
 * - WCAG AA (normal): 4.5:1 para texto normal, 3:1 para texto grande
 * - WCAG AAA (melhor): 7:1 para texto normal, 4.5:1 para texto grande
 * 
 * @example
 * ```typescript
 * const contrast = getContrast('#ffffff', '#000000');
 * // 21 (máximo contraste)
 * 
 * const contrast2 = getContrast('#0891b2', '#ffffff');
 * // 3.2 (atende WCAG AA para texto grande)
 * ```
 */
export function getContrast(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

// ============================================================================
// WCAG VALIDATION
// ============================================================================

/**
 * Verifica se o contraste atende ao padrão WCAG AA
 * 
 * @param foreground - Cor do texto (hexadecimal)
 * @param background - Cor de fundo (hexadecimal)
 * @param largeText - Se o texto é grande (>=18pt ou >=14pt bold)
 * @returns true se atende WCAG AA, false caso contrário
 * 
 * @description
 * WCAG AA requer:
 * - Texto normal: contraste mínimo de 4.5:1
 * - Texto grande: contraste mínimo de 3:1
 * 
 * @example
 * ```typescript
 * const meetsAA = meetsWCAGAA('#0891b2', '#ffffff', false);
 * // true (contraste 3.2:1, mas texto normal precisa 4.5:1)
 * 
 * const meetsAALarge = meetsWCAGAA('#0891b2', '#ffffff', true);
 * // true (contraste 3.2:1, texto grande precisa 3:1)
 * ```
 */
export function meetsWCAGAA(
  foreground: string,
  background: string,
  largeText: boolean = false
): boolean {
  const contrast = getContrast(foreground, background);
  return largeText ? contrast >= 3 : contrast >= 4.5;
}

/**
 * Verifica se o contraste atende ao padrão WCAG AAA
 * 
 * @param foreground - Cor do texto (hexadecimal)
 * @param background - Cor de fundo (hexadecimal)
 * @param largeText - Se o texto é grande (>=18pt ou >=14pt bold)
 * @returns true se atende WCAG AAA, false caso contrário
 * 
 * @description
 * WCAG AAA requer:
 * - Texto normal: contraste mínimo de 7:1
 * - Texto grande: contraste mínimo de 4.5:1
 * 
 * @example
 * ```typescript
 * const meetsAAA = meetsWCAGAAA('#000000', '#ffffff', false);
 * // true (contraste 21:1)
 * ```
 */
export function meetsWCAGAAA(
  foreground: string,
  background: string,
  largeText: boolean = false
): boolean {
  const contrast = getContrast(foreground, background);
  return largeText ? contrast >= 4.5 : contrast >= 7;
}

/**
 * Retorna informações completas de contraste entre duas cores
 * 
 * @param foreground - Cor do texto (hexadecimal)
 * @param background - Cor de fundo (hexadecimal)
 * @returns Objeto com informações de contraste
 * 
 * @example
 * ```typescript
 * const info = getContrastInfo('#0891b2', '#ffffff');
 * // {
 * //   contrast: 3.2,
 * //   meetsAA: false,
 * //   meetsAALarge: true,
 * //   meetsAAA: false,
 * //   meetsAAALarge: false,
 * //   level: 'AA Large'
 * // }
 * ```
 */
export function getContrastInfo(
  foreground: string,
  background: string
): {
  contrast: number;
  meetsAA: boolean;
  meetsAALarge: boolean;
  meetsAAA: boolean;
  meetsAAALarge: boolean;
  level: 'Fail' | 'AA Large' | 'AA' | 'AAA Large' | 'AAA';
} {
  const contrast = getContrast(foreground, background);
  const meetsAA = contrast >= 4.5;
  const meetsAALarge = contrast >= 3;
  const meetsAAA = contrast >= 7;
  const meetsAAALarge = contrast >= 4.5;

  let level: 'Fail' | 'AA Large' | 'AA' | 'AAA Large' | 'AAA' = 'Fail';
  if (meetsAAA) {
    level = 'AAA';
  } else if (meetsAAALarge) {
    level = 'AAA Large';
  } else if (meetsAA) {
    level = 'AA';
  } else if (meetsAALarge) {
    level = 'AA Large';
  }

  return {
    contrast,
    meetsAA,
    meetsAALarge,
    meetsAAA,
    meetsAAALarge,
    level,
  };
}

/**
 * Valida se uma combinação de cores atende aos padrões de acessibilidade
 * 
 * @param foreground - Cor do texto (hexadecimal)
 * @param background - Cor de fundo (hexadecimal)
 * @param options - Opções de validação
 * @returns Resultado da validação
 * 
 * @example
 * ```typescript
 * const validation = validateContrast('#0891b2', '#ffffff', {
 *   largeText: true
 * });
 * // {
 * //   valid: true,
 * //   level: 'AA Large',
 * //   contrast: 3.2,
 * //   message: 'Contraste válido para texto grande (WCAG AA)'
 * // }
 * ```
 */
export function validateContrast(
  foreground: string,
  background: string,
  options: {
    requireAAA?: boolean;
    largeText?: boolean;
  } = {}
): {
  valid: boolean;
  level: string;
  contrast: number;
  message: string;
} {
  const { requireAAA = false, largeText = false } = options;
  const info = getContrastInfo(foreground, background);

  let valid = false;
  let message = '';

  if (requireAAA) {
    valid = largeText ? info.meetsAAALarge : info.meetsAAA;
    message = valid
      ? `Contraste válido (WCAG AAA${largeText ? ' - Texto Grande' : ''})`
      : `Contraste insuficiente para WCAG AAA${largeText ? ' - Texto Grande' : ''}. Requerido: ${largeText ? '4.5:1' : '7:1'}, atual: ${info.contrast.toFixed(2)}:1`;
  } else {
    valid = largeText ? info.meetsAALarge : info.meetsAA;
    message = valid
      ? `Contraste válido (WCAG AA${largeText ? ' - Texto Grande' : ''})`
      : `Contraste insuficiente para WCAG AA${largeText ? ' - Texto Grande' : ''}. Requerido: ${largeText ? '3:1' : '4.5:1'}, atual: ${info.contrast.toFixed(2)}:1`;
  }

  return {
    valid,
    level: info.level,
    contrast: info.contrast,
    message,
  };
}
