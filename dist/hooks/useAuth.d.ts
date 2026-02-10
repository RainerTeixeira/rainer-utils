export interface UserProfile {
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
export declare enum UserRole {
    ADMIN = "admin",
    MODERATOR = "moderator",
    USER = "user",
    GUEST = "guest"
}
export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}
export interface RegisterData {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: UserRole;
}
export interface LogoutOptions {
    invalidateAllSessions?: boolean;
    redirectPath?: string;
}
export interface AuthResult {
    success: boolean;
    user?: UserProfile;
    token?: string;
    refreshToken?: string;
    error?: string;
}
export interface UseAuthConfig {
    autoRefresh?: boolean;
    refreshInterval?: number;
    tokenStorageKey?: string;
    userStorageKey?: string;
    apiEndpoint?: string;
    onAuthChange?: (user: UserProfile | null) => void;
    onError?: (error: string) => void;
}
export declare function useAuth(config?: Partial<UseAuthConfig>): {
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
export declare function useIsAuthenticated(): boolean;
export declare function useCurrentUser(): UserProfile | null;
export declare function useHasRole(role: UserRole): boolean;
export declare function useIsAdmin(): boolean;
//# sourceMappingURL=useAuth.d.ts.map