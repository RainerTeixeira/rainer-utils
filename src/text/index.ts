/**
 * Text Utilities
 *
 * Utilitários universais para manipulação de texto e strings.
 *
 * @module @rainersoft/utils/text
 * @author Rainer Teixeira
 * @version 1.0.0
 */

/**
 * Extrai iniciais de um nome
 *
 * @param name - Nome completo
 * @param maxChars - Número máximo de caracteres (padrão: 2)
 * @returns Iniciais do nome em maiúsculas
 *
 * @example
 * ```ts
 * extractInitials('John Doe') // 'JD'
 * extractInitials('Maria Silva Santos') // 'MS'
 * extractInitials('Apple') // 'A'
 * extractInitials('', 3) // ''
 * ```
 */
export function extractInitials(name: string | null | undefined, maxChars = 2): string {
  if (!name || !name.trim()) {
    return '';
  }

  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, maxChars)
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  return initials;
}

/**
 * Gera ID único baseado em texto
 *
 * @param text - Texto base para o ID
 * @param prefix - Prefixo opcional
 * @param suffix - Sufixo opcional
 * @returns ID único em formato slug
 *
 * @example
 * ```ts
 * generateUniqueId('Hello World') // 'hello-world'
 * generateUniqueId('Hello World', 'section') // 'section-hello-world'
 * generateUniqueId('Olá! Como vai?', '', '123') // 'ola-como-vai-123'
 * ```
 */
export function generateUniqueId(
  text: string,
  prefix = '',
  suffix = ''
): string {
  const slug = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim()
    .substring(0, 50); // Limita tamanho

  const parts = [prefix, slug, suffix].filter(Boolean);
  return parts.join('-');
}

/**
 * Trunca texto com elipse
 *
 * @param text - Texto para truncar
 * @param maxLength - Comprimento máximo
 * @param suffix - Sufixo para adicionar (padrão: '...')
 * @returns Texto truncado
 *
 * @example
 * ```ts
 * truncateText('Hello World', 5) // 'Hello...'
 * truncateText('Hello World', 8, '...') // 'Hello...'
 * truncateText('Short', 10) // 'Short'
 * ```
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix = '...'
): string {
  if (!text || text.length <= maxLength) {
    return text || '';
  }

  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitaliza primeira letra de cada palavra
 *
 * @param text - Texto para capitalizar
 * @param options - Opções de capitalização
 * @returns Texto capitalizado
 *
 * @example
 * ```ts
 * capitalize('hello world') // 'Hello World'
 * capitalize('hello world', { firstWordOnly: true }) // 'Hello world'
 * capitalize('HELLO WORLD', { lowerRest: true }) // 'Hello World'
 * ```
 */
export function capitalize(
  text: string,
  options: { firstWordOnly?: boolean; lowerRest?: boolean } = {}
): string {
  if (!text) return '';

  const { firstWordOnly = false, lowerRest = false } = options;

  if (firstWordOnly) {
    return text.charAt(0).toUpperCase() + 
           (lowerRest ? text.slice(1).toLowerCase() : text.slice(1));
  }

  if (lowerRest) {
    return text.replace(/\b\w/g, char => char.toUpperCase()).toLowerCase();
  }

  return text.replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Remove caracteres especiais mantendo apenas alfanuméricos e espaços
 *
 * @param text - Texto para limpar
 * @param allowSpaces - Se deve permitir espaços
 * @returns Texto limpo
 *
 * @example
 * ```ts
 * cleanText('Olá! Como vai?') // 'Ola Como vai'
 * cleanText('Olá! Como vai?', false) // 'OlaComoVai'
 * ```
 */
export function cleanText(text: string, allowSpaces = true): string {
  if (!text) return '';

  const pattern = allowSpaces ? /[^\w\s]/g : /[^\w]/g;
  return text.replace(pattern, '');
}

/**
 * Conta palavras em um texto
 *
 * @param text - Texto para contar
 * @returns Número de palavras
 *
 * @example
 * ```ts
 * countWords('Hello world') // 2
 * countWords('  Hello   world  ') // 2
 * countWords('') // 0
 * ```
 */
export function countWords(text: string): number {
  if (!text || !text.trim()) {
    return 0;
  }

  return text.trim().split(/\s+/).length;
}

/**
 * Verifica se texto está vazio ou contém apenas espaços
 *
 * @param text - Texto para verificar
 * @returns True se estiver vazio
 *
 * @example
 * ```ts
 * isEmpty('') // true
 * isEmpty('   ') // true
 * isEmpty('Hello') // false
 * ```
 */
export function isEmpty(text: string | null | undefined): boolean {
  return !text || !text.trim();
}

/**
 * Remove espaços em branco extras
 *
 * @param text - Texto para limpar
 * @param options - Opções de limpeza
 * @returns Texto sem espaços extras
 *
 * @example
 * ```ts
 * normalizeSpaces('  Hello   World  ') // 'Hello World'
 * normalizeSpaces('Hello\nWorld', { newlines: true }) // 'Hello World'
 * ```
 */
export function normalizeSpaces(
  text: string,
  options: { newlines?: boolean } = {}
): string {
  if (!text) return '';

  const { newlines = false } = options;
  
  let cleaned = text;
  
  if (newlines) {
    cleaned = cleaned.replace(/\s+/g, ' ');
  } else {
    cleaned = cleaned.replace(/\s+/g, ' ');
  }
  
  return cleaned.trim();
}
