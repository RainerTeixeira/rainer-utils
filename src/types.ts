/**
 * Types & Constants
 *
 * Tipos e constantes compartilhadas entre módulos.
 *
 * @module @rainersoft/utils/types
 * @author Rainer Teixeira
 */

/**
 * Idiomas suportados
 */
export type Locale = 'pt-BR' | 'en-US' | 'es-ES';

/**
 * Configuração de localização
 */
export interface LocaleConfig {
  locale: Locale;
  currency?: string;
  dateFormat?: 'short' | 'long' | 'full';
}

/**
 * Locale padrão
 */
export const DEFAULT_LOCALE: Locale = 'pt-BR';

/**
 * Mapeamento de moedas por locale
 */
export const CURRENCY_MAP: Record<Locale, string> = {
  'pt-BR': 'BRL',
  'en-US': 'USD',
  'es-ES': 'EUR',
} as const;
