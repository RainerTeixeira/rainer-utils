/**
 * Color Utilities
 * 
 * Utilitários para manipulação e conversão de cores.
 * Inclui funções para conversão entre formatos, ajuste de cores e cálculos.
 * 
 * @module @rainersoft/utils/color
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

/**
 * Converte RGB para hexadecimal
 * 
 * @param r - Componente vermelho (0-255)
 * @param g - Componente verde (0-255)
 * @param b - Componente azul (0-255)
 * @returns Cor em formato hexadecimal
 * 
 * @example
 * ```typescript
 * const hex = rgbToHex(8, 145, 178);
 * // '#0891b2'
 * ```
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converte cor hexadecimal para HSL
 * 
 * @param hex - Cor em formato hexadecimal
 * @returns Objeto com valores HSL { h, s, l }
 * 
 * @example
 * ```typescript
 * const hsl = hexToHsl('#0891b2');
 * // { h: 187, s: 91, l: 36 }
 * ```
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const rgb = hexToRgb(hex);
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converte HSL para hexadecimal
 * 
 * @param h - Matiz (0-360)
 * @param s - Saturação (0-100)
 * @param l - Luminosidade (0-100)
 * @returns Cor em formato hexadecimal
 * 
 * @example
 * ```typescript
 * const hex = hslToHex(187, 91, 36);
 * // '#0891b2'
 * ```
 */
export function hslToHex(h: number, s: number, l: number): string {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}

// ============================================================================
// COLOR MANIPULATION
// ============================================================================

/**
 * Ajusta o brilho de uma cor
 * 
 * @param hex - Cor em formato hexadecimal
 * @param amount - Quantidade de ajuste (-100 a 100)
 * @returns Cor ajustada em formato hexadecimal
 * 
 * @example
 * ```typescript
 * const lighter = adjustBrightness('#0891b2', 20);
 * // Cor mais clara
 * 
 * const darker = adjustBrightness('#0891b2', -20);
 * // Cor mais escura
 * ```
 */
export function adjustBrightness(hex: string, amount: number): string {
  const hsl = hexToHsl(hex);
  const newL = Math.max(0, Math.min(100, hsl.l + amount));
  return hslToHex(hsl.h, hsl.s, newL);
}

/**
 * Ajusta a saturação de uma cor
 * 
 * @param hex - Cor em formato hexadecimal
 * @param amount - Quantidade de ajuste (-100 a 100)
 * @returns Cor ajustada em formato hexadecimal
 * 
 * @example
 * ```typescript
 * const moreSaturated = adjustSaturation('#0891b2', 20);
 * // Cor mais saturada
 * 
 * const lessSaturated = adjustSaturation('#0891b2', -20);
 * // Cor menos saturada
 * ```
 */
export function adjustSaturation(hex: string, amount: number): string {
  const hsl = hexToHsl(hex);
  const newS = Math.max(0, Math.min(100, hsl.s + amount));
  return hslToHex(hsl.h, newS, hsl.l);
}

/**
 * Ajusta a matiz (hue) de uma cor
 * 
 * @param hex - Cor em formato hexadecimal
 * @param degrees - Graus para ajustar (-360 a 360)
 * @returns Cor ajustada em formato hexadecimal
 * 
 * @example
 * ```typescript
 * const rotated = adjustHue('#0891b2', 30);
 * // Cor com matiz ajustada em 30 graus
 * ```
 */
export function adjustHue(hex: string, degrees: number): string {
  const hsl = hexToHsl(hex);
  const newH = (hsl.h + degrees) % 360;
  return hslToHex(newH < 0 ? newH + 360 : newH, hsl.s, hsl.l);
}

/**
 * Cria uma variação mais clara de uma cor
 * 
 * @param hex - Cor em formato hexadecimal
 * @param amount - Quantidade para clarear (0-100)
 * @returns Cor mais clara em formato hexadecimal
 * 
 * @example
 * ```typescript
 * const lighter = lighten('#0891b2', 20);
 * // Versão mais clara da cor
 * ```
 */
export function lighten(hex: string, amount: number): string {
  return adjustBrightness(hex, amount);
}

/**
 * Cria uma variação mais escura de uma cor
 * 
 * @param hex - Cor em formato hexadecimal
 * @param amount - Quantidade para escurecer (0-100)
 * @returns Cor mais escura em formato hexadecimal
 * 
 * @example
 * ```typescript
 * const darker = darken('#0891b2', 20);
 * // Versão mais escura da cor
 * ```
 */
export function darken(hex: string, amount: number): string {
  return adjustBrightness(hex, -amount);
}

/**
 * Gera uma cor opaca a partir de uma hexadecimal
 * 
 * @param hex - Cor em formato hexadecimal
 * @param alpha - Opacidade (0-1)
 * @returns Cor RGBA
 * 
 * @example
 * ```typescript
 * const rgba = hexToRgba('#0891b2', 0.5);
 * // 'rgba(8, 145, 178, 0.5)'
 * ```
 */
export function hexToRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/**
 * Obtém a cor complementar (oposta no círculo cromático)
 * 
 * @param hex - Cor em formato hexadecimal
 * @returns Cor complementar em formato hexadecimal
 * 
 * @example
 * ```typescript
 * const complementary = getComplementary('#0891b2');
 * // Cor complementar (oposta)
 * ```
 */
export function getComplementary(hex: string): string {
  return adjustHue(hex, 180);
}

/**
 * Gera uma paleta de cores análogas
 * 
 * @param hex - Cor base em formato hexadecimal
 * @param count - Número de cores na paleta
 * @returns Array de cores análogas
 * 
 * @example
 * ```typescript
 * const palette = getAnalogousPalette('#0891b2', 5);
 * // ['#0891b2', '#08b291', '#08b2b2', '#0891b2', '#0870b2']
 * ```
 */
export function getAnalogousPalette(hex: string, count: number = 5): string[] {
  const hsl = hexToHsl(hex);
  const step = 30; // 30 graus de separação
  const palette: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const hue = (hsl.h + (i - Math.floor(count / 2)) * step) % 360;
    palette.push(hslToHex(hue < 0 ? hue + 360 : hue, hsl.s, hsl.l));
  }
  
  return palette;
}
