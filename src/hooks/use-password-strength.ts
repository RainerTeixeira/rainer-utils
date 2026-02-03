import React from 'react';

/**
 * Rótulos customizados para internacionalização do feedback de senha.
 */
interface StrengthLabels {
  veryWeak?: string;
  weak?: string;
  fair?: string;
  good?: string;
  strong?: string;
  enterPassword?: string;
  useMinLength?: string;
  addUppercase?: string;
  addLowercase?: string;
  addNumbers?: string;
  addSpecialChars?: string;
  avoidRepeating?: string;
  avoidCommon?: string;
}

/**
 * Opções de configuração para o hook {@link usePasswordStrength}.
 */
interface PasswordStrengthOptions {
  /** Comprimento mínimo exigido (padrão: 8). */
  minLength?: number;
  /** Se deve exigir letra maiúscula. */
  requireUppercase?: boolean;
  /** Se deve exigir letra minúscula. */
  requireLowercase?: boolean;
  /** Se deve exigir números. */
  requireNumbers?: boolean;
  /** Se deve exigir caracteres especiais. */
  requireSpecialChars?: boolean;
  /** Padrões regex adicionais para pontuação. */
  customPatterns?: string[];
  /** Rótulos customizados para mensagens e dicas. */
  labels?: StrengthLabels;
}

/**
 * Hook para avaliar e monitorar a força de uma senha com feedback detalhado.
 * Retorna pontuação, nível, validações, sugestões e utilitário para gerar senha forte.
 *
 * @param password Senha a ser avaliada.
 * @param options Opções de validação e rótulos.
 * @returns Objeto com métricas, validações, sugestões e helper para gerar senhas.
 */
export function usePasswordStrength(
  password: string, 
  options: PasswordStrengthOptions = {}
) {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
    customPatterns = [],
    labels = {}
  } = options;

  // Rótulos padrão em inglês
  const defaultLabels = {
    veryWeak: 'Very Weak',
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
    enterPassword: 'Enter a password',
    useMinLength: `Use at least ${minLength} characters`,
    addUppercase: 'Add uppercase letters',
    addLowercase: 'Add lowercase letters',
    addNumbers: 'Add numbers',
    addSpecialChars: 'Add special characters (!@#$%)',
    avoidRepeating: 'Avoid repeating characters',
    avoidCommon: 'Avoid common passwords or obvious patterns'
  };

  // Mesclar rótulos padrão com customizados
  const finalLabels = { ...defaultLabels, ...labels };

  // Calcular força da senha
  const strength = React.useMemo(() => {
    if (!password) return 0;

    let score = 0;
    const length = password.length;

    // Pontuação por comprimento
    if (length >= minLength) score += 25;
    if (length >= 12) score += 15;
    if (length >= 16) score += 10;

    // Pontuação por variedade de caracteres
    if (/[a-z]/.test(password) && requireLowercase) score += 15;
    if (/[A-Z]/.test(password) && requireUppercase) score += 15;
    if (/[0-9]/.test(password) && requireNumbers) score += 15;
    if (/[^a-zA-Z0-9]/.test(password) && requireSpecialChars) score += 20;

    // Verificar padrões personalizados
    customPatterns.forEach(pattern => {
      if (new RegExp(pattern).test(password)) {
        score += 5;
      }
    });

    // Bônus por complexidade adicional
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(password)) {
      score += 10;
    }

    // Penalizar senhas comuns ou padrões fracos
    const commonPatterns = [
      /^123456/,
      /password/i,
      /qwerty/i,
      /admin/i,
      /abc123/i,
      /^(.)\1+$/, // Caracteres repetidos
      /^(?:[a-z]+|[A-Z]+|[0-9]+)$/ // Apenas um tipo de caractere
    ];

    commonPatterns.forEach(pattern => {
      if (pattern.test(password)) {
        score = Math.max(0, score - 20);
      }
    });

    return Math.min(100, Math.max(0, score));
  }, [password, minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars, customPatterns]);

  // Obter nível da senha
  const level = React.useMemo(() => {
    if (strength < 20) return 'very-weak';
    if (strength < 40) return 'weak';
    if (strength < 60) return 'fair';
    if (strength < 80) return 'good';
    return 'strong';
  }, [strength]);

  // Obter cor para indicador visual
  const color = React.useMemo(() => {
    switch (level) {
      case 'very-weak': return 'var(--color-red-500)'; // red-500
      case 'weak': return '#f97316'; // orange-500
      case 'fair': return '#eab308'; // yellow-500
      case 'good': return 'var(--color-green-500)'; // green-500
      case 'strong': return '#059669'; // emerald-600
      default: return 'var(--color-gray-500)'; // gray-500
    }
  }, [level]);

  // Obter texto descritivo
  const label = React.useMemo(() => {
    switch (level) {
      case 'very-weak': return finalLabels.veryWeak;
      case 'weak': return finalLabels.weak;
      case 'fair': return finalLabels.fair;
      case 'good': return finalLabels.good;
      case 'strong': return finalLabels.strong;
      default: return finalLabels.enterPassword;
    }
  }, [level, finalLabels]);

  // Validações específicas
  const validations = React.useMemo(() => {
    return {
      hasMinLength: password.length >= minLength,
      hasUppercase: !requireUppercase || /[A-Z]/.test(password),
      hasLowercase: !requireLowercase || /[a-z]/.test(password),
      hasNumbers: !requireNumbers || /[0-9]/.test(password),
      hasSpecialChars: !requireSpecialChars || /[^a-zA-Z0-9]/.test(password),
      noRepeatingChars: !/^(.)\1+$/.test(password),
      noCommonPatterns: !(/123456|password|qwerty|admin|abc123/i).test(password)
    };
  }, [password, minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars]);

  // Verificar se senha atende todos os requisitos
  const isValid = React.useMemo(() => {
    return Object.values(validations).every(Boolean);
  }, [validations]);

  // Obter sugestões de melhoria
  const suggestions = React.useMemo(() => {
    const suggestions: string[] = [];

    if (!validations.hasMinLength) {
      suggestions.push(finalLabels.useMinLength);
    }
    if (!validations.hasUppercase && requireUppercase) {
      suggestions.push(finalLabels.addUppercase);
    }
    if (!validations.hasLowercase && requireLowercase) {
      suggestions.push(finalLabels.addLowercase);
    }
    if (!validations.hasNumbers && requireNumbers) {
      suggestions.push(finalLabels.addNumbers);
    }
    if (!validations.hasSpecialChars && requireSpecialChars) {
      suggestions.push(finalLabels.addSpecialChars);
    }
    if (!validations.noRepeatingChars) {
      suggestions.push(finalLabels.avoidRepeating);
    }
    if (!validations.noCommonPatterns) {
      suggestions.push(finalLabels.avoidCommon);
    }

    return suggestions;
  }, [validations, finalLabels, minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars]);

  // Gerar senha forte aleatória (opcional)
  const generateStrongPassword = React.useCallback((length = 16) => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = lowercase;
    if (requireUppercase) chars += uppercase;
    if (requireNumbers) chars += numbers;
    if (requireSpecialChars) chars += special;
    
    let password = '';
    
    // Garantir pelo menos um de cada tipo requerido
    if (requireLowercase) password += lowercase[Math.floor(Math.random() * lowercase.length)];
    if (requireUppercase) password += uppercase[Math.floor(Math.random() * uppercase.length)];
    if (requireNumbers) password += numbers[Math.floor(Math.random() * numbers.length)];
    if (requireSpecialChars) password += special[Math.floor(Math.random() * special.length)];
    
    // Preencher o resto
    for (let i = password.length; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Embaralhar
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }, [requireUppercase, requireLowercase, requireNumbers, requireSpecialChars]);

  return {
    // Métricas principais
    strength,
    level,
    color,
    label,
    isValid,
    
    // Validações detalhadas
    validations,
    
    // Feedback ao usuário
    suggestions,
    
    // Utilitários
    generateStrongPassword,
    
    // Estados convenientes
    isVeryWeak: level === 'very-weak',
    isWeak: level === 'weak',
    isFair: level === 'fair',
    isGood: level === 'good',
    isStrong: level === 'strong'
  };
}
