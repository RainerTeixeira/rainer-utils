/**
 * String Utilities
 *
 * Utilitários para manipulação e formatação de strings.
 * Funções puras, sem dependências externas, prontas para qualquer plataforma.
 *
 * @module @rainersoft/utils/string
 * @author Rainer Teixeira
 */

/**
 * Converte texto para slug URL-friendly
 *
 * @param text - Texto para converter
 * @returns Slug normalizado
 *
 * @example
 * textToSlug('Meu Post Incrível!') // 'meu-post-incrivel'
 * textToSlug('São Paulo - SP') // 'sao-paulo-sp'
 */
export function textToSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/^-+|-+$/g, '') // Remove hífens do início e fim
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Capitaliza primeira letra de cada palavra
 *
 * @param text - Texto para capitalizar
 * @returns Texto capitalizado
 *
 * @example
 * capitalize('rainer teixeira') // 'Rainer Teixeira'
 */
export function capitalize(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Trunca texto com ellipsis
 *
 * @param text - Texto para truncar
 * @param maxLength - Comprimento máximo
 * @param suffix - Sufixo (padrão: '...')
 * @returns Texto truncado
 *
 * @example
 * truncate('Texto muito longo', 10) // 'Texto muit...'
 */
export function truncate(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Remove acentos de texto
 *
 * @param text - Texto com acentos
 * @returns Texto sem acentos
 *
 * @example
 * removeAccents('São Paulo') // 'Sao Paulo'
 */
export function removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Extrai iniciais de um nome
 *
 * @param name - Nome completo
 * @param maxInitials - Máximo de iniciais (padrão: 2)
 * @returns Iniciais em maiúsculas
 *
 * @example
 * getInitials('Rainer Teixeira') // 'RT'
 * getInitials('João da Silva Santos', 3) // 'JSS'
 */
export function getInitials(name: string, maxInitials = 2): string {
  return name
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, maxInitials);
}

/**
 * Valida se string é vazia ou apenas espaços
 *
 * @param text - Texto para validar
 * @returns true se vazio, false caso contrário
 */
export function isEmpty(text: string | null | undefined): boolean {
  return !text || text.trim().length === 0;
}

/**
 * Conta palavras em um texto
 *
 * @param text - Texto para contar
 * @returns Número de palavras
 */
export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Formata um número de telefone brasileiro
 * 
 * @param phone - Número de telefone (com ou sem formatação)
 * @returns Telefone formatado
 * 
 * @example
 * formatPhone('11999998888') // '(11) 99999-8888'
 * formatPhone('1133334444') // '(11) 3333-4444'
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length === 11) {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
}

/**
 * Formata um CPF
 * 
 * @param cpf - Número do CPF (com ou sem formatação)
 * @returns CPF formatado
 * 
 * @example
 * formatCPF('12345678901') // '123.456.789-01'
 */
export function formatCPF(cpf: string): string {
  const digits = cpf.replace(/\D/g, '');
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Formata um CNPJ
 * 
 * @param cnpj - Número do CNPJ (com ou sem formatação)
 * @returns CNPJ formatado
 * 
 * @example
 * formatCNPJ('12345678000199') // '12.345.678/0001-99'
 */
export function formatCNPJ(cnpj: string): string {
  const digits = cnpj.replace(/\D/g, '');
  return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

/**
 * Valida um CPF
 * 
 * @param cpf - Número do CPF (com ou sem formatação)
 * @returns true se válido, false caso contrário
 * 
 * @example
 * isCPF('123.456.789-09') // false (CPF inválido)
 */
export function isCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');
  
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) {
    return false;
  }
  
  // Cálculo do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits.charAt(9))) {
    return false;
  }
  
  // Cálculo do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits.charAt(10))) {
    return false;
  }
  
  return true;
}

/**
 * Valida um CNPJ
 * 
 * @param cnpj - Número do CNPJ (com ou sem formatação)
 * @returns true se válido, false caso contrário
 * 
 * @example
 * isCNPJ('12.345.678/0001-99') // false (CNPJ inválido)
 */
export function isCNPJ(cnpj: string): boolean {
  const digits = cnpj.replace(/\D/g, '');
  
  if (digits.length !== 14 || /^(\d)\1{13}$/.test(digits)) {
    return false;
  }
  
  // Cálculo do primeiro dígito verificador
  const weights1 = [5,4,3,2,9,8,7,6,5,4,3,2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits.charAt(i)) * weights1[i];
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (digit1 !== parseInt(digits.charAt(12))) {
    return false;
  }
  
  // Cálculo do segundo dígito verificador
  const weights2 = [6,5,4,3,2,9,8,7,6,5,4,3,2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(digits.charAt(i)) * weights2[i];
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  if (digit2 !== parseInt(digits.charAt(13))) {
    return false;
  }
  
  return true;
}
