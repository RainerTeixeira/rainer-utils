/**
 * Stats Formatting Utilities
 *
 * Utilitários universais para formatação de estatísticas e números.
 *
 * @module @rainersoft/utils/stats
 * @author Rainer Teixeira
 * @version 1.0.0
 */

/**
 * Formata número grande com abreviação (1.5k, 2.3M, etc)
 *
 * @param num - Número para formatar
 * @returns String formatada com abreviação
 *
 * @example
 * ```ts
 * formatNumber(1500) // '1.5k'
 * formatNumber(2500000) // '2.5M'
 * formatNumber(999) // '999'
 * ```
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

/**
 * Calcula percentual de mudança entre dois valores
 *
 * @param current - Valor atual
 * @param previous - Valor anterior
 * @returns Percentual de mudança (arredondado)
 *
 * @example
 * ```ts
 * calculateChange(150, 100) // 50
 * calculateChange(80, 100) // -20
 * calculateChange(100, 0) // 100
 * ```
 */
export function calculateChange(current: number, previous: number): number {
  if (previous === 0) return 100;
  return Math.round(((current - previous) / previous) * 100);
}

/**
 * Formata percentual com sinal
 *
 * @param value - Valor do percentual
 * @param options - Opções de formatação
 * @returns String formatada com sinal e símbolo
 *
 * @example
 * ```ts
 * formatPercentage(25) // '+25%'
 * formatPercentage(-10) // '-10%'
 * formatPercentage(0) // '0%'
 * ```
 */
export function formatPercentage(
  value: number,
  options: { showSign?: boolean; decimals?: number } = {}
): string {
  const { showSign = true, decimals = 0 } = options;
  
  const sign = showSign && value > 0 ? '+' : '';
  const formattedValue = value.toFixed(decimals);
  
  return `${sign}${formattedValue}%`;
}

/**
 * Gera dados de exemplo para gráficos
 *
 * @param days - Número de dias para gerar dados
 * @param locale - Idioma para formatação de datas
 * @returns Array de dados mock
 *
 * @example
 * ```ts
 * const data = generateMockChartData(7);
 * // [
 * //   { date: '01/12', views: 1234, uniqueViews: 890, likes: 67, comments: 23 },
 * //   ...
 * // ]
 * ```
 */
export function generateMockChartData(
  days: number,
  locale: string = 'pt-BR'
): Array<Record<string, any>> {
  const data = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
      }),
      views: Math.floor(Math.random() * 1000) + 500,
      uniqueViews: Math.floor(Math.random() * 700) + 300,
      likes: Math.floor(Math.random() * 100) + 50,
      comments: Math.floor(Math.random() * 50) + 10,
      shares: Math.floor(Math.random() * 30) + 5,
    });
  }

  return data;
}

/**
 * Agrupa dados por período (dia, semana, mês)
 *
 * @param data - Array de dados para agrupar
 * @param period - Período de agrupamento
 * @param dateField - Campo de data nos objetos
 * @returns Array de dados agrupados
 *
 * @example
 * ```ts
 * const grouped = groupDataByPeriod(data, 'week', 'date');
 * ```
 */
export function groupDataByPeriod<T extends Record<string, any>>(
  data: T[],
  // period: 'day' | 'week' | 'month' = 'day', // Pode ser usado futuramente para agrupamento
  // dateField: keyof T = 'date' as keyof T
): T[] {
  // Implementação simplificada - pode ser expandida
  // Por enquanto, retorna os dados originais
  return data;
}

/**
 * Calcula médias móveis para suavizar dados
 *
 * @param data - Array de valores numéricos
 * @param window - Tamanho da janela de média móvel
 * @returns Array com médias móveis
 *
 * @example
 * ```ts
 * const smoothed = calculateMovingAverage([1, 2, 3, 4, 5], 3);
 * // [2, 3, 4] (médias de [1,2,3], [2,3,4], [3,4,5])
 * ```
 */
export function calculateMovingAverage(data: number[], window: number): number[] {
  const result: number[] = [];
  
  for (let i = window - 1; i < data.length; i++) {
    const sum = data.slice(i - window + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push(sum / window);
  }
  
  return result;
}

/**
 * Encontra valor máximo e mínimo em array de objetos
 *
 * @param data - Array de objetos
 * @param field - Campo para analisar
 * @returns Objeto com min e max
 *
 * @example
 * ```ts
 * const { min, max } = findMinMax(data, 'views');
 * ```
 */
export function findMinMax<T extends Record<string, any>>(
  data: T[],
  field: keyof T
): { min: number; max: number } {
  const values = data.map(item => Number(item[field]) || 0);
  
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
}
