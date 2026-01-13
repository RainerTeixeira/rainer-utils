/**
 * Content Utilities Module
 * 
 * Utilitários para processamento de conteúdo, incluindo Tiptap Editor,
 * extração de texto, validação e estatísticas.
 * 
 * @module @rainersoft/utils/content
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// TIPTAP UTILITIES
// ============================================================================

export {
  extractTextFromTiptap,
  generateExcerpt,
  createEmptyTiptapContent,
  isContentEmpty,
  countWords,
  countCharacters,
  getReadingTime,
  getContentStats,
  cleanText,
  containsText,
  replaceText,
} from './tiptap-utils';

// ============================================================================
// TYPES
// ============================================================================

export type {
  TiptapNode,
  TiptapJSON,
  ContentStats,
} from './tiptap-utils';
