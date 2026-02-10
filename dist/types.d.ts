export type Locale = 'pt-BR' | 'en-US' | 'es-ES';
export interface LocaleConfig {
    locale: Locale;
    currency?: string;
    dateFormat?: 'short' | 'long' | 'full';
}
export declare const DEFAULT_LOCALE: Locale;
export declare const CURRENCY_MAP: Record<Locale, string>;
//# sourceMappingURL=types.d.ts.map