/**
 * Storage Utilities
 *
 * Utilitários para armazenamento de dados com suporte a localStorage e memória.
 * Interface unificada para diferentes ambientes (browser, Node.js, testes).
 *
 * @module @rainersoft/utils/storage
 * @author Rainer Teixeira
 * @version 1.0.0
 */

/**
 * Interface para operações de armazenamento
 * @interface Storage
 * @description Define os métodos básicos para operações de armazenamento (get, set, remove, clear)
 */
export interface Storage {
  /**
   * Obtém um item do armazenamento
   * @param key - Chave do item
   * @returns Promise que resolve com o valor ou null se não existir
   */
  getItem(key: string): Promise<string | null>;

  /**
   * Armazena um item
   * @param key - Chave do item
   * @param value - Valor a ser armazenado
   * @returns Promise vazia
   */
  setItem(key: string, value: string): Promise<void>;

  /**
   * Remove um item do armazenamento
   * @param key - Chave do item
   * @returns Promise vazia
   */
  removeItem(key: string): Promise<void>;

  /**
   * Limpa todos os itens do armazenamento
   * @returns Promise vazia
   */
  clear(): Promise<void>;
}

/**
 * Implementação de Storage que usa memória
 * @class MemoryStorage
 * @description Armazenamento em memória para uso em testes ou ambientes sem localStorage
 * 
 * @example
 * ```ts
 * const storage = new MemoryStorage();
 * await storage.setItem('user', 'John');
 * const user = await storage.getItem('user'); // "John"
 * ```
 */
export class MemoryStorage implements Storage {
  private store: Map<string, string> = new Map();

  async getItem(key: string): Promise<string | null> {
    return this.store.get(key) || null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }
}

/**
 * Cria uma instância de Storage com prefixo opcional
 * @param prefix - Prefixo para todas as chaves (padrão: 'rainersoft')
 * @returns Instância de Storage
 * @description Retorna localStorage se disponível, caso contrário retorna MemoryStorage
 * 
 * @example
 * ```ts
 * const storage = createStorage('myapp');
 * await storage.setItem('token', 'abc123'); // Salva como "myapp:token"
 * const token = await storage.getItem('token'); // "abc123"
 * ```
 */
export const createStorage = (prefix = 'rainersoft'): Storage => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return {
      async getItem(key: string) {
        return localStorage.getItem(`${prefix}:${key}`);
      },
      async setItem(key: string, value: string) {
        localStorage.setItem(`${prefix}:${key}`, value);
      },
      async removeItem(key: string) {
        localStorage.removeItem(`${prefix}:${key}`);
      },
      async clear() {
        const keys = Object.keys(localStorage).filter((k) => k.startsWith(`${prefix}:`));
        keys.forEach((k) => localStorage.removeItem(k));
      },
    };
  }
  return new MemoryStorage();
};
