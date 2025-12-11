import { L as Locale } from './types-tUMATEGI.js';
export { C as CURRENCY_MAP, D as DEFAULT_LOCALE, a as LocaleConfig } from './types-tUMATEGI.js';
export { textToSlug } from './string/index.js';
export { formatDate, formatDateTime, formatRelativeDate, isValidDate, toISOString } from './date/index.js';
export { formatCurrency } from './number/index.js';
export { GenericStatus, getStatusColor, getStatusVariant, translateStatus } from './status/index.js';

declare function extractInitials(name: string | null | undefined, maxChars?: number): string;
declare function generateAvatarUrl(name: string, size?: number, backgroundColor?: string, textColor?: string): string;
declare function isValidAvatarUrl(url: string): boolean;
declare function getAvatarColorFromName(name: string): string;
declare function generateDynamicAvatarUrl(name: string, size?: number): string;
declare function generateUniqueId(text: string, prefix?: string, suffix?: string): string;
declare function truncateText(text: string, maxLength: number, suffix?: string): string;
declare function capitalize(text: string, options?: {
    firstWordOnly?: boolean;
    lowerRest?: boolean;
}): string;
declare function cleanText(text: string, allowSpaces?: boolean): string;
declare function countWords(text: string): number;
declare function isEmpty(text: string | null | undefined): boolean;
declare function normalizeSpaces(text: string, options?: {
    newlines?: boolean;
}): string;

interface ValidationResult {
    isValid: boolean;
    errors?: string[];
}
declare function validateEmail(email: string, locale?: Locale): ValidationResult;
declare function validatePassword(password: string, options?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
}, locale?: Locale): ValidationResult;
declare function validateUrl(url: string, locale?: Locale): ValidationResult;
declare function validatePhone(phone: string, locale?: Locale): ValidationResult;
declare function validateUsername(username: string, options?: {
    minLength?: number;
    maxLength?: number;
    allowSpecialChars?: boolean;
}, locale?: Locale): ValidationResult;
declare function validateSlug(slug: string, options?: {
    minLength?: number;
    maxLength?: number;
}, locale?: Locale): ValidationResult;
declare function validateText(text: string, options?: {
    minLength?: number;
    maxLength?: number;
    fieldName?: string;
}, locale?: Locale): ValidationResult;

declare function prefersReducedMotion(): boolean;
declare function onReducedMotionChange(callback: (prefersReduced: boolean) => void): () => void;
declare function scrollToPosition(x?: number, y?: number, options?: {
    smooth?: boolean;
    behavior?: ScrollBehavior;
}): void;
declare function scrollToTop(smooth?: boolean): void;
declare function smoothScrollTo(x: number, y: number, duration?: number): void;
declare function scrollToElement(element: string | Element, options?: {
    smooth?: boolean;
    offset?: number;
    behavior?: ScrollBehavior;
}): void;
declare function isElementVisible(element: string | Element, threshold?: number): boolean;
declare function getElementPosition(element: string | Element): {
    x: number;
    y: number;
} | null;
declare function isMobile(): boolean;
declare function isDarkMode(): boolean;
declare function onDarkModeChange(callback: (isDark: boolean) => void): () => void;
declare function copyToClipboard(text: string): Promise<boolean>;
declare function downloadFile(blob: Blob, filename: string): void;

declare function formatNumber$1(num: number): string;
declare function calculateChange(current: number, previous: number): number;
declare function formatPercentage(value: number, options?: {
    showSign?: boolean;
    decimals?: number;
}): string;
declare function generateMockChartData(days: number, locale?: string): Array<Record<string, any>>;
declare function groupDataByPeriod<T extends Record<string, any>>(data: T[]): T[];
declare function calculateMovingAverage(data: number[], window: number): number[];
declare function findMinMax<T extends Record<string, any>>(data: T[], field: keyof T): {
    min: number;
    max: number;
};

declare function formatDate(date: string | Date, format?: 'short' | 'long' | 'full'): string;
declare function formatDateTime(date: string | Date): string;
declare function formatRelativeDate(date: string | Date): string;
declare function formatCurrency(value: number, options?: Intl.NumberFormatOptions): string;
declare function formatNumber(value: number, decimals?: number): string;
declare function formatCompact(value: number, decimals?: number): string;
declare function translateStatus(status: string): string;

declare const ptBr_formatCompact: typeof formatCompact;
declare const ptBr_formatCurrency: typeof formatCurrency;
declare const ptBr_formatDate: typeof formatDate;
declare const ptBr_formatDateTime: typeof formatDateTime;
declare const ptBr_formatNumber: typeof formatNumber;
declare const ptBr_formatRelativeDate: typeof formatRelativeDate;
declare const ptBr_translateStatus: typeof translateStatus;
declare namespace ptBr {
  export { ptBr_formatCompact as formatCompact, ptBr_formatCurrency as formatCurrency, ptBr_formatDate as formatDate, ptBr_formatDateTime as formatDateTime, ptBr_formatNumber as formatNumber, ptBr_formatRelativeDate as formatRelativeDate, ptBr_translateStatus as translateStatus };
}

export { Locale, type ValidationResult, calculateChange, calculateMovingAverage, capitalize, cleanText, copyToClipboard, countWords, downloadFile, extractInitials, findMinMax, formatNumber$1 as formatNumber, formatPercentage, generateAvatarUrl, generateDynamicAvatarUrl, generateMockChartData, generateUniqueId, getAvatarColorFromName, getElementPosition, groupDataByPeriod, isDarkMode, isElementVisible, isEmpty, isMobile, isValidAvatarUrl, normalizeSpaces, onDarkModeChange, onReducedMotionChange, prefersReducedMotion, ptBr as ptBR, scrollToElement, scrollToPosition, scrollToTop, smoothScrollTo, truncateText, validateEmail, validatePassword, validatePhone, validateSlug, validateText, validateUrl, validateUsername };
