import type { Locale } from '../types';
export interface ValidationResult {
    isValid: boolean;
    errors?: string[];
}
export declare function validateEmail(email: string, locale?: Locale): ValidationResult;
export declare function validatePassword(password: string, options?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
}, locale?: Locale): ValidationResult;
export declare function validateUrl(url: string, locale?: Locale): ValidationResult;
export declare function validatePhone(phone: string, locale?: Locale): ValidationResult;
export declare function validateUsername(username: string, options?: {
    minLength?: number;
    maxLength?: number;
    allowSpecialChars?: boolean;
}, locale?: Locale): ValidationResult;
export declare function validateSlug(slug: string, options?: {
    minLength?: number;
    maxLength?: number;
}, locale?: Locale): ValidationResult;
export declare function validateText(text: string, options?: {
    minLength?: number;
    maxLength?: number;
    fieldName?: string;
}, locale?: Locale): ValidationResult;
export declare function validateMessage(message: string, options?: {
    minLength?: number;
    maxLength?: number;
}, locale?: Locale): ValidationResult;
//# sourceMappingURL=index.d.ts.map