import { L as Locale } from '../types-tUMATEGI.mjs';

declare function formatDate(date: string | Date, format?: 'short' | 'long' | 'full', locale?: Locale): string;
declare function formatDateTime(date: string | Date, locale?: Locale): string;
declare function formatRelativeDate(date: string | Date, locale?: Locale): string;
declare function toISOString(date: Date): string;
declare function isValidDate(date: unknown): date is Date;

export { formatDate, formatDateTime, formatRelativeDate, isValidDate, toISOString };
