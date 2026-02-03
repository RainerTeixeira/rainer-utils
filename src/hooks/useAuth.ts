/**
 * useAuth Hook - Gestão de Autenticação
 *
 * Hook React para gerenciar estado de autenticação com persistência,
 * refresh de token e callbacks de erro/mudança de sessão.
 *
 * @module @rainersoft/utils/hooks
 * @autor Rainer Teixeira
 * @versao 2.0.0
 * @desde 1.0.0
 */

import { useCallback, useEffect, useState, useRef } from 'react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/** Dados de perfil do usuário autenticado. */
export interface UserProfile {
  /** Identificador único do usuário. */
  id: string;
  /** Apelido ou nome curto do usuário. */
  nickname: string;
  /** E-mail do usuário. */
  email?: string;
  /** Indica se o e-mail foi verificado. */
  emailVerified?: boolean;
  /** Papel do usuário na aplicação. */
  role?: UserRole;
  /** URL do avatar do usuário. */
  avatar?: string;
  /** Data de criação do registro. */
  createdAt?: string;
  /** Data da última atualização. */
  updatedAt?: string;
  /** Data/hora do último login. */
  lastLoginAt?: string;
}

/** Papéis suportados para controle de autorização. */
export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
  GUEST = 'guest'
}

/** Credenciais utilizadas no login. */
export interface LoginCredentials {
  /** E-mail do usuário. */
  email: string;
  /** Senha do usuário. */
  password: string;
  /** Flag para manter sessão persistida. */
  rememberMe?: boolean;
}

/** Dados enviados para registro de novo usuário. */
export interface RegisterData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
}

/** Opções para o fluxo de logout. */
export interface LogoutOptions {
  /** Invalida todas as sessões no backend. */
  invalidateAllSessions?: boolean;
  /** Caminho para redirecionar após logout. */
  redirectPath?: string;
}

/** Resultado padrão retornado pelas operações de autenticação. */
export interface AuthResult {
  success: boolean;
  user?: UserProfile;
  token?: string;
  refreshToken?: string;
  error?: string;
}

/** Configurações aceitas pelo hook {@link useAuth}. */
export interface UseAuthConfig {
  /** Habilita refresh automático do token. */
  autoRefresh?: boolean;
  /** Intervalo do refresh automático em ms. */
  refreshInterval?: number;
  /** Chave usada para salvar token no storage. */
  tokenStorageKey?: string;
  /** Chave usada para salvar usuário no storage. */
  userStorageKey?: string;
  /** Endpoint base da API de autenticação. */
  apiEndpoint?: string;
  /** Callback disparada quando o usuário muda (login/logout). */
  onAuthChange?: (user: UserProfile | null) => void;
  /** Callback disparada quando ocorre erro. */
  onError?: (error: string) => void;
}

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

/** Configuração padrão aplicada quando não houver override. */
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

/** Utilitários de persistência para tokens e usuário. */
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

/** Utilitários para decodificar e validar tokens JWT. */
class TokenManager {
  static decodeToken(token: string): { exp?: number; [key: string]: unknown } | null {
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
    return (decoded.exp ?? 0) < now;
  }
}

// ============================================================================
// MAIN HOOK
// ============================================================================

/**
 * Hook principal para autenticação: login, logout, registro, refresh e perfil.
 * Retorna estados, erros e ações para gerenciar a sessão do usuário.
 */
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

  /** Resposta comum da API de autenticação. */
  interface ApiResponse {
    success?: boolean;
    user?: UserProfile;
    token?: string;
    refreshToken?: string;
    error?: string;
  }

  const apiCall = useCallback(async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse> => {
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

  /** Realiza login com e-mail/senha e persiste tokens. */
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

  /** Encerra sessão local e, opcionalmente, invalida sessões remotas. */
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

  /** Registra novo usuário e inicia sessão. */
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

  /** Atualiza dados do perfil do usuário autenticado. */
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

  /** Solicita novo access token usando refresh token salvo. */
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

/** Retorna apenas o booleano de autenticação. */
export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

/** Retorna o usuário atual ou null. */
export function useCurrentUser(): UserProfile | null {
  const { user } = useAuth();
  return user;
}

/** Verifica se o usuário atual possui o papel informado. */
export function useHasRole(role: UserRole): boolean {
  const { user } = useAuth();
  return user?.role === role;
}

/** Atalho para verificar se o usuário é administrador. */
export function useIsAdmin(): boolean {
  return useHasRole(UserRole.ADMIN);
}
