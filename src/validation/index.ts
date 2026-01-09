/**
 * Validation Utilities
 *
 * Utilitários para validação de dados com suporte a múltiplos idiomas.
 * Funções puras, sem dependências externas, prontas para qualquer plataforma.
 *
 * @module @rainersoft/utils/validation
 * @author Rainer Teixeira
 */

import type { Locale } from '../types';
import { DEFAULT_LOCALE } from '../types';

/**
 * Interface para resultado de validação
 */
export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

/**
 * Valida email usando regex RFC 5322
 *
 * @param email - Email para validar
 * @param locale - Idioma das mensagens de erro (padrão: 'pt-BR')
 * @returns Resultado da validação
 *
 * @example
 * validateEmail('user@example.com') // { isValid: true }
 * validateEmail('invalid-email') // { isValid: false, errors: ['Email inválido'] }
 */
export function validateEmail(email: string, locale: Locale = DEFAULT_LOCALE): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  if (!isValid) {
    const errors = {
      'pt-BR': ['Email inválido'],
      'en-US': ['Invalid email'],
      'es-ES': ['Email inválido']
    };
    
    return {
      isValid: false,
      errors: errors[locale] || errors['pt-BR']
    };
  }
  
  return { isValid: true };
}

/**
 * Valida senha com critérios de segurança
 *
 * @param password - Senha para validar
 * @param options - Opções de validação
 * @param locale - Idioma das mensagens de erro
 * @returns Resultado da validação
 *
 * @example
 * validatePassword('MySecure123!') // { isValid: true }
 * validatePassword('123') // { isValid: false, errors: ['Senha deve ter pelo menos 8 caracteres'] }
 */
export function validatePassword(
  password: string, 
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {},
  locale: Locale = DEFAULT_LOCALE
): ValidationResult {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false
  } = options;
  
  const errors: string[] = [];
  
  const errorMessages = {
    'pt-BR': {
      minLength: `Senha deve ter pelo menos ${minLength} caracteres`,
      uppercase: 'Senha deve conter pelo menos uma letra maiúscula',
      lowercase: 'Senha deve conter pelo menos uma letra minúscula',
      numbers: 'Senha deve conter pelo menos um número',
      specialChars: 'Senha deve conter pelo menos um caractere especial'
    },
    'en-US': {
      minLength: `Password must be at least ${minLength} characters`,
      uppercase: 'Password must contain at least one uppercase letter',
      lowercase: 'Password must contain at least one lowercase letter',
      numbers: 'Password must contain at least one number',
      specialChars: 'Password must contain at least one special character'
    },
    'es-ES': {
      minLength: `La contraseña debe tener al menos ${minLength} caracteres`,
      uppercase: 'La contraseña debe contener al menos una letra mayúscula',
      lowercase: 'La contraseña debe contener al menos una letra minúscula',
      numbers: 'La contraseña debe contener al menos un número',
      specialChars: 'La contraseña debe contener al menos un carácter especial'
    }
  };
  
  const messages = errorMessages[locale] || errorMessages['pt-BR'];
  
  if (password.length < minLength) {
    errors.push(messages.minLength);
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push(messages.uppercase);
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push(messages.lowercase);
  }
  
  if (requireNumbers && !/\d/.test(password)) {
    errors.push(messages.numbers);
  }
  
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push(messages.specialChars);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valida URL
 *
 * @param url - URL para validar
 * @param locale - Idioma das mensagens de erro
 * @returns Resultado da validação
 *
 * @example
 * validateUrl('https://example.com') // { isValid: true }
 * validateUrl('not-a-url') // { isValid: false, errors: ['URL inválida'] }
 */
export function validateUrl(url: string, locale: Locale = DEFAULT_LOCALE): ValidationResult {
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    const errors = {
      'pt-BR': ['URL inválida'],
      'en-US': ['Invalid URL'],
      'es-ES': ['URL inválida']
    };
    
    return {
      isValid: false,
      errors: errors[locale] || errors['pt-BR']
    };
  }
}

/**
 * Valida telefone (formato brasileiro por padrão)
 *
 * @param phone - Telefone para validar
 * @param locale - Idioma das mensagens de erro
 * @returns Resultado da validação
 *
 * @example
 * validatePhone('(11) 98765-4321') // { isValid: true }
 * validatePhone('123') // { isValid: false, errors: ['Telefone inválido'] }
 */
export function validatePhone(phone: string, locale: Locale = DEFAULT_LOCALE): ValidationResult {
  // Regex para telefone brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[-]?\d{4}$/;
  const isValid = phoneRegex.test(phone);
  
  if (!isValid) {
    const errors = {
      'pt-BR': ['Telefone inválido'],
      'en-US': ['Invalid phone number'],
      'es-ES': ['Teléfono inválido']
    };
    
    return {
      isValid: false,
      errors: errors[locale] || errors['pt-BR']
    };
  }
  
  return { isValid: true };
}

/**
 * Valida username para registro
 *
 * @param username - Username para validar
 * @param options - Opções de validação
 * @param locale - Idioma das mensagens de erro
 * @returns Resultado da validação
 *
 * @example
 * validateUsername('user123') // { isValid: true }
 * validateUsername('us') // { isValid: false, errors: ['Username muito curto'] }
 */
export function validateUsername(
  username: string,
  options: {
    minLength?: number;
    maxLength?: number;
    allowSpecialChars?: boolean;
  } = {},
  locale: Locale = DEFAULT_LOCALE
): ValidationResult {
  const {
    minLength = 3,
    maxLength = 20,
    allowSpecialChars = false
  } = options;
  
  const errors: string[] = [];
  
  const errorMessages = {
    'pt-BR': {
      minLength: `Username muito curto (mínimo ${minLength} caracteres)`,
      maxLength: `Username muito longo (máximo ${maxLength} caracteres)`,
      invalidChars: 'Username contém caracteres inválidos'
    },
    'en-US': {
      minLength: `Username too short (minimum ${minLength} characters)`,
      maxLength: `Username too long (maximum ${maxLength} characters)`,
      invalidChars: 'Username contains invalid characters'
    },
    'es-ES': {
      minLength: `Username muy corto (mínimo ${minLength} caracteres)`,
      maxLength: `Username muy largo (máximo ${maxLength} caracteres)`,
      invalidChars: 'Username contiene caracteres inválidos'
    }
  };
  
  const messages = errorMessages[locale] || errorMessages['pt-BR'];
  
  if (username.length < minLength) {
    errors.push(messages.minLength);
  }
  
  if (username.length > maxLength) {
    errors.push(messages.maxLength);
  }
  
  const usernameRegex = allowSpecialChars 
    ? /^[a-zA-Z0-9_]{3,20}$/
    : /^[a-zA-Z0-9_]{3,20}$/;
  
  if (!usernameRegex.test(username)) {
    errors.push(messages.invalidChars);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valida slug para URLs amigáveis
 *
 * @param slug - Slug para validar
 * @param options - Opções de validação
 * @param locale - Idioma das mensagens de erro
 * @returns Resultado da validação
 *
 * @example
 * validateSlug('my-post-title') // { isValid: true }
 * validateSlug('My Post Title') // { isValid: false, errors: ['Slug inválido'] }
 */
export function validateSlug(
  slug: string,
  options: {
    minLength?: number;
    maxLength?: number;
  } = {},
  locale: Locale = DEFAULT_LOCALE
): ValidationResult {
  const {
    minLength = 3,
    maxLength = 100
  } = options;
  
  const errors: string[] = [];
  
  const errorMessages = {
    'pt-BR': {
      minLength: `Slug muito curto (mínimo ${minLength} caracteres)`,
      maxLength: `Slug muito longo (máximo ${maxLength} caracteres)`,
      invalidFormat: 'Slug inválido - use apenas letras minúsculas, números e hífens'
    },
    'en-US': {
      minLength: `Slug too short (minimum ${minLength} characters)`,
      maxLength: `Slug too long (maximum ${maxLength} characters)`,
      invalidFormat: 'Invalid slug - use only lowercase letters, numbers and hyphens'
    },
    'es-ES': {
      minLength: `Slug muy corto (mínimo ${minLength} caracteres)`,
      maxLength: `Slug muy largo (máximo ${maxLength} caracteres)`,
      invalidFormat: 'Slug inválido - use solo letras minúsculas, números y guiones'
    }
  };
  
  const messages = errorMessages[locale] || errorMessages['pt-BR'];
  
  if (slug.length < minLength) {
    errors.push(messages.minLength);
  }
  
  if (slug.length > maxLength) {
    errors.push(messages.maxLength);
  }
  
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug)) {
    errors.push(messages.invalidFormat);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valida texto com comprimento mínimo e máximo
 *
 * @param text - Texto para validar
 * @param options - Opções de validação
 * @param locale - Idioma das mensagens de erro
 * @returns Resultado da validação
 *
 * @example
 * validateText('Hello', { minLength: 3 }) // { isValid: true }
 * validateText('Hi', { minLength: 3 }) // { isValid: false, errors: ['Texto muito curto'] }
 */
export function validateText(
  text: string,
  options: {
    minLength?: number;
    maxLength?: number;
    fieldName?: string;
  } = {},
  locale: Locale = DEFAULT_LOCALE
): ValidationResult {
  const {
    minLength = 0,
    maxLength = Infinity,
    fieldName = 'Texto'
  } = options;
  
  const errors: string[] = [];
  
  const errorMessages = {
    'pt-BR': {
      minLength: `${fieldName} muito curto (mínimo ${minLength} caracteres)`,
      maxLength: `${fieldName} muito longo (máximo ${maxLength} caracteres)`
    },
    'en-US': {
      minLength: `${fieldName} too short (minimum ${minLength} characters)`,
      maxLength: `${fieldName} too long (maximum ${maxLength} characters)`
    },
    'es-ES': {
      minLength: `${fieldName} muy corto (mínimo ${minLength} caracteres)`,
      maxLength: `${fieldName} muy largo (máximo ${maxLength} caracteres)`
    }
  };
  
  const messages = errorMessages[locale] || errorMessages['pt-BR'];
  
  if (text.length < minLength) {
    errors.push(messages.minLength);
  }
  
  if (text.length > maxLength) {
    errors.push(messages.maxLength);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valida mensagem de contato
 *
 * @param message - Mensagem para validar
 * @param options - Opções de validação
 * @param locale - Idioma das mensagens de erro
 * @returns Resultado da validação
 *
 * @example
 * validateMessage('Olá, gostaria de mais informações') // { isValid: true }
 * validateMessage('Oi') // { isValid: false, errors: ['Mensagem muito curta'] }
 */
export function validateMessage(
  message: string,
  options: {
    minLength?: number;
    maxLength?: number;
  } = {},
  locale: Locale = DEFAULT_LOCALE
): ValidationResult {
  const {
    minLength = 10,
    maxLength = 1000
  } = options;
  
  return validateText(message, {
    minLength,
    maxLength,
    fieldName: locale === 'pt-BR' ? 'Mensagem' : locale === 'en-US' ? 'Message' : 'Mensaje'
  }, locale);
}
