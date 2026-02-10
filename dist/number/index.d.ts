import type { Locale } from '../types';
export declare function formatCurrency(value: number, locale?: Locale, options?: Intl.NumberFormatOptions): string;
export declare function formatPercent(value: number, decimals?: number, usePercentage?: boolean): string;
export declare function formatNumber(value: number, decimals?: number, locale?: Locale): string;
export declare function formatCompact(value: number, decimals?: number, locale?: Locale): string;
export declare function parseCurrency(currency: string): number;
export declare function round(value: number, decimals?: number): number;
export declare function clamp(value: number, min: number, max: number): number;
//# sourceMappingURL=index.d.ts.map