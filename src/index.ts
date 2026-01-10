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

// ============================================================================
// TYPES
// ============================================================================
export * from './types';

// ============================================================================
// TEXT PROCESSING (Nome descritivo)
// ============================================================================
export * from './text';

// ============================================================================
// STRING UTILITIES (sem conflitos)
// ============================================================================
export { textToSlug, formatPhone, formatCPF, formatCNPJ, isCPF, isCNPJ } from './string';

// ============================================================================
// DATETIME (Nome descritivo)
// ============================================================================
export * from './date';

// ============================================================================
// NUMBER UTILITIES (sem conflitos)
// ============================================================================
export { formatCurrency } from './number';

// ============================================================================
// STATE MANAGEMENT (Nome descritivo)
// ============================================================================
export * from './status';

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================
export * from './validation';

// ============================================================================
// DOM UTILITIES
// ============================================================================
export * from './dom';

// ============================================================================
// STATS UTILITIES
// ============================================================================
export * from './stats';

// ============================================================================
// AUTHENTICATION (Nome descritivo)
// ============================================================================
export * from './authentication';

// ============================================================================
// SEARCH UTILITIES
// ============================================================================
export * from './search';

// ============================================================================
// HOOKS
// ============================================================================
export * from './hooks/use-password-strength';

// ============================================================================
// PT-BR HELPERS (Pré-configurado para português)
// ============================================================================
export * as ptBR from './pt-br';

// ============================================================================
// MÓDULOS COM NOMES DESCRITIVOS (Novos aliases profissionais)
// ============================================================================
import * as textModule from './text';
import * as dateModule from './date';
import * as authModule from './authentication';
import * as statusModule from './status';

export const textProcessing = textModule;
export const datetime = dateModule;
export const authentication = authModule;
export const stateManagement = statusModule;
