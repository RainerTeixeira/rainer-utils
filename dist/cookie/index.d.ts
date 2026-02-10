export declare const COOKIE_CONSENT_KEY = "cookie-consent";
export declare const COOKIE_PREFERENCES_KEY = "cookie-preferences";
export declare const COOKIE_VERSION = "1.0.0";
export interface CookiePreferences {
    essential: boolean;
    performance: boolean;
    functionality: boolean;
    analytics: boolean;
}
export interface CookieConsent {
    version: string;
    consented: boolean;
    timestamp: number;
    preferences: CookiePreferences;
}
export declare class CookieManager {
    private static instance;
    private constructor();
    static getInstance(): CookieManager;
    hasConsent(): boolean;
    getPreferences(): CookiePreferences | null;
    saveConsent(preferences: CookiePreferences): void;
    updatePreferences(preferences: CookiePreferences): void;
    revokeConsent(): void;
    isAllowed(type: keyof CookiePreferences): boolean;
    private loadScripts;
    private loadGoogleAnalytics;
    private unloadGoogleAnalytics;
    private clearAnalyticsCookies;
}
export declare function getCookieManager(): CookieManager;
export declare function hasCookieConsent(): boolean;
export declare function getCookiePreferences(): CookiePreferences | null;
export declare function saveCookieConsent(preferences: CookiePreferences): void;
export declare function isCookieAllowed(type: keyof CookiePreferences): boolean;
declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
    }
}
//# sourceMappingURL=index.d.ts.map