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
export * from './utils';
export * from './error';

// Exportação compatível para validateEmail
export { validateEmailSimple as validateEmail } from './error';

// Exportações específicas para evitar conflitos de nomes
export { hexToRgb } from './color';

// Exportações restantes
export * from './date';
export * from './status';
export * from './validation';
export * from './color';
export * from './dom';
export * from './stats';
export * from './authentication';
export * from './search';
export * from './image';
export * from './cookie';
export * from './hooks'; // ✅ NOVO: Hooks migrados

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

// Exportações type - mantidos apenas os que existem
// export type { TiptapNode, TiptapJSON, ContentStats } from './content';

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