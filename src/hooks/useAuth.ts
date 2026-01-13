/**
 * useAuth Hook - Authentication Management
 * 
 * Hook React profissional para gerenciar estado de autenticação.
 * Implementa padrões de segurança, persistência e tratamento de erros.
 * 
 * @module @rainersoft/utils/hooks
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

import { useCallback, useEffect, useState, useRef } from 'react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

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

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
  GUEST = 'guest'
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

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

const DEFAULT_CONFIG: Required<UseAuthConfig> = {
  autoRefresh: true,
  refreshInterval: 15 * 60 * 1000, // 15 minutes
  tokenStorageKey: 'auth_token',
  userStorageKey: 'auth_user',
  apiEndpoint: '/api/auth',
  onAuthChange: () => {},
  onError: () => {},
};

// ============================================================================
// STORAGE UTILITIES
// ============================================================================

class AuthStorage {
  private static isClient = typeof window !== 'undefined';

  static setItem(key: string, value: string): void {
    if (!this.isClient) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  static getItem(key: string): string | null {
    if (!this.isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    if (!this.isClient) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  static setUser(user: UserProfile, key: string): void {
    this.setItem(key, JSON.stringify(user));
  }

  static getUser(key: string): UserProfile | null {
    const data = this.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      this.removeItem(key);
      return null;
    }
  }

  static removeUser(key: string): void {
    this.removeItem(key);
  }
}

// ============================================================================
// TOKEN UTILITIES
// ============================================================================

class TokenManager {
  static decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }

  static isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) return true;
    
    const now = Date.now() / 1000;
    return decoded.exp < now;
  }
}

// ============================================================================
// MAIN HOOK
// ============================================================================

export function useAuth(config: Partial<UseAuthConfig> = {}) {
  const configRef = useRef({ ...DEFAULT_CONFIG, ...config });
  const cfg = configRef.current;
  
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ============================================================================
  // TOKEN MANAGEMENT
  // ============================================================================

  const storeToken = useCallback((token: string, refreshToken?: string) => {
    AuthStorage.setItem(cfg.tokenStorageKey, token);
    if (refreshToken) {
      AuthStorage.setItem(`${cfg.tokenStorageKey}_refresh`, refreshToken);
    }
  }, [cfg.tokenStorageKey]);

  const getStoredToken = useCallback((): string | null => {
    return AuthStorage.getItem(cfg.tokenStorageKey);
  }, [cfg.tokenStorageKey]);

  const clearTokens = useCallback((): void => {
    AuthStorage.removeItem(cfg.tokenStorageKey);
    AuthStorage.removeItem(`${cfg.tokenStorageKey}_refresh`);
  }, [cfg.tokenStorageKey]);

  // ============================================================================
  // API CALLS
  // ============================================================================

  const apiCall = useCallback(async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<any> => {
    const token = getStoredToken();
    const url = `${cfg.apiEndpoint}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP ${response.status}`);
    }

    return response.json();
  }, [cfg.apiEndpoint, getStoredToken]);

  // ============================================================================
  // AUTH ACTIONS
  // ============================================================================

  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (response.success && response.user && response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        storeToken(response.token, response.refreshToken);
        
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        
        return { success: true, user: response.user, token: response.token };
      } else {
        const errorMsg = response.error || 'Login failed';
        setError(errorMsg);
        if (cfg.onError) cfg.onError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Login failed';
      setError(errorMsg);
      if (cfg.onError) cfg.onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [apiCall, setUser, storeToken, cfg]);

  const logout = useCallback(async (options: LogoutOptions = {}): Promise<void> => {
    try {
      if (options.invalidateAllSessions) {
        await apiCall('/logout', { method: 'POST' });
      }
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      clearTokens();
      
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      
      if (cfg.onAuthChange) {
        cfg.onAuthChange(null);
      }
    }
  }, [apiCall, clearTokens, cfg]);

  const register = useCallback(async (userData: RegisterData): Promise<AuthResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall('/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (response.success && response.user && response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        storeToken(response.token, response.refreshToken);
        
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        
        return { success: true, user: response.user, token: response.token };
      } else {
        const errorMsg = response.error || 'Registration failed';
        setError(errorMsg);
        if (cfg.onError) cfg.onError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Registration failed';
      setError(errorMsg);
      if (cfg.onError) cfg.onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [apiCall, setUser, storeToken, cfg]);

  const updateProfile = useCallback(async (data: Partial<UserProfile>): Promise<AuthResult> => {
    if (!user) {
      const error = 'No user logged in';
      setError(error);
      if (cfg.onError) cfg.onError(error);
      return { success: false, error };
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiCall('/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      });

      if (response.success && response.user) {
        setUser(response.user);
        
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        
        return { success: true, user: response.user };
      } else {
        const errorMsg = response.error || 'Profile update failed';
        setError(errorMsg);
        if (cfg.onError) cfg.onError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Profile update failed';
      setError(errorMsg);
      if (cfg.onError) cfg.onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [apiCall, user, setUser, cfg]);

  const refreshToken = useCallback(async (): Promise<AuthResult> => {
    const refreshToken = AuthStorage.getItem(`${cfg.tokenStorageKey}_refresh`);
    if (!refreshToken) {
      return { success: false, error: 'No refresh token available' };
    }

    try {
      const response = await apiCall('/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });

      if (response.success && response.token && response.user) {
        setUser(response.user);
        storeToken(response.token, response.refreshToken);
        
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        
        return { success: true, user: response.user, token: response.token };
      } else {
        // Refresh failed, logout user
        await logout();
        return { success: false, error: 'Session expired' };
      }
    } catch (error) {
      await logout();
      return { success: false, error: 'Session expired' };
    }
  }, [apiCall, setUser, storeToken, logout, cfg]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    // Verificar autenticação existente ao montar
    const token = getStoredToken();
    const storedUser = AuthStorage.getUser(cfg.userStorageKey);

    if (token && storedUser && !TokenManager.isTokenExpired(token)) {
      setUser(storedUser);
      setIsAuthenticated(true);
      
      if (cfg.onAuthChange) {
        cfg.onAuthChange(storedUser);
      }
    } else if (token && TokenManager.isTokenExpired(token)) {
      // Token expirado, tentar refresh
      refreshToken();
    } else {
      setLoading(false);
    }

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    register,
    updateProfile,
    refreshToken,
    resetError,
  };
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

export function useCurrentUser(): UserProfile | null {
  const { user } = useAuth();
  return user;
}

export function useHasRole(role: UserRole): boolean {
  const { user } = useAuth();
  return user?.role === role;
}

export function useIsAdmin(): boolean {
  return useHasRole(UserRole.ADMIN);
}
