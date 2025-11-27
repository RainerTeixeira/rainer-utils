/**
 * String Utilities
 *
 * Utilitários para manipulação e formatação de strings.
 * Funções puras, sem dependências externas, prontas para qualquer plataforma.
 *
 * @module @rainersoft/utils/string
 * @author Rainer Teixeira
 */

/**
 * Converte texto para slug URL-friendly
 *
 * @param text - Texto para converter
 * @returns Slug normalizado
 *
 * @example
 * textToSlug('Meu Post Incrível!') // 'meu-post-incrivel'
 * textToSlug('São Paulo - SP') // 'sao-paulo-sp'
 */
export function textToSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Capitaliza primeira letra de cada palavra
 *
 * @param text - Texto para capitalizar
 * @returns Texto capitalizado
 *
 * @example
 * capitalize('rainer teixeira') // 'Rainer Teixeira'
 */
export function capitalize(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Trunca texto com ellipsis
 *
 * @param text - Texto para truncar
 * @param maxLength - Comprimento máximo
 * @param suffix - Sufixo (padrão: '...')
 * @returns Texto truncado
 *
 * @example
 * truncate('Texto muito longo', 10) // 'Texto muit...'
 */
export function truncate(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Remove acentos de texto
 *
 * @param text - Texto com acentos
 * @returns Texto sem acentos
 *
 * @example
 * removeAccents('São Paulo') // 'Sao Paulo'
 */
export function removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Extrai iniciais de um nome
 *
 * @param name - Nome completo
 * @param maxInitials - Máximo de iniciais (padrão: 2)
 * @returns Iniciais em maiúsculas
 *
 * @example
 * getInitials('Rainer Teixeira') // 'RT'
 * getInitials('João da Silva Santos', 3) // 'JSS'
 */
export function getInitials(name: string, maxInitials = 2): string {
  return name
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, maxInitials);
}

/**
 * Valida se string é vazia ou apenas espaços
 *
 * @param text - Texto para validar
 * @returns true se vazio, false caso contrário
 */
export function isEmpty(text: string | null | undefined): boolean {
  return !text || text.trim().length === 0;
}

/**
 * Conta palavras em um texto
 *
 * @param text - Texto para contar
 * @returns Número de palavras
 */
export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}
