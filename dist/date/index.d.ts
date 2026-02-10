import type { Locale } from '../types';
export declare function formatDate(date: string | Date, format?: 'short' | 'long' | 'full', locale?: Locale): string;
export declare function formatDateTime(date: string | Date, locale?: Locale): string;
export declare function formatRelativeDate(date: string | Date, locale?: Locale): string;
export declare function toISOString(date: Date): string;
export declare function isValidDate(date: unknown): date is Date;
//# sourceMappingURL=index.d.ts.map