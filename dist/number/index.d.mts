import { L as Locale } from '../types-tUMATEGI.mjs';

declare function formatCurrency(value: number, locale?: Locale, options?: Intl.NumberFormatOptions): string;
declare function formatPercent(value: number, decimals?: number, usePercentage?: boolean): string;
declare function formatNumber(value: number, decimals?: number, locale?: Locale): string;
declare function formatCompact(value: number, decimals?: number, locale?: Locale): string;
declare function parseCurrency(currency: string): number;
declare function round(value: number, decimals?: number): number;
declare function clamp(value: number, min: number, max: number): number;

export { clamp, formatCompact, formatCurrency, formatNumber, formatPercent, parseCurrency, round };
