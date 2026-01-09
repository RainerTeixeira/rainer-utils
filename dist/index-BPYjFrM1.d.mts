import { L as Locale } from './types-tUMATEGI.mjs';

declare function formatDate(date: string | Date, format?: 'short' | 'long' | 'full', locale?: Locale): string;
declare function formatDateTime(date: string | Date, locale?: Locale): string;
declare function formatRelativeDate(date: string | Date, locale?: Locale): string;
declare function toISOString(date: Date): string;
declare function isValidDate(date: unknown): date is Date;

declare const dateModule_formatDate: typeof formatDate;
declare const dateModule_formatDateTime: typeof formatDateTime;
declare const dateModule_formatRelativeDate: typeof formatRelativeDate;
declare const dateModule_isValidDate: typeof isValidDate;
declare const dateModule_toISOString: typeof toISOString;
declare namespace dateModule {
  export { dateModule_formatDate as formatDate, dateModule_formatDateTime as formatDateTime, dateModule_formatRelativeDate as formatRelativeDate, dateModule_isValidDate as isValidDate, dateModule_toISOString as toISOString };
}

export { formatDateTime as a, formatRelativeDate as b, dateModule as d, formatDate as f, isValidDate as i, toISOString as t };
