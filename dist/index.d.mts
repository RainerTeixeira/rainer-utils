import { L as Locale } from './types-tUMATEGI.mjs';
export { C as CURRENCY_MAP, D as DEFAULT_LOCALE, a as LocaleConfig } from './types-tUMATEGI.mjs';
export { textToSlug } from './string/index.mjs';
import { d as dateModule } from './index-BPYjFrM1.mjs';
export { f as formatDate, a as formatDateTime, b as formatRelativeDate, i as isValidDate, t as toISOString } from './index-BPYjFrM1.mjs';
export { formatCurrency } from './number/index.mjs';
import { s as statusModule } from './index-BuqX8-qm.mjs';
export { G as GenericStatus, g as getStatusColor, a as getStatusVariant, b as translatePostStatus, t as translateStatus } from './index-BuqX8-qm.mjs';
import { a as authModule } from './index-DeZ9ZulO.mjs';
export { b as getRefreshToken, g as getToken, d as getTokens, h as hasToken, r as removeToken, c as setRefreshToken, s as setToken, e as setTokens } from './index-DeZ9ZulO.mjs';
export { SearchOptions, fuzzySearch, searchContent, searchWithScore } from './search/index.mjs';

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
declare function calculateReadingTime(content: string | Record<string, any>, wordsPerMinute?: number): number;

declare const textModule_calculateReadingTime: typeof calculateReadingTime;
declare const textModule_capitalize: typeof capitalize;
declare const textModule_cleanText: typeof cleanText;
declare const textModule_countWords: typeof countWords;
declare const textModule_extractInitials: typeof extractInitials;
declare const textModule_generateAvatarUrl: typeof generateAvatarUrl;
declare const textModule_generateDynamicAvatarUrl: typeof generateDynamicAvatarUrl;
declare const textModule_generateUniqueId: typeof generateUniqueId;
declare const textModule_getAvatarColorFromName: typeof getAvatarColorFromName;
declare const textModule_isEmpty: typeof isEmpty;
declare const textModule_isValidAvatarUrl: typeof isValidAvatarUrl;
declare const textModule_normalizeSpaces: typeof normalizeSpaces;
declare const textModule_truncateText: typeof truncateText;
declare namespace textModule {
  export { textModule_calculateReadingTime as calculateReadingTime, textModule_capitalize as capitalize, textModule_cleanText as cleanText, textModule_countWords as countWords, textModule_extractInitials as extractInitials, textModule_generateAvatarUrl as generateAvatarUrl, textModule_generateDynamicAvatarUrl as generateDynamicAvatarUrl, textModule_generateUniqueId as generateUniqueId, textModule_getAvatarColorFromName as getAvatarColorFromName, textModule_isEmpty as isEmpty, textModule_isValidAvatarUrl as isValidAvatarUrl, textModule_normalizeSpaces as normalizeSpaces, textModule_truncateText as truncateText };
}

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
declare function validateMessage(message: string, options?: {
    minLength?: number;
    maxLength?: number;
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

declare function usePasswordStrength(password: string, options?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
    customPatterns?: string[];
    labels?: {
        veryWeak?: string;
        weak?: string;
        fair?: string;
        good?: string;
        strong?: string;
        enterPassword?: string;
        useMinLength?: string;
        addUppercase?: string;
        addLowercase?: string;
        addNumbers?: string;
        addSpecialChars?: string;
        avoidRepeating?: string;
        avoidCommon?: string;
    };
}): {
    strength: number;
    level: string;
    color: string;
    label: string;
    isValid: boolean;
    validations: {
        hasMinLength: boolean;
        hasUppercase: boolean;
        hasLowercase: boolean;
        hasNumbers: boolean;
        hasSpecialChars: boolean;
        noRepeatingChars: boolean;
        noCommonPatterns: boolean;
    };
    suggestions: string[];
    generateStrongPassword: (length?: number) => string;
    isVeryWeak: boolean;
    isWeak: boolean;
    isFair: boolean;
    isGood: boolean;
    isStrong: boolean;
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

declare const textProcessing: typeof textModule;
declare const datetime: typeof dateModule;
declare const authentication: typeof authModule;
declare const stateManagement: typeof statusModule;

export { Locale, type ValidationResult, authentication, calculateChange, calculateMovingAverage, calculateReadingTime, capitalize, cleanText, copyToClipboard, countWords, datetime, downloadFile, extractInitials, findMinMax, formatNumber$1 as formatNumber, formatPercentage, generateAvatarUrl, generateDynamicAvatarUrl, generateMockChartData, generateUniqueId, getAvatarColorFromName, getElementPosition, groupDataByPeriod, isDarkMode, isElementVisible, isEmpty, isMobile, isValidAvatarUrl, normalizeSpaces, onDarkModeChange, onReducedMotionChange, prefersReducedMotion, ptBr as ptBR, scrollToElement, scrollToPosition, scrollToTop, smoothScrollTo, stateManagement, textProcessing, truncateText, usePasswordStrength, validateEmail, validateMessage, validatePassword, validatePhone, validateSlug, validateText, validateUrl, validateUsername };
