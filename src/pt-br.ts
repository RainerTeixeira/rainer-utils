/**
 * Helpers pt-BR
 *
 * Funções pré-configuradas para português brasileiro.
 * Facilitam o uso sem precisar passar locale em cada chamada.
 *
 * @module @rainersoft/utils/pt-br
 * @author Rainer Teixeira
 */

import {
  formatDate as formatDateBase,
  formatDateTime as formatDateTimeBase,
  formatRelativeDate as formatRelativeDateBase,
} from './date';

import {
  formatCurrency as formatCurrencyBase,
  formatNumber as formatNumberBase,
  formatCompact as formatCompactBase,
} from './number';

import {
  translateStatus as translateStatusBase,
} from './status';

// ============================================================================
// DATE - PT-BR
// ============================================================================

/**
 * Formata data em português (Brasil)
 */
export function formatDate(
  date: string | Date,
  format: 'short' | 'long' | 'full' = 'long'
): string {
  return formatDateBase(date, format, 'pt-BR');
}

/**
 * Formata data e hora em português (Brasil)
 */
export function formatDateTime(date: string | Date): string {
  return formatDateTimeBase(date, 'pt-BR');
}

/**
 * Formata data relativa em português (Brasil)
 */
export function formatRelativeDate(date: string | Date): string {
  return formatRelativeDateBase(date, 'pt-BR');
}

// ============================================================================
// NUMBER - PT-BR
// ============================================================================

/**
 * Formata moeda em Real (BRL)
 */
export function formatCurrency(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return formatCurrencyBase(value, 'pt-BR', options);
}

/**
 * Formata número em português (Brasil)
 */
export function formatNumber(value: number, decimals = 0): string {
  return formatNumberBase(value, decimals, 'pt-BR');
}

/**
 * Formata número compacto em português (Brasil)
 */
export function formatCompact(value: number, decimals = 1): string {
  return formatCompactBase(value, decimals, 'pt-BR');
}

// ============================================================================
// STATUS - PT-BR
// ============================================================================

/**
 * Traduz status para português (Brasil)
 */
export function translateStatus(status: string): string {
  return translateStatusBase(status, 'pt-BR');
}
