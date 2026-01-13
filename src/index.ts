/**
 * @rainersoft/utils - Biblioteca Universal de Utilitários
 *
 * Utilitários universais para formatação, conversão e manipulação de dados.
 * Agnóstico de framework - funciona em Web, Desktop e Mobile.
 * Suporte a múltiplos idiomas: pt-BR, en-US, es-ES.
 *
 * @module @rainersoft/utils
 * @author Rainer Teixeira
 * @version 1.3.0
 */

// Exportações principais
export * from './types';

// Exportações específicas para evitar conflitos de nomes
export { hexToRgb, validateContrast } from './accessibility';

// Exportações restantes
export * from './date';
export * from './status';
export * from './validation';
export * from './content';
export * from './color';
export * from './dom';
export * from './hooks';
export * from './stats';
export * from './authentication';
export * from './search';

// ============================================================================
// STRING UTILITIES (sem conflitos)
// ============================================================================
export { 
  textToSlug, 
  formatPhone, 
  formatCPF, 
  formatCNPJ, 
  isCPF, 
  isCNPJ,
  getInitials,
  truncate,
} from './string';
export { formatCurrency } from './number';
export { usePasswordStrength } from './hooks/use-password-strength';

// Exportações type
export type { TiptapNode, TiptapJSON, ContentStats } from './content';

// Helpers pt-BR
export * as ptBR from './pt-br';

// Exportações de texto (text utilities)
export {
  extractInitials,
  generateAvatarUrl,
  isValidAvatarUrl,
  getAvatarColorFromName,
  generateDynamicAvatarUrl,
  generateUniqueId,
  truncateText,
  capitalize,
  cleanText,
  countWords,
  isEmpty,
  normalizeSpaces,
  calculateReadingTime
} from './text';

// Aliases descritivos
import * as textModule from './text';
import * as dateModule from './date';
import * as authModule from './authentication';
import * as statusModule from './status';

export const textProcessing = textModule;
export const datetime = dateModule;
export const authentication = authModule;
export const stateManagement = statusModule;