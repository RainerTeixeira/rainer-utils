interface StrengthLabels {
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
}
interface PasswordStrengthOptions {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
    customPatterns?: string[];
    labels?: StrengthLabels;
}
export declare function usePasswordStrength(password: string, options?: PasswordStrengthOptions): {
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
export {};
//# sourceMappingURL=use-password-strength.d.ts.map