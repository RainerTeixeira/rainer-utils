/**
 * Password Strength Hook
 *
 * Hook universal que analisa a força de uma senha em tempo real.
 * Avalia múltiplos critérios de segurança com suporte a i18n.
 *
 * @module @rainersoft/utils/hooks
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { Locale } from '../types';
import { DEFAULT_LOCALE } from '../types';

/**
 * Interface do resultado da análise de força da senha
 */
export interface PasswordStrength {
  strength: number;
  label: string;
  color: string;
}

/**
 * Labels de força de senha por idioma
 */
const STRENGTH_LABELS = {
  'pt-BR': ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'],
  'en-US': ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'],
  'es-ES': ['Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte']
} as const;

/**
 * Cores para indicadores visuais (Tailwind CSS)
 */
const STRENGTH_COLORS = [
  'bg-red-500',
  'bg-orange-500', 
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500'
] as const;

/**
 * Hook usePasswordStrength
 *
 * Analisa a força de uma senha em tempo real e retorna informações
 * sobre seu nível de segurança com suporte a múltiplos idiomas.
 *
 * Cada critério atendido adiciona 1 ponto à força:
 * - Mínimo 8 caracteres: +1
 * - Letras maiúsculas: +1
 * - Letras minúsculas: +1
 * - Números: +1
 * - Caracteres especiais: +1
 *
 * @param password - Senha a ser analisada
 * @param locale - Idioma das labels (padrão: 'pt-BR')
 * @returns Objeto com informações sobre a força da senha
 *
 * @example
 * ```ts
 * const { strength, label, color } = usePasswordStrength('MyPassword123!');
 * // Result: { strength: 5, label: 'Muito forte', color: 'bg-green-500' }
 * ```
 */
export function usePasswordStrength(
  password: string,
  locale: Locale = DEFAULT_LOCALE
): PasswordStrength {
  if (!password) {
    return { strength: 0, label: '', color: '' };
  }

  let strength = 0;

  // Critérios de validação
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const labels = STRENGTH_LABELS[locale] || STRENGTH_LABELS['pt-BR'];

  return {
    strength,
    label: labels[strength - 1] || '',
    color: STRENGTH_COLORS[strength - 1] || '',
  };
}
