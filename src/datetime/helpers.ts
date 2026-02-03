/**
 * DateTime Helper Utilities
 *
 * Utilitários adicionais para manipulação de datas e horas.
 * Complementa o módulo datetime existente com funções de cálculo e comparação.
 *
 * @module @rainersoft/utils/datetime/helpers
 * @author Rainer Teixeira
 * @version 1.0.0
 */

/**
 * Adiciona dias a uma data
 * @param date - Data base
 * @param days - Número de dias a adicionar (pode ser negativo)
 * @returns Nova data com os dias adicionados
 * 
 * @example
 * ```ts
 * const tomorrow = addDays(new Date(), 1);
 * const yesterday = addDays(new Date(), -1);
 * ```
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Adiciona meses a uma data
 * @param date - Data base
 * @param months - Número de meses a adicionar (pode ser negativo)
 * @returns Nova data com os meses adicionados
 * 
 * @example
 * ```ts
 * const nextMonth = addMonths(new Date(), 1);
 * const lastMonth = addMonths(new Date(), -1);
 * ```
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Adiciona anos a uma data
 * @param date - Data base
 * @param years - Número de anos a adicionar (pode ser negativo)
 * @returns Nova data com os anos adicionados
 * 
 * @example
 * ```ts
 * const nextYear = addYears(new Date(), 1);
 * const lastYear = addYears(new Date(), -1);
 * ```
 */
export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

/**
 * Calcula a diferença em dias entre duas datas
 * @param date1 - Primeira data
 * @param date2 - Segunda data
 * @returns Número de dias entre as datas (positivo se date2 > date1)
 * 
 * @example
 * ```ts
 * const days = diffDays(new Date('2026-01-01'), new Date('2026-01-24')); // 23
 * ```
 */
export const diffDays = (date1: Date, date2: Date): number => {
  const diff = date2.getTime() - date1.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

/**
 * Verifica se uma data é hoje
 * @param date - Data a ser verificada
 * @returns Verdadeiro se a data for hoje
 * 
 * @example
 * ```ts
 * isToday(new Date()); // true
 * isToday(new Date('2026-01-01')); // false
 * ```
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Verifica se duas datas são do mesmo dia
 * @param date1 - Primeira data
 * @param date2 - Segunda data
 * @returns Verdadeiro se as datas forem do mesmo dia
 * 
 * @example
 * ```ts
 * const d1 = new Date('2026-01-24T10:00:00');
 * const d2 = new Date('2026-01-24T15:00:00');
 * isSameDay(d1, d2); // true
 * ```
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

/**
 * Obtém o início do dia (00:00:00.000) de uma data
 * @param date - Data base
 * @returns Nova data representando o início do dia
 * 
 * @example
 * ```ts
 * const start = startOfDay(new Date('2026-01-24T15:30:00'));
 * // 2026-01-24T00:00:00.000
 * ```
 */
export const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Obtém o final do dia (23:59:59.999) de uma data
 * @param date - Data base
 * @returns Nova data representando o final do dia
 * 
 * @example
 * ```ts
 * const end = endOfDay(new Date('2026-01-24T10:00:00'));
 * // 2026-01-24T23:59:59.999
 * ```
 */
export const endOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * Obtém o início do mês (1º dia, 00:00:00.000) de uma data
 * @param date - Data base
 * @returns Nova data representando o início do mês
 * 
 * @example
 * ```ts
 * const start = startOfMonth(new Date('2026-01-24'));
 * // 2026-01-01T00:00:00.000
 * ```
 */
export const startOfMonth = (date: Date): Date => {
  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Obtém o final do mês (último dia, 23:59:59.999) de uma data
 * @param date - Data base
 * @returns Nova data representando o final do mês
 * 
 * @example
 * ```ts
 * const end = endOfMonth(new Date('2026-01-24'));
 * // 2026-01-31T23:59:59.999
 * ```
 */
export const endOfMonth = (date: Date): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  result.setHours(23, 59, 59, 999);
  return result;
};
