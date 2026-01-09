/**
 * Text Utilities
 *
 * Utilitários universais para manipulação de texto e strings.
 *
 * @module @rainersoft/utils/text
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// AVATAR UTILITIES
// ============================================================================

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
 * Gera URL do avatar com base no nome
 *
 * @param name - Nome para gerar avatar
 * @param size - Tamanho do avatar (default: 200)
 * @param backgroundColor - Cor de fundo (default: cyan)
 * @param textColor - Cor do texto (default: white)
 * @returns URL do avatar
 *
 * @example
 * ```ts
 * generateAvatarUrl('John Doe') // URL do avatar
 * generateAvatarUrl('John Doe', 100, 'f97316', 'fff') // URL com cor laranja
 * ```
 */
export function generateAvatarUrl(
  name: string,
  size: number = 200,
  backgroundColor: string = '0891b2',
  textColor: string = 'fff'
): string {
  const encodedName = encodeURIComponent(name);
  
  return `https://ui-avatars.com/api/?name=${encodedName}&size=${size}&background=${backgroundColor}&color=${textColor}&font-size=0.5`;
}

/**
 * Valida se uma URL de avatar é válida
 *
 * @param url - URL do avatar
 * @returns true se a URL for válida
 *
 * @example
 * ```ts
 * isValidAvatarUrl('https://example.com/avatar.jpg') // true
 * isValidAvatarUrl('invalid-url') // false
 * ```
 */
export function isValidAvatarUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Obtém a cor do avatar baseada no hash do nome
 *
 * @param name - Nome para gerar cor
 * @returns Cor em formato hexadecimal
 *
 * @example
 * ```ts
 * getAvatarColorFromName('John Doe') // '#0891b2' (ou outra cor)
 * getAvatarColorFromName('') // '#0891b2' (cor padrão)
 * ```
 */
export function getAvatarColorFromName(name: string): string {
  if (!name || typeof name !== 'string') {
    return '#0891b2'; // cyan-600 como padrão
  }

  // Gera hash simples do nome
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Cores baseadas em design tokens (compatível com @rainersoft/design-tokens)
  const colors = [
    '#0891b2', // cyan-600
    '#9333ea', // purple-600
    '#db2777', // pink-600
    '#059669', // emerald-600
    '#2563eb', // blue-600
    '#f97316', // orange-500
    '#dc2626', // red-600
    '#7c3aed', // violet-600
  ];

  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

/**
 * Gera avatar com cor baseada no nome
 *
 * @param name - Nome para gerar avatar
 * @param size - Tamanho do avatar
 * @returns URL do avatar com cor automática
 *
 * @example
 * ```ts
 * generateDynamicAvatarUrl('John Doe') // URL com cor baseada no nome
 * generateDynamicAvatarUrl('Jane Smith', 150) // URL com tamanho 150
 * ```
 */
export function generateDynamicAvatarUrl(name: string, size: number = 200): string {
  const color = getAvatarColorFromName(name);
  const colorHex = color.replace('#', '');
  return generateAvatarUrl(name, size, colorHex, 'fff');
}

// ============================================================================
// TEXT UTILITIES
// ============================================================================

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

/**
 * Calcula tempo de leitura baseado no conteúdo
 *
 * Suporta múltiplos formatos:
 * - JSON (objeto com conteúdo estruturado)
 * - HTML (string com tags)
 * - Texto simples (string)
 *
 * @param content - Conteúdo a analisar (objeto JSON, HTML ou texto)
 * @param wordsPerMinute - Palavras por minuto (padrão: 200)
 * @returns Tempo de leitura em minutos (mínimo: 1)
 *
 * @example
 * ```ts
 * // JSON estruturado
 * const jsonContent = { type: 'doc', content: [...] };
 * calculateReadingTime(jsonContent) // 5
 *
 * // HTML
 * calculateReadingTime('<p>Texto longo...</p>') // 3
 *
 * // Texto simples
 * calculateReadingTime('Texto simples') // 1
 * ```
 */
export function calculateReadingTime(
  content: string | Record<string, any>,
  wordsPerMinute: number = 200
): number {
  let text = '';

  // Se for objeto (JSON estruturado)
  if (typeof content === 'object' && content !== null) {
    // Extrai texto de estrutura JSON recursivamente
    const extractText = (node: any): string => {
      if (!node) return '';
      
      let result = '';
      
      // Se tem texto direto
      if (node.text) {
        result += node.text + ' ';
      }
      
      // Se tem conteúdo (array de nós)
      if (Array.isArray(node.content)) {
        result += node.content.map(extractText).join(' ');
      }
      
      return result;
    };
    
    text = extractText(content);
  } else if (typeof content === 'string') {
    // Se for HTML ou texto simples, remove tags HTML
    text = content.replace(/<[^>]*>/g, '');
  }

  const words = text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;
  const time = Math.ceil(words / wordsPerMinute);

  // Retorna no mínimo 1 minuto
  return time > 0 ? time : 1;
}
