/**
 * Formatting Utilities (Brazilian Masks)
 *
 * Utilitários para formatação de documentos e dados brasileiros.
 * Máscaras específicas para CEP.
 *
 * @module @rainersoft/utils/formatting
 * @author Rainer Teixeira
 * @version 1.0.0
 * 
 * @deprecated Este módulo será removido. Use as funções de string/index.ts:
 * - formatCPF, formatCNPJ, formatPhone, textToSlug já existem em string/
 */

/**
 * Formata um CEP
 * @param cep - String com CEP (com ou sem formatação)
 * @returns CEP formatado (00000-000)
 * 
 * @example
 * ```ts
 * formatCEP('01310100'); // "01310-100"
 * formatCEP('01310-100'); // "01310-100"
 * ```
 */
export const formatCEP = (cep: string): string => {
  cep = cep.replace(/\D/g, '');
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
};

