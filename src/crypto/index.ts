/**
 * Crypto Utilities
 *
 * Utilitários para criptografia, hash e geração de IDs únicos.
 * Funciona tanto no browser quanto no Node.js.
 *
 * @module @rainersoft/utils/crypto
 * @author Rainer Teixeira
 * @version 1.0.0
 */

/**
 * Gera um ID único baseado em timestamp e string aleatória
 * @returns String com ID único
 * 
 * @example
 * ```ts
 * const id = generateId();
 * console.log(id); // "1706112000000-x7k9m2p4q"
 * ```
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Gera um UUID v4 conforme RFC 4122
 * @returns UUID no formato xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 * 
 * @example
 * ```ts
 * const uuid = generateUUID();
 * console.log(uuid); // "550e8400-e29b-41d4-a716-446655440000"
 * ```
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Cria um hash SHA-256 de uma string
 * @param text - Texto a ser hasheado
 * @returns Promise que resolve com o hash em hexadecimal
 * @remarks Em ambientes sem window.crypto.subtle, retorna o texto original (apenas para desenvolvimento)
 * 
 * @example
 * ```ts
 * const hashed = await hash('minha-senha');
 * console.log(hashed); // "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
 * ```
 */
export const hash = async (text: string): Promise<string> => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback simples para Node.js - em produção usar crypto nativo
  return text;
};

/**
 * Codifica uma string para Base64
 * @param text - Texto a ser codificado
 * @returns String codificada em Base64
 * @remarks Funciona tanto no browser quanto no Node.js
 * 
 * @example
 * ```ts
 * const encoded = base64Encode('Hello World');
 * console.log(encoded); // "SGVsbG8gV29ybGQ="
 * ```
 */
export const base64Encode = (text: string): string => {
  if (typeof window !== 'undefined') {
    return window.btoa(text);
  }
  return Buffer.from(text).toString('base64');
};

/**
 * Decodifica uma string de Base64
 * @param encoded - Texto codificado em Base64
 * @returns String decodificada
 * @remarks Funciona tanto no browser quanto no Node.js
 * 
 * @example
 * ```ts
 * const decoded = base64Decode('SGVsbG8gV29ybGQ=');
 * console.log(decoded); // "Hello World"
 * ```
 */
export const base64Decode = (encoded: string): string => {
  if (typeof window !== 'undefined') {
    return window.atob(encoded);
  }
  return Buffer.from(encoded, 'base64').toString('utf-8');
};
