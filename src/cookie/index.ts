/**
 * Cookie Manager
 * 
 * Gerenciamento de cookies e preferências do usuário
 * 
 * @module @rainersoft/ui/lib/cookie-utils
 */

export const COOKIE_CONSENT_KEY = 'cookie-consent';
export const COOKIE_PREFERENCES_KEY = 'cookie-preferences';
export const COOKIE_VERSION = '1.0.0';

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

export class CookieManager {
  private static instance: CookieManager;

  private constructor() {}

  public static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }

  public hasConsent(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) return false;

      const consentData: CookieConsent = JSON.parse(consent);
      return consentData.consented === true;
    } catch {
      return false;
    }
  }

  public getPreferences(): CookiePreferences | null {
    if (typeof window === 'undefined') return null;

    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) return null;

      const consentData: CookieConsent = JSON.parse(consent);
      return consentData.preferences || null;
    } catch {
      return null;
    }
  }

  public saveConsent(preferences: CookiePreferences): void {
    if (typeof window === 'undefined') return;

    try {
      const consent: CookieConsent = {
        version: COOKIE_VERSION,
        consented: true,
        timestamp: Date.now(),
        preferences,
      };

      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));

      window.dispatchEvent(
        new CustomEvent('cookie-consent-updated', { detail: preferences })
      );

      this.loadScripts(preferences);
    } catch {
      // silencioso na biblioteca
    }
  }

  public updatePreferences(preferences: CookiePreferences): void {
    this.saveConsent(preferences);
  }

  public revokeConsent(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      localStorage.removeItem(COOKIE_PREFERENCES_KEY);

      this.clearAnalyticsCookies();

      window.dispatchEvent(
        new CustomEvent('cookie-consent-revoked', { detail: null })
      );
    } catch {
      // silencioso
    }
  }

  public isAllowed(type: keyof CookiePreferences): boolean {
    const preferences = this.getPreferences();
    if (!preferences) return false;

    if (type === 'essential') {
      return preferences.essential === true;
    }

    return preferences[type] === true;
  }

  private loadScripts(preferences: CookiePreferences): void {
    if (preferences.analytics) {
      this.loadGoogleAnalytics();
    } else {
      this.unloadGoogleAnalytics();
    }
  }

  private loadGoogleAnalytics(): void {
    // implementação real fica no app; aqui é stub
  }

  private unloadGoogleAnalytics(): void {
    const scripts = document.querySelectorAll(
      'script[src*="googletagmanager.com"], script[src*="google-analytics.com"]'
    );
    scripts.forEach(script => script.remove());

    this.clearAnalyticsCookies();

    const win = window as Window & { dataLayer?: unknown[]; gtag?: unknown };

    if (win.dataLayer) {
      win.dataLayer = [];
    }

    if (win.gtag) {
      delete win.gtag;
    }
  }

  private clearAnalyticsCookies(): void {
    if (typeof document === 'undefined') return;

    const analyticsCookies = [
      '_ga',
      '_ga_*',
      '_gid',
      '_gat',
      '_gat_gtag_*',
      '__utma',
      '__utmt',
      '__utmb',
      '__utmc',
      '__utmz',
      '__utmv',
    ];

    analyticsCookies.forEach(cookieName => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

      if (cookieName.includes('*')) {
        const baseName = cookieName.replace('*', '');
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
          const parts = cookie.split('=');
          if (parts.length === 0) return;
          const name = parts[0]?.trim();
          if (!name || !name.startsWith(baseName)) return;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
        });
      }
    });
  }
}

export function getCookieManager(): CookieManager {
  return CookieManager.getInstance();
}

export function hasCookieConsent(): boolean {
  return getCookieManager().hasConsent();
}

export function getCookiePreferences(): CookiePreferences | null {
  return getCookieManager().getPreferences();
}

export function saveCookieConsent(preferences: CookiePreferences): void {
  getCookieManager().saveConsent(preferences);
}

export function isCookieAllowed(type: keyof CookiePreferences): boolean {
  return getCookieManager().isAllowed(type);
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
