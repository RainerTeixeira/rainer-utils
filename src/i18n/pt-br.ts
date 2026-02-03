/**
 * Helpers pt-BR - Funções pré-configuradas para português brasileiro
 * 
 * Este módulo fornece wrappers convenientes para funções de formatação
 * com o locale 'pt-BR' pré-configurado, eliminando a necessidade de
 * passar o parâmetro locale repetidamente.
 * 
 * Ideal para projetos exclusivamente em português brasileiro.
 * 
 * @module @rainersoft/utils/pt-br
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import {
  formatDate as formatDateBase,
  formatDateTime as formatDateTimeBase,
  formatRelativeDate as formatRelativeDateBase,
} from '../date';

import {
  formatCurrency as formatCurrencyBase,
  formatNumber as formatNumberBase,
  formatCompact as formatCompactBase,
} from '../number';

import {
  translateStatus as translateStatusBase,
} from '../status';

/**
 * Formata uma data em português brasileiro (pt-BR)
 * 
 * @param date - Data a ser formatada (string ou objeto Date)
 * @param format - Formato desejado: 'short', 'long' ou 'full' (padrão: 'long')
 * @returns Data formatada em português brasileiro
 * 
 * @example
 * formatDate(new Date()); // '26 de novembro de 2025'
 * formatDate('2024-01-15', 'short'); // '15/01/2024'
 */
export function formatDate(
  date: string | Date,
  format: 'short' | 'long' | 'full' = 'long'
): string {
  return formatDateBase(date, format, 'pt-BR');
}

/**
 * Formata data e hora em português brasileiro (pt-BR)
 * 
 * @param date - Data com hora a ser formatada
 * @returns Data e hora formatadas em português brasileiro
 * 
 * @example
 * formatDateTime(new Date()); // '26 de novembro de 2025 às 14:30'
 */
export function formatDateTime(date: string | Date): string {
  return formatDateTimeBase(date, 'pt-BR');
}

/**
 * Formata uma data relativa em português brasileiro
 * 
 * Exibe o tempo relativo (ex: "há 2 dias", "há 1 mês")
 * 
 * @param date - Data de referência
 * @returns Data relativa formatada em português
 * 
 * @example
 * formatRelativeDate(new Date(Date.now() - 86400000)); // 'há 1 dia'
 */
export function formatRelativeDate(date: string | Date): string {
  return formatRelativeDateBase(date, 'pt-BR');
}

/**
 * Formata um valor monetário em Real brasileiro (BRL)
 * 
 * @param value - Valor numérico a ser formatado
 * @param options - Opções adicionais de formatação (Intl.NumberFormatOptions)
 * @returns Valor formatado como moeda brasileira
 * 
 * @example
 * formatCurrency(1234.56); // 'R$ 1.234,56'
 * formatCurrency(99.99, { minimumFractionDigits: 2 }); // 'R$ 99,99'
 */
export function formatCurrency(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return formatCurrencyBase(value, 'pt-BR', options);
}

/**
 * Formata um número em português brasileiro
 * 
 * @param value - Número a ser formatado
 * @param decimals - Número de casas decimais (padrão: 0)
 * @returns Número formatado com separadores brasileiros
 * 
 * @example
 * formatNumber(1234567); // '1.234.567'
 * formatNumber(1234.567, 2); // '1.234,57'
 */
export function formatNumber(value: number, decimals = 0): string {
  return formatNumberBase(value, decimals, 'pt-BR');
}

/**
 * Formata um número de forma compacta em português brasileiro
 * 
 * Usa sufixos como "mil", "mi", "bi" para números grandes
 * 
 * @param value - Número a ser formatado
 * @param decimals - Casas decimais para números compactos (padrão: 1)
 * @returns Número formatado de forma compacta
 * 
 * @example
 * formatCompact(1500); // '1,5 mil'
 * formatCompact(2500000); // '2,5 mi'
 */
export function formatCompact(value: number, decimals = 1): string {
  return formatCompactBase(value, decimals, 'pt-BR');
}

/**
 * Traduz um código de status para português brasileiro
 * 
 * @param status - Código do status (ex: 'DRAFT', 'PUBLISHED', 'ACTIVE')
 * @returns Status traduzido para português brasileiro
 * 
 * @example
 * translateStatus('DRAFT'); // 'Rascunho'
 * translateStatus('PUBLISHED'); // 'Publicado'
 */
export function translateStatus(status: string): string {
  return translateStatusBase(status, 'pt-BR');
}

// Exportação padrão como objeto para facilitar a importação
export default {
  formatDate,
  formatDateTime,
  formatRelativeDate,
  formatCurrency,
  formatNumber,
  formatCompact,
  translateStatus,
};