/**
 * Tiptap Content Utilities
 * 
 * Utilitários para processamento de conteúdo Tiptap Editor.
 * Extração de texto, geração de excerpts, validação e estatísticas.
 * 
 * @module @rainersoft/utils/content
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

// ============================================================================
// TYPES
// ============================================================================

export interface TiptapNode {
  type: string;
  text?: string;
  content?: TiptapNode[];
  attrs?: Record<string, any>;
}

export interface TiptapJSON {
  type: 'doc';
  content: TiptapNode[];
}

export interface ContentStats {
  wordCount: number;
  characterCount: number;
  readingTime: number;
}

// ============================================================================
// TEXT EXTRACTION
// ============================================================================

/**
 * Extrai texto de conteúdo Tiptap (JSON)
 * 
 * Processa recursivamente a estrutura JSON do Tiptap para extrair
 * todo o texto em formato string, ignorando marcações e metadados.
 * 
 * @param content - Conteúdo JSON do Tiptap
 * @returns Texto extraído do conteúdo
 * 
 * @example
 * ```ts
 * const content = {
 *   type: 'doc',
 *   content: [
 *     { type: 'paragraph', content: [{ type: 'text', text: 'Olá mundo' }] }
 *   ]
 * };
 * extractTextFromTiptap(content) // "Olá mundo"
 * ```
 */
export function extractTextFromTiptap(content: TiptapJSON): string {
  /**
   * Extrai texto de um nó Tiptap (recursivo)
   */
  function extractFromNode(node: TiptapJSON | TiptapNode): string {
    if ('text' in node && typeof node.text === 'string') {
      return node.text;
    }

    if ('content' in node && Array.isArray(node.content)) {
      return node.content
        .map((child: TiptapNode) => extractFromNode(child))
        .join(' ');
    }

    return '';
  }

  return extractFromNode(content).trim();
}

/**
 * Gera excerpt (resumo) do conteúdo Tiptap
 * 
 * Extrai texto do conteúdo e limita a um tamanho máximo.
 * Perfeito para previews, meta descriptions, etc.
 * 
 * @param content - Conteúdo JSON do Tiptap
 * @param maxLength - Tamanho máximo do excerpt (padrão: 160 caracteres)
 * @returns Excerpt formatado com "..." se truncado
 * 
 * @example
 * ```ts
 * const content = { type: 'doc', content: [...] };
 * generateExcerpt(content, 50) // "Primeiros 50 caracteres..."
 * ```
 */
export function generateExcerpt(
  content: TiptapJSON,
  maxLength: number = 160
): string {
  const text = extractTextFromTiptap(content);

  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength).trim() + '...';
}

// ============================================================================
// CONTENT CREATION
// ============================================================================

/**
 * Cria conteúdo JSON vazio do Tiptap
 * 
 * Retorna uma estrutura Tiptap válida mas vazia.
 * Útil para inicializar editores ou criar novos posts.
 * 
 * @returns Documento vazio do Tiptap
 * 
 * @example
 * ```ts
 * const emptyContent = createEmptyTiptapContent();
 * // { type: 'doc', content: [] }
 * ```
 */
export function createEmptyTiptapContent(): TiptapJSON {
  return {
    type: 'doc',
    content: [],
  };
}

// ============================================================================
// CONTENT VALIDATION
// ============================================================================

/**
 * Verifica se o conteúdo Tiptap está vazio
 * 
 * Analisa o conteúdo para determinar se não há texto útil.
 * Considera espaços em branco e elementos vazios.
 * 
 * @param content - Conteúdo JSON do Tiptap
 * @returns true se o conteúdo estiver vazio
 * 
 * @example
 * ```ts
 * const empty = { type: 'doc', content: [] };
 * isContentEmpty(empty) // true
 * 
 * const withText = { type: 'doc', content: [
 *   { type: 'paragraph', content: [{ type: 'text', text: 'Olá' }] }
 * ]};
 * isContentEmpty(withText) // false
 * ```
 */
export function isContentEmpty(content: TiptapJSON): boolean {
  if (!content || !content.content || content.content.length === 0) {
    return true;
  }

  const text = extractTextFromTiptap(content);
  return text.trim().length === 0;
}

// ============================================================================
// CONTENT STATISTICS
// ============================================================================

/**
 * Conta palavras no conteúdo Tiptap
 * 
 * Conta o número de palavras usando um algoritmo simples
 * que separa por espaços em branco.
 * 
 * @param content - Conteúdo JSON do Tiptap
 * @returns Número de palavras no conteúdo
 * 
 * @example
 * ```ts
 * const content = { type: 'doc', content: [
 *   { type: 'paragraph', content: [{ type: 'text', text: 'Olá mundo' }] }
 * ]};
 * countWords(content) // 2
 * ```
 */
export function countWords(content: TiptapJSON): number {
  const text = extractTextFromTiptap(content);
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Conta caracteres no conteúdo Tiptap
 * 
 * @param content - Conteúdo JSON do Tiptap
 * @returns Número de caracteres no conteúdo
 */
export function countCharacters(content: TiptapJSON): number {
  return extractTextFromTiptap(content).length;
}

/**
 * Calcula tempo de leitura estimado
 * 
 * Baseado na velocidade média de leitura de 200 palavras por minuto.
 * 
 * @param content - Conteúdo JSON do Tiptap
 * @param wordsPerMinute - Velocidade de leitura (padrão: 200)
 * @returns Tempo de leitura em minutos
 * 
 * @example
 * ```ts
 * const content = { type: 'doc', content: [...] };
 * getReadingTime(content) // 2.5 (para 500 palavras)
 * ```
 */
export function getReadingTime(
  content: TiptapJSON,
  wordsPerMinute: number = 200
): number {
  const wordCount = countWords(content);
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Obtém estatísticas completas do conteúdo
 * 
 * Retorna um objeto com todas as métricas relevantes:
 * - Contagem de palavras
 * - Contagem de caracteres
 * - Tempo de leitura estimado
 * 
 * @param content - Conteúdo JSON do Tiptap
 * @returns Estatísticas completas do conteúdo
 * 
 * @example
 * ```ts
 * const stats = getContentStats(content);
 * console.log(stats);
 * // { wordCount: 150, characterCount: 800, readingTime: 1 }
 * ```
 */
export function getContentStats(content: TiptapJSON): ContentStats {
  const wordCount = countWords(content);
  const characterCount = extractTextFromTiptap(content).length;
  const readingTime = getReadingTime(content);

  return {
    wordCount,
    characterCount,
    readingTime,
  };
}

// ============================================================================
// CONTENT TRANSFORMATION
// ============================================================================

/**
 * Limpa e normaliza texto do conteúdo
 * 
 * Remove espaços extras, normaliza quebras de linha
 * e limpa caracteres especiais indesejados.
 * 
 * @param content - Conteúdo JSON do Tiptap
 * @returns Texto limpo e normalizado
 */
export function cleanText(content: TiptapJSON): string {
  const text = extractTextFromTiptap(content);
  
  return text
    .replace(/\s+/g, ' ') // Normaliza espaços
    .replace(/\n\s*\n/g, '\n') // Remove quebras de linha vazias
    .replace(/^\s+|\s+$/g, '') // Remove espaços no início/fim
    .trim();
}

/**
 * Verifica se o conteúdo contém texto específico
 * 
 * Busca case-insensitive por uma palavra ou frase no conteúdo.
 * 
 * @param content - Conteúdo JSON do Tiptap
 * @param searchText - Texto para buscar
 * @returns true se encontrar o texto
 * 
 * @example
 * ```ts
 * const content = { type: 'doc', content: [
 *   { type: 'paragraph', content: [{ type: 'text', text: 'Olá mundo' }] }
 * ]};
 * containsText(content, 'mundo') // true
 * containsText(content, 'planeta') // false
 * ```
 */
export function containsText(content: TiptapJSON, searchText: string): boolean {
  const text = extractTextFromTiptap(content).toLowerCase();
  return text.includes(searchText.toLowerCase());
}

/**
 * Substitui texto no conteúdo Tiptap
 * 
 * Busca e substitui texto em todo o conteúdo.
 * Operação case-insensitive.
 * 
 * @param content - Conteúdo JSON do Tiptap
 * @param searchText - Texto para buscar
 * @param replaceText - Texto para substituir
 * @returns Conteúdo atualizado com o texto substituído
 * 
 * @example
 * ```ts
 * const content = { type: 'doc', content: [
 *   { type: 'paragraph', content: [{ type: 'text', text: 'Olá mundo' }] }
 * ]};
 * const updated = replaceText(content, 'mundo', 'planeta');
 * // Resultado: "Olá planeta"
 * ```
 */
export function replaceText(
  content: TiptapJSON,
  searchText: string,
  replaceText: string
): TiptapJSON {
  /**
   * Processa nó recursivamente para substituir texto
   */
  function processNode(node: TiptapNode): TiptapNode {
    const newNode = { ...node };

    // Substituir texto no nó atual
    if ('text' in node && typeof node.text === 'string') {
      newNode.text = node.text.replace(
        new RegExp(searchText, 'gi'),
        replaceText
      );
    }

    // Processar nós filhos recursivamente
    if ('content' in node && Array.isArray(node.content)) {
      newNode.content = node.content.map(child => processNode(child));
    }

    return newNode;
  }

  // Processar conteúdo principal
  const newContent = {
    ...content,
    content: content.content.map(node => processNode(node))
  };

  return newContent;
}
