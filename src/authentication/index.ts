/**
 * Auth Utilities
 *
 * Utilitários para gerenciamento de tokens de autenticação.
 * Funções para armazenar, recuperar e remover tokens JWT do localStorage.
 *
 * @module @rainersoft/utils/auth
 * @author Rainer Teixeira
 * @version 1.0.0
 */

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Obtém o token de acesso armazenado
 * 
 * @returns string | null - Token JWT ou null se não encontrado
 * 
 * @example
 * ```ts
 * const token = getToken();
 * if (token) {
 *   // Usar token na requisição
 * }
 * ```
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Define o token de acesso
 * 
 * @param token - Token JWT a ser armazenado
 * 
 * @example
 * ```ts
 * setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 * ```
 */
export const setToken = (token: string): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Obtém o refresh token armazenado
 * 
 * @returns string | null - Refresh token ou null se não encontrado
 * 
 * @example
 * ```ts
 * const refreshToken = getRefreshToken();
 * ```
 */
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Define o refresh token
 * 
 * @param refreshToken - Refresh token a ser armazenado
 * 
 * @example
 * ```ts
 * setRefreshToken('refresh_token_here');
 * ```
 */
export const setRefreshToken = (refreshToken: string): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

/**
 * Remove todos os tokens armazenados
 * 
 * @example
 * ```ts
 * // Logout do usuário
 * removeToken();
 * ```
 */
export const removeToken = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Verifica se há um token válido armazenado
 * 
 * @returns boolean - True se token existe
 * 
 * @example
 * ```ts
 * if (hasToken()) {
 *   // Usuário autenticado
 * }
 * ```
 */
export const hasToken = (): boolean => {
  return !!getToken();
};

/**
 * Obtém os tokens como objeto
 * 
 * @returns object - Com accessToken e refreshToken
 * 
 * @example
 * ```ts
 * const { accessToken, refreshToken } = getTokens();
 * ```
 */
export const getTokens = (): {
  accessToken: string | null;
  refreshToken: string | null;
} => {
  return {
    accessToken: getToken(),
    refreshToken: getRefreshToken(),
  };
};

/**
 * Define ambos os tokens de uma vez
 * 
 * @param accessToken - Token de acesso
 * @param refreshToken - Token de refresh
 * 
 * @example
 * ```ts
 * setTokens({
 *   accessToken: 'access_token_here',
 *   refreshToken: 'refresh_token_here'
 * });
 * ```
 */
export const setTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): void => {
  setToken(accessToken);
  setRefreshToken(refreshToken);
};
