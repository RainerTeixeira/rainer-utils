/**
 * Internationalization (i18n) Module
 *
 * Sistema centralizado de internacionalização para pt-BR, en-US e es-ES.
 * Gerencia locale global, formatações e traduções.
 *
 * @module @rainersoft/utils/i18n
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { Locale } from '../types';
import { DEFAULT_LOCALE, CURRENCY_MAP } from '../types';

/**
 * Configuração de locale atual (global)
 */
let currentLocale: Locale = DEFAULT_LOCALE;

/**
 * Define o locale global da aplicação
 * @param locale - Novo locale a ser usado
 * 
 * @example
 * ```ts
 * setLocale('en-US');
 * // Todas as funções de formatação usarão en-US a partir de agora
 * ```
 */
export function setLocale(locale: Locale): void {
  currentLocale = locale;
}

/**
 * Obtém o locale atual
 * @returns Locale configurado
 * 
 * @example
 * ```ts
 * const locale = getLocale(); // 'pt-BR'
 * ```
 */
export function getLocale(): Locale {
  return currentLocale;
}

/**
 * Obtém a moeda correspondente ao locale atual
 * @param locale - Locale opcional (usa o global se não fornecido)
 * @returns Código da moeda (BRL, USD, EUR)
 * 
 * @example
 * ```ts
 * getCurrency(); // 'BRL' (se locale for pt-BR)
 * getCurrency('en-US'); // 'USD'
 * ```
 */
export function getCurrency(locale?: Locale): string {
  return CURRENCY_MAP[locale || currentLocale];
}

/**
 * Configurações de formatação por locale
 */
export const LOCALE_CONFIG = {
  'pt-BR': {
    locale: 'pt-BR' as Locale,
    currency: 'BRL',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    decimalSeparator: ',',
    thousandSeparator: '.',
    firstDayOfWeek: 0, // Domingo
  },
  'en-US': {
    locale: 'en-US' as Locale,
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'hh:mm A',
    decimalSeparator: '.',
    thousandSeparator: ',',
    firstDayOfWeek: 0, // Domingo
  },
  'es-ES': {
    locale: 'es-ES' as Locale,
    currency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    decimalSeparator: ',',
    thousandSeparator: '.',
    firstDayOfWeek: 1, // Segunda
  },
} as const;

/**
 * Obtém configuração completa do locale
 * @param locale - Locale opcional (usa o global se não fornecido)
 * @returns Objeto com todas as configurações
 * 
 * @example
 * ```ts
 * const config = getLocaleConfig('pt-BR');
 * console.log(config.dateFormat); // 'DD/MM/YYYY'
 * console.log(config.currency); // 'BRL'
 * ```
 */
export function getLocaleConfig(locale?: Locale) {
  return LOCALE_CONFIG[locale || currentLocale];
}

/**
 * Traduções comuns por idioma
 */
export const TRANSLATIONS = {
  'pt-BR': {
    days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    months: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    yesterday: 'Ontem',
    tomorrow: 'Amanhã',
    ago: 'atrás',
    in: 'em',
  },
  'en-US': {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    ago: 'ago',
    in: 'in',
  },
  'es-ES': {
    days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    daysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    months: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    today: 'Hoy',
    yesterday: 'Ayer',
    tomorrow: 'Mañana',
    ago: 'hace',
    in: 'en',
  },
} as const;

/**
 * Obtém traduções para o locale atual
 * @param locale - Locale opcional (usa o global se não fornecido)
 * @returns Objeto com traduções
 * 
 * @example
 * ```ts
 * const t = getTranslations('pt-BR');
 * console.log(t.today); // 'Hoje'
 * console.log(t.months[0]); // 'Janeiro'
 * ```
 */
export function getTranslations(locale?: Locale) {
  return TRANSLATIONS[locale || currentLocale];
}

/**
 * Traduz uma chave específica
 * @param key - Chave da tradução
 * @param locale - Locale opcional
 * @returns Texto traduzido
 * 
 * @example
 * ```ts
 * translate('today'); // 'Hoje' (se locale for pt-BR)
 * translate('today', 'en-US'); // 'Today'
 * ```
 */
export function translate(key: keyof typeof TRANSLATIONS['pt-BR'], locale?: Locale): string {
  const translations = getTranslations(locale);
  return translations[key] as string;
}

/**
 * Detecta locale do navegador
 * @returns Locale detectado ou padrão
 * 
 * @example
 * ```ts
 * const browserLocale = detectBrowserLocale();
 * setLocale(browserLocale);
 * ```
 */
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined' || !window.navigator) {
    return DEFAULT_LOCALE;
  }

  const browserLang = window.navigator.language;
  
  if (browserLang.startsWith('pt')) return 'pt-BR';
  if (browserLang.startsWith('es')) return 'es-ES';
  if (browserLang.startsWith('en')) return 'en-US';
  
  return DEFAULT_LOCALE;
}

// Re-export tipos e constantes
export { Locale, DEFAULT_LOCALE, CURRENCY_MAP } from '../types';
