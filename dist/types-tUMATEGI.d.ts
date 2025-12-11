type Locale = 'pt-BR' | 'en-US' | 'es-ES';
interface LocaleConfig {
    locale: Locale;
    currency?: string;
    dateFormat?: 'short' | 'long' | 'full';
}
declare const DEFAULT_LOCALE: Locale;
declare const CURRENCY_MAP: Record<Locale, string>;

export { CURRENCY_MAP as C, DEFAULT_LOCALE as D, type Locale as L, type LocaleConfig as a };
