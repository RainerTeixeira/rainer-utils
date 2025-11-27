/**
 * Date Utilities
 *
 * Utilitários para formatação e manipulação de datas.
 * Suporte para múltiplos idiomas: pt-BR, en-US, es-ES.
 *
 * @module @rainersoft/utils/date
 * @author Rainer Teixeira
 */

import type { Locale } from '../types';
import { DEFAULT_LOCALE } from '../types';

/**
 * Textos relativos por idioma
 */
const RELATIVE_TEXTS = {
  'pt-BR': {
    now: 'agora',
    minute: (n: number) => `há ${n} ${n === 1 ? 'minuto' : 'minutos'}`,
    hour: (n: number) => `há ${n} ${n === 1 ? 'hora' : 'horas'}`,
    day: (n: number) => `há ${n} ${n === 1 ? 'dia' : 'dias'}`,
    month: (n: number) => `há ${n} ${n === 1 ? 'mês' : 'meses'}`,
    year: (n: number) => `há ${n} ${n === 1 ? 'ano' : 'anos'}`,
  },
  'en-US': {
    now: 'now',
    minute: (n: number) => `${n} ${n === 1 ? 'minute' : 'minutes'} ago`,
    hour: (n: number) => `${n} ${n === 1 ? 'hour' : 'hours'} ago`,
    day: (n: number) => `${n} ${n === 1 ? 'day' : 'days'} ago`,
    month: (n: number) => `${n} ${n === 1 ? 'month' : 'months'} ago`,
    year: (n: number) => `${n} ${n === 1 ? 'year' : 'years'} ago`,
  },
  'es-ES': {
    now: 'ahora',
    minute: (n: number) => `hace ${n} ${n === 1 ? 'minuto' : 'minutos'}`,
    hour: (n: number) => `hace ${n} ${n === 1 ? 'hora' : 'horas'}`,
    day: (n: number) => `hace ${n} ${n === 1 ? 'día' : 'días'}`,
    month: (n: number) => `hace ${n} ${n === 1 ? 'mes' : 'meses'}`,
    year: (n: number) => `hace ${n} ${n === 1 ? 'año' : 'años'}`,
  },
} as const;

/**
 * Formata data com suporte a múltiplos idiomas
 *
 * @param date - Data (string ISO ou Date)
 * @param format - Formato ('short' | 'long' | 'full')
 * @param locale - Idioma (padrão: 'pt-BR')
 * @returns Data formatada
 *
 * @example
 * formatDate('2025-11-26') // '26 de novembro de 2025' (pt-BR)
 * formatDate('2025-11-26', 'short') // '26/11/2025'
 * formatDate('2025-11-26', 'long', 'en-US') // 'November 26, 2025'
 * formatDate('2025-11-26', 'long', 'es-ES') // '26 de noviembre de 2025'
 */
export function formatDate(
  date: string | Date,
  format: 'short' | 'long' | 'full' = 'long',
  locale: Locale = DEFAULT_LOCALE
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Usar Intl.DateTimeFormat para suporte multi-idioma
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: format === 'short' ? '2-digit' : 'long',
    year: 'numeric',
    ...(format === 'full' && { weekday: 'long' }),
  };

  if (format === 'short') {
    return d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  return d.toLocaleDateString(locale, options);
}

/**
 * Formata data e hora com suporte a múltiplos idiomas
 *
 * @param date - Data (string ISO ou Date)
 * @param locale - Idioma (padrão: 'pt-BR')
 * @returns Data e hora formatadas
 *
 * @example
 * formatDateTime('2025-11-26T14:30:00') // '26 de novembro de 2025, 14:30' (pt-BR)
 * formatDateTime('2025-11-26T14:30:00', 'en-US') // 'November 26, 2025, 2:30 PM'
 */
export function formatDateTime(date: string | Date, locale: Locale = DEFAULT_LOCALE): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return d.toLocaleString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formata data relativa (há X dias/horas) com suporte a idiomas
 *
 * @param date - Data (string ISO ou Date)
 * @param locale - Idioma (padrão: 'pt-BR')
 * @returns Texto relativo
 *
 * @example
 * formatRelativeDate(new Date()) // 'agora' (pt-BR)
 * formatRelativeDate(yesterday, 'en-US') // '1 day ago'
 * formatRelativeDate(yesterday, 'es-ES') // 'hace 1 día'
 */
export function formatRelativeDate(date: string | Date, locale: Locale = DEFAULT_LOCALE): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  const texts = RELATIVE_TEXTS[locale];

  if (diffSec < 60) return texts.now;
  if (diffMin < 60) return texts.minute(diffMin);
  if (diffHour < 24) return texts.hour(diffHour);
  if (diffDay < 30) return texts.day(diffDay);
  if (diffMonth < 12) return texts.month(diffMonth);
  return texts.year(diffYear);
}

/**
 * Converte data para ISO string
 *
 * @param date - Data
 * @returns String ISO
 */
export function toISOString(date: Date): string {
  return date.toISOString();
}

/**
 * Verifica se data é válida
 *
 * @param date - Data para validar
 * @returns true se válida
 */
export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}
