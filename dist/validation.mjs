// src/types.ts
var DEFAULT_LOCALE = "pt-BR";

// src/validation/index.ts
function validateEmail(email, locale = DEFAULT_LOCALE) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  if (!isValid) {
    const errors = {
      "pt-BR": ["Email inv\xE1lido"],
      "en-US": ["Invalid email"],
      "es-ES": ["Email inv\xE1lido"]
    };
    return {
      isValid: false,
      errors: errors[locale] || errors["pt-BR"]
    };
  }
  return { isValid: true };
}
function validatePassword(password, options = {}, locale = DEFAULT_LOCALE) {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false
  } = options;
  const errors = [];
  const errorMessages = {
    "pt-BR": {
      minLength: `Senha deve ter pelo menos ${minLength} caracteres`,
      uppercase: "Senha deve conter pelo menos uma letra mai\xFAscula",
      lowercase: "Senha deve conter pelo menos uma letra min\xFAscula",
      numbers: "Senha deve conter pelo menos um n\xFAmero",
      specialChars: "Senha deve conter pelo menos um caractere especial"
    },
    "en-US": {
      minLength: `Password must be at least ${minLength} characters`,
      uppercase: "Password must contain at least one uppercase letter",
      lowercase: "Password must contain at least one lowercase letter",
      numbers: "Password must contain at least one number",
      specialChars: "Password must contain at least one special character"
    },
    "es-ES": {
      minLength: `La contrase\xF1a debe tener al menos ${minLength} caracteres`,
      uppercase: "La contrase\xF1a debe contener al menos una letra may\xFAscula",
      lowercase: "La contrase\xF1a debe contener al menos una letra min\xFAscula",
      numbers: "La contrase\xF1a debe contener al menos un n\xFAmero",
      specialChars: "La contrase\xF1a debe contener al menos un car\xE1cter especial"
    }
  };
  const messages = errorMessages[locale] || errorMessages["pt-BR"];
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
function validateUrl(url, locale = DEFAULT_LOCALE) {
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    const errors = {
      "pt-BR": ["URL inv\xE1lida"],
      "en-US": ["Invalid URL"],
      "es-ES": ["URL inv\xE1lida"]
    };
    return {
      isValid: false,
      errors: errors[locale] || errors["pt-BR"]
    };
  }
}
function validatePhone(phone, locale = DEFAULT_LOCALE) {
  const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[-]?\d{4}$/;
  const isValid = phoneRegex.test(phone);
  if (!isValid) {
    const errors = {
      "pt-BR": ["Telefone inv\xE1lido"],
      "en-US": ["Invalid phone number"],
      "es-ES": ["Tel\xE9fono inv\xE1lido"]
    };
    return {
      isValid: false,
      errors: errors[locale] || errors["pt-BR"]
    };
  }
  return { isValid: true };
}
function validateUsername(username, options = {}, locale = DEFAULT_LOCALE) {
  const {
    minLength = 3,
    maxLength = 20,
    allowSpecialChars = false
  } = options;
  const errors = [];
  const errorMessages = {
    "pt-BR": {
      minLength: `Username muito curto (m\xEDnimo ${minLength} caracteres)`,
      maxLength: `Username muito longo (m\xE1ximo ${maxLength} caracteres)`,
      invalidChars: "Username cont\xE9m caracteres inv\xE1lidos"
    },
    "en-US": {
      minLength: `Username too short (minimum ${minLength} characters)`,
      maxLength: `Username too long (maximum ${maxLength} characters)`,
      invalidChars: "Username contains invalid characters"
    },
    "es-ES": {
      minLength: `Username muy corto (m\xEDnimo ${minLength} caracteres)`,
      maxLength: `Username muy largo (m\xE1ximo ${maxLength} caracteres)`,
      invalidChars: "Username contiene caracteres inv\xE1lidos"
    }
  };
  const messages = errorMessages[locale] || errorMessages["pt-BR"];
  if (username.length < minLength) {
    errors.push(messages.minLength);
  }
  if (username.length > maxLength) {
    errors.push(messages.maxLength);
  }
  const usernameRegex = allowSpecialChars ? /^[a-zA-Z0-9_]{3,20}$/ : /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    errors.push(messages.invalidChars);
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}
function validateSlug(slug, options = {}, locale = DEFAULT_LOCALE) {
  const {
    minLength = 3,
    maxLength = 100
  } = options;
  const errors = [];
  const errorMessages = {
    "pt-BR": {
      minLength: `Slug muito curto (m\xEDnimo ${minLength} caracteres)`,
      maxLength: `Slug muito longo (m\xE1ximo ${maxLength} caracteres)`,
      invalidFormat: "Slug inv\xE1lido - use apenas letras min\xFAsculas, n\xFAmeros e h\xEDfens"
    },
    "en-US": {
      minLength: `Slug too short (minimum ${minLength} characters)`,
      maxLength: `Slug too long (maximum ${maxLength} characters)`,
      invalidFormat: "Invalid slug - use only lowercase letters, numbers and hyphens"
    },
    "es-ES": {
      minLength: `Slug muy corto (m\xEDnimo ${minLength} caracteres)`,
      maxLength: `Slug muy largo (m\xE1ximo ${maxLength} caracteres)`,
      invalidFormat: "Slug inv\xE1lido - use solo letras min\xFAsculas, n\xFAmeros y guiones"
    }
  };
  const messages = errorMessages[locale] || errorMessages["pt-BR"];
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
function validateText(text, options = {}, locale = DEFAULT_LOCALE) {
  const {
    minLength = 0,
    maxLength = Infinity,
    fieldName = "Texto"
  } = options;
  const errors = [];
  const errorMessages = {
    "pt-BR": {
      minLength: `${fieldName} muito curto (m\xEDnimo ${minLength} caracteres)`,
      maxLength: `${fieldName} muito longo (m\xE1ximo ${maxLength} caracteres)`
    },
    "en-US": {
      minLength: `${fieldName} too short (minimum ${minLength} characters)`,
      maxLength: `${fieldName} too long (maximum ${maxLength} characters)`
    },
    "es-ES": {
      minLength: `${fieldName} muy corto (m\xEDnimo ${minLength} caracteres)`,
      maxLength: `${fieldName} muy largo (m\xE1ximo ${maxLength} caracteres)`
    }
  };
  const messages = errorMessages[locale] || errorMessages["pt-BR"];
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
function validateMessage(message, options = {}, locale = DEFAULT_LOCALE) {
  const {
    minLength = 10,
    maxLength = 1e3
  } = options;
  return validateText(message, {
    minLength,
    maxLength,
    fieldName: locale === "pt-BR" ? "Mensagem" : locale === "en-US" ? "Message" : "Mensaje"
  }, locale);
}

export { validateEmail, validateMessage, validatePassword, validatePhone, validateSlug, validateText, validateUrl, validateUsername };
//# sourceMappingURL=validation.mjs.map
//# sourceMappingURL=validation.mjs.map