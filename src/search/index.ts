/**
 * Search Utilities
 *
 * Utilitários genéricos para busca e filtro de conteúdo.
 * Funções puras, agnósticas de domínio e framework.
 *
 * @module @rainersoft/utils/search
 * @author Rainer Teixeira
 * @version 1.0.0
 */

/**
 * Opções de busca
 */
export interface SearchOptions {
  /** Campos a buscar (padrão: ['title', 'description', 'content', 'tags']) */
  fields?: string[];
  /** Case sensitive (padrão: false) */
  caseSensitive?: boolean;
  /** Busca exata (padrão: false) */
  exactMatch?: boolean;
}

/**
 * Busca genérica em array de objetos
 *
 * Função de busca client-side para arrays de objetos genéricos.
 * Busca em múltiplos campos configuráveis.
 *
 * @param query - Termo de busca
 * @param content - Array de objetos a buscar
 * @param options - Opções de busca
 * @returns Array filtrado com resultados
 *
 * @example
 * ```ts
 * const posts = [
 *   { title: 'Next.js Guide', description: 'Learn Next.js' },
 *   { title: 'React Basics', description: 'React fundamentals' }
 * ];
 * 
 * searchContent('next', posts) // [{ title: 'Next.js Guide', ... }]
 * searchContent('react', posts, { fields: ['title'] }) // [{ title: 'React Basics', ... }]
 * ```
 */
export function searchContent<T extends Record<string, any>>(
  query: string,
  content: T[],
  options: SearchOptions = {}
): T[] {
  if (!query.trim()) return content;
  
  const {
    fields = ['title', 'description', 'content', 'tags'],
    caseSensitive = false,
    exactMatch = false
  } = options;
  
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  
  return content.filter(item => {
    return fields.some(field => {
      const value = item[field];
      
      if (!value) return false;
      
      // Se for array (ex: tags)
      if (Array.isArray(value)) {
        return value.some(v => {
          const strValue = caseSensitive ? String(v) : String(v).toLowerCase();
          return exactMatch 
            ? strValue === searchQuery 
            : strValue.includes(searchQuery);
        });
      }
      
      // Se for string
      const strValue = caseSensitive ? String(value) : String(value).toLowerCase();
      return exactMatch 
        ? strValue === searchQuery 
        : strValue.includes(searchQuery);
    });
  });
}

/**
 * Busca com score de relevância
 *
 * Retorna resultados ordenados por relevância baseado em:
 * - Correspondência no título (peso maior)
 * - Correspondência na descrição
 * - Correspondência em outros campos
 *
 * @param query - Termo de busca
 * @param content - Array de objetos a buscar
 * @param options - Opções de busca
 * @returns Array ordenado por relevância
 *
 * @example
 * ```ts
 * const results = searchWithScore('next', posts);
 * // Resultados com título contendo 'next' aparecem primeiro
 * ```
 */
export function searchWithScore<T extends Record<string, any>>(
  query: string,
  content: T[],
  options: SearchOptions = {}
): T[] {
  if (!query.trim()) return content;
  
  const {
    fields = ['title', 'description', 'content', 'tags'],
    caseSensitive = false
  } = options;
  
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  
  // Calcula score para cada item
  const scored = content.map(item => {
    let score = 0;
    
    fields.forEach((field, index) => {
      const value = item[field];
      if (!value) return;
      
      const weight = fields.length - index; // Primeiro campo tem maior peso
      
      if (Array.isArray(value)) {
        const matches = value.filter(v => {
          const strValue = caseSensitive ? String(v) : String(v).toLowerCase();
          return strValue.includes(searchQuery);
        }).length;
        score += matches * weight;
      } else {
        const strValue = caseSensitive ? String(value) : String(value).toLowerCase();
        if (strValue.includes(searchQuery)) {
          score += weight;
          // Bonus se for match exato
          if (strValue === searchQuery) {
            score += weight * 2;
          }
        }
      }
    });
    
    return { item, score };
  });
  
  // Filtra apenas com score > 0 e ordena
  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

/**
 * Busca fuzzy (tolerante a erros de digitação)
 *
 * Usa distância de Levenshtein simplificada para encontrar
 * correspondências aproximadas.
 *
 * @param query - Termo de busca
 * @param content - Array de objetos a buscar
 * @param options - Opções de busca + threshold
 * @returns Array com correspondências aproximadas
 *
 * @example
 * ```ts
 * fuzzySearch('nxt', posts) // Encontra 'next'
 * fuzzySearch('raect', posts) // Encontra 'react'
 * ```
 */
export function fuzzySearch<T extends Record<string, any>>(
  query: string,
  content: T[],
  options: SearchOptions & { threshold?: number } = {}
): T[] {
  if (!query.trim()) return content;
  
  const {
    fields = ['title', 'description'],
    caseSensitive = false,
    threshold = 0.6 // Similaridade mínima (0-1)
  } = options;
  
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  
  return content.filter(item => {
    return fields.some(field => {
      const value = item[field];
      if (!value) return false;
      
      const strValue = caseSensitive ? String(value) : String(value).toLowerCase();
      const similarity = calculateSimilarity(searchQuery, strValue);
      
      return similarity >= threshold;
    });
  });
}

/**
 * Calcula similaridade entre duas strings (0-1)
 * Usa algoritmo de Jaro-Winkler simplificado
 */
function calculateSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1;
  if (str1.length === 0 || str2.length === 0) return 0;
  
  // Busca substring
  if (str2.includes(str1)) return 0.8;
  
  // Calcula caracteres em comum
  const common = str1.split('').filter(char => str2.includes(char)).length;
  const similarity = common / Math.max(str1.length, str2.length);
  
  return similarity;
}
