/**
 * Number Utilities
 *
 * Utilitários para formatação de números, moedas e percentuais.
 * Suporte para múltiplos idiomas: pt-BR, en-US, es-ES.
 *
 * @module @rainersoft/utils/number
 * @author Rainer Teixeira
 */

import type { Locale } from '../types';
import { DEFAULT_LOCALE, CURRENCY_MAP } from '../types';

/**
 * Formata número como moeda com suporte a idiomas
 *
 * @param value - Valor numérico
 * @param locale - Idioma (padrão: 'pt-BR')
 * @param options - Opções de formatação
 * @returns Valor formatado
 *
 * @example
 * formatCurrency(1234.56) // 'R$ 1.234,56' (pt-BR)
 * formatCurrency(1234.56, 'en-US') // '$1,234.56'
 * formatCurrency(1234.56, 'es-ES') // '1.234,56 €'
 */
export function formatCurrency(
  value: number,
  locale: Locale = DEFAULT_LOCALE,
  options?: Intl.NumberFormatOptions
): string {
  const currency = CURRENCY_MAP[locale];
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    ...options,
  }).format(value);
}

/**
 * Formata número como percentual
 *
 * @param value - Valor entre 0 e 1 (ou 0 e 100 se usePercentage=true)
 * @param decimals - Casas decimais (padrão: 0)
 * @param usePercentage - Se true, espera valor 0-100 (padrão: false)
 * @returns Percentual formatado
 *
 * @example
 * formatPercent(0.1234) // '12%'
 * formatPercent(0.1234, 2) // '12,34%'
 * formatPercent(12.34, 2, true) // '12,34%'
 */
export function formatPercent(
  value: number,
  decimals = 0,
  usePercentage = false
): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(usePercentage ? value / 100 : value);
}

/**
 * Formata número com separadores de milhar
 *
 * @param value - Valor numérico
 * @param decimals - Casas decimais (padrão: 0)
 * @param locale - Idioma (padrão: 'pt-BR')
 * @returns Número formatado
 *
 * @example
 * formatNumber(1234567) // '1.234.567' (pt-BR)
 * formatNumber(1234567, 0, 'en-US') // '1,234,567'
 */
export function formatNumber(value: number, decimals = 0, locale: Locale = DEFAULT_LOCALE): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Formata número de forma compacta (1K, 1M, 1B)
 *
 * @param value - Valor numérico
 * @param decimals - Casas decimais (padrão: 1)
 * @param locale - Idioma (padrão: 'pt-BR')
 * @returns Número compacto
 *
 * @example
 * formatCompact(1234) // '1,2 mil' (pt-BR)
 * formatCompact(1234567, 1, 'en-US') // '1.2M'
 */
export function formatCompact(value: number, decimals = 1, locale: Locale = DEFAULT_LOCALE): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Converte string de moeda para número
 *
 * @param currency - String de moeda (ex: 'R$ 1.234,56')
 * @returns Valor numérico
 *
 * @example
 * parseCurrency('R$ 1.234,56') // 1234.56
 * parseCurrency('1.234,56') // 1234.56
 */
export function parseCurrency(currency: string): number {
  const cleaned = currency
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  return parseFloat(cleaned);
}

/**
 * Arredonda número para casas decimais
 *
 * @param value - Valor numérico
 * @param decimals - Casas decimais
 * @returns Valor arredondado
 *
 * @example
 * round(1.2345, 2) // 1.23
 */
export function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Clamp - limita número entre min e max
 *
 * @param value - Valor
 * @param min - Mínimo
 * @param max - Máximo
 * @returns Valor limitado
 *
 * @example
 * clamp(150, 0, 100) // 100
 * clamp(-10, 0, 100) // 0
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
