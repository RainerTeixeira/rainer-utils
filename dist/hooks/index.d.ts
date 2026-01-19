interface UserProfile {
    id: string;
    nickname: string;
    email?: string;
    emailVerified?: boolean;
    role?: UserRole;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
    lastLoginAt?: string;
}
declare enum UserRole {
    ADMIN = "admin",
    MODERATOR = "moderator",
    USER = "user",
    GUEST = "guest"
}
interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}
interface RegisterData {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: UserRole;
}
interface LogoutOptions {
    invalidateAllSessions?: boolean;
    redirectPath?: string;
}
interface AuthResult {
    success: boolean;
    user?: UserProfile;
    token?: string;
    refreshToken?: string;
    error?: string;
}
interface UseAuthConfig {
    autoRefresh?: boolean;
    refreshInterval?: number;
    tokenStorageKey?: string;
    userStorageKey?: string;
    apiEndpoint?: string;
    onAuthChange?: (user: UserProfile | null) => void;
    onError?: (error: string) => void;
}
declare function useAuth(config?: Partial<UseAuthConfig>): {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<AuthResult>;
    logout: (options?: LogoutOptions) => Promise<void>;
    register: (userData: RegisterData) => Promise<AuthResult>;
    updateProfile: (data: Partial<UserProfile>) => Promise<AuthResult>;
    refreshToken: () => Promise<AuthResult>;
    resetError: () => void;
};
declare function useIsAuthenticated(): boolean;
declare function useCurrentUser(): UserProfile | null;
declare function useHasRole(role: UserRole): boolean;
declare function useIsAdmin(): boolean;

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
declare function usePasswordStrength(password: string, options?: PasswordStrengthOptions): {
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

interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    rootMargin?: string;
    root?: Element | null;
    freezeOnceVisible?: boolean;
}
interface UseIntersectionObserverResult {
    isIntersecting: boolean;
    targetRef: React.RefObject<Element | null>;
    entry?: IntersectionObserverEntry;
}
declare function useIntersectionObserver(options?: UseIntersectionObserverOptions): UseIntersectionObserverResult;

declare function useSmoothScroll(): {
    scrollTo: (target: string | Element, options?: ScrollIntoViewOptions) => void;
    scrollToTop: () => void;
    scrollToPosition: (x: number, y: number) => void;
    reducedMotion: boolean;
    shouldAnimate: boolean;
};

declare function useScrollPosition(): {
    scrollPosition: {
        x: number;
        y: number;
    };
    isScrolling: boolean;
    scrollDirection: "up" | "down" | null;
    isScrolledDown: boolean;
    scrollPercentage: number;
};

declare function useIsMobile(): boolean;

interface StorageConfig {
    type?: 'localStorage' | 'sessionStorage' | 'memory' | 'none';
    key?: string;
    ttl?: number;
}
interface ToggleStateOptions {
    initialValue?: boolean;
    storage?: StorageConfig;
    onToggle?: (isActive: boolean) => void;
}
declare function useToggleState({ initialValue, storage, onToggle }?: ToggleStateOptions): {
    isActive: boolean;
    isLoading: boolean;
    toggle: () => void;
    setActive: (value: boolean) => void;
    setIsActive: (newValue: boolean) => void;
};

interface CounterOptions {
    initialValue?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: number, delta: number) => void;
}
declare function useCounter({ initialValue, min, max, step, onChange }?: CounterOptions): {
    count: number;
    increment: () => void;
    decrement: () => void;
    set: (value: number) => void;
    reset: () => void;
    canIncrement: boolean;
    canDecrement: boolean;
    isAtMin: boolean;
    isAtMax: boolean;
};

export { type AuthResult, type CounterOptions, type LoginCredentials, type LogoutOptions, type RegisterData, type StorageConfig, type ToggleStateOptions, type UseAuthConfig, type UserProfile, UserRole, useAuth, useCounter, useCurrentUser, useHasRole, useIntersectionObserver, useIsAdmin, useIsAuthenticated, useIsMobile, usePasswordStrength, useScrollPosition, useSmoothScroll, useToggleState };
