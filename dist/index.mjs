import React, { useRef, useState, useCallback, useEffect } from 'react';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);

// src/types.ts
var DEFAULT_LOCALE = "pt-BR";
var CURRENCY_MAP = {
  "pt-BR": "BRL",
  "en-US": "USD",
  "es-ES": "EUR"
};

// src/accessibility/index.ts
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
function getContrast(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}
function getContrastInfo(foreground, background) {
  const contrast = getContrast(foreground, background);
  const meetsAA = contrast >= 4.5;
  const meetsAALarge = contrast >= 3;
  const meetsAAA = contrast >= 7;
  const meetsAAALarge = contrast >= 4.5;
  let level = "Fail";
  if (meetsAAA) {
    level = "AAA";
  } else if (meetsAAALarge) {
    level = "AAA Large";
  } else if (meetsAA) {
    level = "AA";
  } else if (meetsAALarge) {
    level = "AA Large";
  }
  return {
    contrast,
    meetsAA,
    meetsAALarge,
    meetsAAA,
    meetsAAALarge,
    level
  };
}
function validateContrast(foreground, background, options = {}) {
  const { requireAAA = false, largeText = false } = options;
  const info = getContrastInfo(foreground, background);
  let valid = false;
  let message = "";
  if (requireAAA) {
    valid = largeText ? info.meetsAAALarge : info.meetsAAA;
    message = valid ? `Contraste v\xE1lido (WCAG AAA${largeText ? " - Texto Grande" : ""})` : `Contraste insuficiente para WCAG AAA${largeText ? " - Texto Grande" : ""}. Requerido: ${largeText ? "4.5:1" : "7:1"}, atual: ${info.contrast.toFixed(2)}:1`;
  } else {
    valid = largeText ? info.meetsAALarge : info.meetsAA;
    message = valid ? `Contraste v\xE1lido (WCAG AA${largeText ? " - Texto Grande" : ""})` : `Contraste insuficiente para WCAG AA${largeText ? " - Texto Grande" : ""}. Requerido: ${largeText ? "3:1" : "4.5:1"}, atual: ${info.contrast.toFixed(2)}:1`;
  }
  return {
    valid,
    level: info.level,
    contrast: info.contrast,
    message
  };
}

// src/date/index.ts
var date_exports = {};
__export(date_exports, {
  formatDate: () => formatDate,
  formatDateTime: () => formatDateTime,
  formatRelativeDate: () => formatRelativeDate,
  isValidDate: () => isValidDate,
  toISOString: () => toISOString
});
var RELATIVE_TEXTS = {
  "pt-BR": {
    now: "agora",
    minute: (n) => `h\xE1 ${n} ${n === 1 ? "minuto" : "minutos"}`,
    hour: (n) => `h\xE1 ${n} ${n === 1 ? "hora" : "horas"}`,
    day: (n) => `h\xE1 ${n} ${n === 1 ? "dia" : "dias"}`,
    month: (n) => `h\xE1 ${n} ${n === 1 ? "m\xEAs" : "meses"}`,
    year: (n) => `h\xE1 ${n} ${n === 1 ? "ano" : "anos"}`
  },
  "en-US": {
    now: "now",
    minute: (n) => `${n} ${n === 1 ? "minute" : "minutes"} ago`,
    hour: (n) => `${n} ${n === 1 ? "hour" : "hours"} ago`,
    day: (n) => `${n} ${n === 1 ? "day" : "days"} ago`,
    month: (n) => `${n} ${n === 1 ? "month" : "months"} ago`,
    year: (n) => `${n} ${n === 1 ? "year" : "years"} ago`
  },
  "es-ES": {
    now: "ahora",
    minute: (n) => `hace ${n} ${n === 1 ? "minuto" : "minutos"}`,
    hour: (n) => `hace ${n} ${n === 1 ? "hora" : "horas"}`,
    day: (n) => `hace ${n} ${n === 1 ? "d\xEDa" : "d\xEDas"}`,
    month: (n) => `hace ${n} ${n === 1 ? "mes" : "meses"}`,
    year: (n) => `hace ${n} ${n === 1 ? "a\xF1o" : "a\xF1os"}`
  }
};
function formatDate(date, format = "long", locale = DEFAULT_LOCALE) {
  const d = typeof date === "string" ? new Date(date) : date;
  const options = {
    day: "numeric",
    month: format === "short" ? "2-digit" : "long",
    year: "numeric",
    ...format === "full" && { weekday: "long" }
  };
  if (format === "short") {
    return d.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
  }
  return d.toLocaleDateString(locale, options);
}
function formatDateTime(date, locale = DEFAULT_LOCALE) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatRelativeDate(date, locale = DEFAULT_LOCALE) {
  const d = typeof date === "string" ? new Date(date) : date;
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) {
    return "";
  }
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1e3);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30.4375);
  const diffYear = Math.floor(diffDay / 365);
  const texts = RELATIVE_TEXTS[locale];
  if (diffSec < 10) {
    if (locale === "pt-BR") return "agora mesmo";
    if (locale === "en-US") return "just now";
    if (locale === "es-ES") return "ahora mismo";
  }
  if (diffSec < 60) return texts.now;
  if (diffMin < 60) return texts.minute(diffMin);
  if (diffHour < 24) return texts.hour(diffHour);
  if (diffDay === 1) {
    if (locale === "pt-BR") return "ontem";
    if (locale === "en-US") return "yesterday";
    if (locale === "es-ES") return "ayer";
  }
  if (diffDay === 2) {
    if (locale === "pt-BR") return "anteontem";
    if (locale === "en-US") return "the day before yesterday";
    if (locale === "es-ES") return "anteayer";
  }
  if (diffDay < 30) return texts.day(diffDay);
  if (diffMonth < 12) return texts.month(diffMonth);
  return texts.year(diffYear);
}
function toISOString(date) {
  return date.toISOString();
}
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

// src/status/index.ts
var status_exports = {};
__export(status_exports, {
  getStatusColor: () => getStatusColor,
  getStatusVariant: () => getStatusVariant,
  translatePostStatus: () => translatePostStatus,
  translateStatus: () => translateStatus
});
var STATUS_TRANSLATIONS = {
  "pt-BR": {
    // Estados de conteúdo
    DRAFT: "Rascunho",
    PUBLISHED: "Publicado",
    ARCHIVED: "Arquivado",
    SCHEDULED: "Agendado",
    DELETED: "Exclu\xEDdo",
    // Estados de processo
    PENDING: "Pendente",
    ACTIVE: "Ativo",
    INACTIVE: "Inativo",
    COMPLETED: "Conclu\xEDdo",
    CANCELLED: "Cancelado",
    // Estados de aprovação
    APPROVED: "Aprovado",
    REJECTED: "Rejeitado",
    // Estados de pedido/pagamento
    PROCESSING: "Processando",
    PAID: "Pago",
    UNPAID: "N\xE3o Pago",
    REFUNDED: "Reembolsado",
    FAILED: "Falhou",
    // Estados de usuário
    VERIFIED: "Verificado",
    UNVERIFIED: "N\xE3o Verificado",
    BANNED: "Banido",
    SUSPENDED: "Suspenso"
  },
  "en-US": {
    DRAFT: "Draft",
    PUBLISHED: "Published",
    ARCHIVED: "Archived",
    SCHEDULED: "Scheduled",
    DELETED: "Deleted",
    PENDING: "Pending",
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    PROCESSING: "Processing",
    PAID: "Paid",
    UNPAID: "Unpaid",
    REFUNDED: "Refunded",
    FAILED: "Failed",
    VERIFIED: "Verified",
    UNVERIFIED: "Unverified",
    BANNED: "Banned",
    SUSPENDED: "Suspended"
  },
  "es-ES": {
    DRAFT: "Borrador",
    PUBLISHED: "Publicado",
    ARCHIVED: "Archivado",
    SCHEDULED: "Programado",
    DELETED: "Eliminado",
    PENDING: "Pendiente",
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
    COMPLETED: "Completado",
    CANCELLED: "Cancelado",
    APPROVED: "Aprobado",
    REJECTED: "Rechazado",
    PROCESSING: "Procesando",
    PAID: "Pagado",
    UNPAID: "No Pagado",
    REFUNDED: "Reembolsado",
    FAILED: "Fallido",
    VERIFIED: "Verificado",
    UNVERIFIED: "No Verificado",
    BANNED: "Bloqueado",
    SUSPENDED: "Suspendido"
  }
};
function translateStatus(status, locale = DEFAULT_LOCALE) {
  const normalized = status.toUpperCase();
  return STATUS_TRANSLATIONS[locale][normalized] || status;
}
function getStatusColor(status) {
  const normalized = status.toUpperCase();
  const colorMap = {
    DRAFT: "text-gray-600",
    PENDING: "text-yellow-600",
    PUBLISHED: "text-green-600",
    ACTIVE: "text-green-600",
    INACTIVE: "text-gray-600",
    ARCHIVED: "text-orange-600",
    DELETED: "text-red-600",
    SCHEDULED: "text-blue-600",
    COMPLETED: "text-green-600",
    CANCELLED: "text-red-600",
    APPROVED: "text-green-600",
    REJECTED: "text-red-600",
    FAILED: "text-red-600",
    VERIFIED: "text-green-600",
    BANNED: "text-red-600"
  };
  return colorMap[normalized] || "text-gray-600";
}
function getStatusVariant(status) {
  const normalized = status.toUpperCase();
  if (["PUBLISHED", "ACTIVE", "COMPLETED", "APPROVED", "VERIFIED"].includes(normalized)) {
    return "default";
  }
  if (["DELETED", "CANCELLED", "REJECTED", "FAILED", "BANNED"].includes(normalized)) {
    return "destructive";
  }
  if (["DRAFT", "INACTIVE", "ARCHIVED"].includes(normalized)) {
    return "secondary";
  }
  return "outline";
}
function translatePostStatus(status, locale = DEFAULT_LOCALE) {
  const postStatusMap = {
    "draft": "DRAFT",
    "published": "PUBLISHED",
    "archived": "ARCHIVED",
    "scheduled": "SCHEDULED",
    "pending_review": "PENDING"
  };
  const normalized = postStatusMap[status.toLowerCase()] || status.toUpperCase();
  if (status.toLowerCase() === "pending_review") {
    const translations = {
      "pt-BR": "Aguardando Revis\xE3o",
      "en-US": "Pending Review",
      "es-ES": "Pendiente de Revisi\xF3n"
    };
    return translations[locale] || translations["pt-BR"];
  }
  return translateStatus(normalized, locale);
}

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

// src/content/tiptap-utils.ts
function extractTextFromTiptap(content) {
  function extractFromNode(node) {
    if ("text" in node && typeof node.text === "string") {
      return node.text;
    }
    if ("content" in node && Array.isArray(node.content)) {
      return node.content.map((child) => extractFromNode(child)).join(" ");
    }
    return "";
  }
  return extractFromNode(content).trim();
}
function generateExcerpt(content, maxLength = 160) {
  const text = extractTextFromTiptap(content);
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + "...";
}
function createEmptyTiptapContent() {
  return {
    type: "doc",
    content: []
  };
}
function isContentEmpty(content) {
  if (!content || !content.content || content.content.length === 0) {
    return true;
  }
  const text = extractTextFromTiptap(content);
  return text.trim().length === 0;
}
function countWords(content) {
  const text = extractTextFromTiptap(content);
  return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
}
function countCharacters(content) {
  return extractTextFromTiptap(content).length;
}
function getReadingTime(content, wordsPerMinute = 200) {
  const wordCount = countWords(content);
  return Math.ceil(wordCount / wordsPerMinute);
}
function getContentStats(content) {
  const wordCount = countWords(content);
  const characterCount = extractTextFromTiptap(content).length;
  const readingTime = getReadingTime(content);
  return {
    wordCount,
    characterCount,
    readingTime
  };
}
function containsText(content, searchText) {
  const text = extractTextFromTiptap(content).toLowerCase();
  return text.includes(searchText.toLowerCase());
}
function replaceText(content, searchText, replaceText2) {
  function processNode(node) {
    const newNode = { ...node };
    if ("text" in node && typeof node.text === "string") {
      newNode.text = node.text.replace(
        new RegExp(searchText, "gi"),
        replaceText2
      );
    }
    if ("content" in node && Array.isArray(node.content)) {
      newNode.content = node.content.map((child) => processNode(child));
    }
    return newNode;
  }
  const newContent = {
    ...content,
    content: content.content.map((node) => processNode(node))
  };
  return newContent;
}

// src/color/index.ts
function hexToRgb2(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}
function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function hexToHsl(hex) {
  const rgb = hexToRgb2(hex);
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}
function hslToHex(h, s, l) {
  h = h / 360;
  s = s / 100;
  l = l / 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p2, q2, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
      if (t < 1 / 2) return q2;
      if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
      return p2;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}
function adjustBrightness(hex, amount) {
  const hsl = hexToHsl(hex);
  const newL = Math.max(0, Math.min(100, hsl.l + amount));
  return hslToHex(hsl.h, hsl.s, newL);
}
function adjustSaturation(hex, amount) {
  const hsl = hexToHsl(hex);
  const newS = Math.max(0, Math.min(100, hsl.s + amount));
  return hslToHex(hsl.h, newS, hsl.l);
}
function adjustHue(hex, degrees) {
  const hsl = hexToHsl(hex);
  const newH = (hsl.h + degrees) % 360;
  return hslToHex(newH < 0 ? newH + 360 : newH, hsl.s, hsl.l);
}
function lighten(hex, amount) {
  return adjustBrightness(hex, amount);
}
function darken(hex, amount) {
  return adjustBrightness(hex, -amount);
}
function hexToRgba(hex, alpha) {
  const rgb = hexToRgb2(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}
function getComplementary(hex) {
  return adjustHue(hex, 180);
}
function getAnalogousPalette(hex, count = 5) {
  const hsl = hexToHsl(hex);
  const step = 30;
  const palette = [];
  for (let i = 0; i < count; i++) {
    const hue = (hsl.h + (i - Math.floor(count / 2)) * step) % 360;
    palette.push(hslToHex(hue < 0 ? hue + 360 : hue, hsl.s, hsl.l));
  }
  return palette;
}

// src/dom/index.ts
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function onReducedMotionChange(callback) {
  if (typeof window === "undefined") {
    return () => {
    };
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handleChange = (e) => {
    callback(e.matches);
  };
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleChange);
  } else {
    mediaQuery.addListener(handleChange);
  }
  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener("change", handleChange);
    } else {
      mediaQuery.removeListener(handleChange);
    }
  };
}
function scrollToPosition(x = 0, y = 0, options = {}) {
  if (typeof window === "undefined") return;
  const { smooth = false, behavior } = options;
  window.scrollTo({
    left: x,
    top: y,
    behavior: behavior || (smooth ? "smooth" : "auto")
  });
}
function scrollToTop(smooth = false) {
  scrollToPosition(0, 0, { smooth });
}
function smoothScrollTo(x, y, duration = 300) {
  if (typeof window === "undefined") return;
  const startX = window.scrollX;
  const startY = window.scrollY;
  const distanceX = x - startX;
  const distanceY = y - startY;
  const startTime = performance.now();
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentX = startX + distanceX * easeProgress;
    const currentY = startY + distanceY * easeProgress;
    window.scrollTo(currentX, currentY);
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}
function scrollToElement(element, options = {}) {
  if (typeof window === "undefined") return;
  const { smooth = false, offset = 0, behavior } = options;
  let targetElement;
  if (typeof element === "string") {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }
  if (!targetElement) return;
  const rect = targetElement.getBoundingClientRect();
  const absoluteY = rect.top + window.scrollY - offset;
  window.scrollTo({
    left: 0,
    top: absoluteY,
    behavior: behavior || (smooth ? "smooth" : "auto")
  });
}
function isElementVisible(element, threshold = 0) {
  if (typeof window === "undefined") return false;
  let targetElement;
  if (typeof element === "string") {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }
  if (!targetElement) return false;
  const rect = targetElement.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const verticalThreshold = windowHeight * threshold;
  const horizontalThreshold = windowWidth * threshold;
  const isVisibleVertically = rect.bottom >= verticalThreshold && rect.top <= windowHeight - verticalThreshold;
  const isVisibleHorizontally = rect.right >= horizontalThreshold && rect.left <= windowWidth - horizontalThreshold;
  return isVisibleVertically && isVisibleHorizontally;
}
function getElementPosition(element) {
  if (typeof window === "undefined") return null;
  let targetElement;
  if (typeof element === "string") {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }
  if (!targetElement) return null;
  const rect = targetElement.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY
  };
}
function isMobile() {
  if (typeof window === "undefined") return false;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isMobileScreen = window.innerWidth <= 768;
  return isMobileUA || isMobileScreen;
}
function isDarkMode() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function onDarkModeChange(callback) {
  if (typeof window === "undefined") {
    return () => {
    };
  }
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = (e) => {
    callback(e.matches);
  };
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleChange);
  } else {
    mediaQuery.addListener(handleChange);
  }
  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener("change", handleChange);
    } else {
      mediaQuery.removeListener(handleChange);
    }
  };
}
async function copyToClipboard(text) {
  if (typeof window === "undefined") return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const result = document.execCommand("copy");
    document.body.removeChild(textArea);
    return result;
  } catch {
    return false;
  }
}
function downloadFile(blob, filename) {
  if (typeof window === "undefined") return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
var DEFAULT_CONFIG = {
  autoRefresh: true,
  refreshInterval: 15 * 60 * 1e3,
  // 15 minutes
  tokenStorageKey: "auth_token",
  userStorageKey: "auth_user",
  apiEndpoint: "/api/auth",
  onAuthChange: () => {
  },
  onError: () => {
  }
};
var AuthStorage = class {
  static setItem(key, value) {
    if (!this.isClient) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }
  static getItem(key) {
    if (!this.isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn("Failed to read from localStorage:", error);
      return null;
    }
  }
  static removeItem(key) {
    if (!this.isClient) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn("Failed to remove from localStorage:", error);
    }
  }
  static setUser(user, key) {
    this.setItem(key, JSON.stringify(user));
  }
  static getUser(key) {
    const data = this.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      this.removeItem(key);
      return null;
    }
  }
  static removeUser(key) {
    this.removeItem(key);
  }
};
__publicField(AuthStorage, "isClient", typeof window !== "undefined");
var TokenManager = class {
  static decodeToken(token) {
    try {
      const payload = token.split(".")[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
  static isTokenExpired(token) {
    const decoded = this.decodeToken(token);
    if (!decoded) return true;
    const now = Date.now() / 1e3;
    return decoded.exp < now;
  }
};
function useAuth(config = {}) {
  const configRef = useRef({ ...DEFAULT_CONFIG, ...config });
  const cfg = configRef.current;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const refreshTimerRef = useRef(null);
  const storeToken = useCallback((token, refreshToken2) => {
    AuthStorage.setItem(cfg.tokenStorageKey, token);
    if (refreshToken2) {
      AuthStorage.setItem(`${cfg.tokenStorageKey}_refresh`, refreshToken2);
    }
  }, [cfg.tokenStorageKey]);
  const getStoredToken = useCallback(() => {
    return AuthStorage.getItem(cfg.tokenStorageKey);
  }, [cfg.tokenStorageKey]);
  const clearTokens = useCallback(() => {
    AuthStorage.removeItem(cfg.tokenStorageKey);
    AuthStorage.removeItem(`${cfg.tokenStorageKey}_refresh`);
  }, [cfg.tokenStorageKey]);
  const apiCall = useCallback(async (endpoint, options = {}) => {
    const token = getStoredToken();
    const url = `${cfg.apiEndpoint}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...token && { Authorization: `Bearer ${token}` },
        ...options.headers
      }
    });
    if (!response.ok) {
      const error2 = await response.text();
      throw new Error(error2 || `HTTP ${response.status}`);
    }
    return response.json();
  }, [cfg.apiEndpoint, getStoredToken]);
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall("/login", {
        method: "POST",
        body: JSON.stringify(credentials)
      });
      if (response.success && response.user && response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        storeToken(response.token, response.refreshToken);
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        return { success: true, user: response.user, token: response.token };
      } else {
        const errorMsg = response.error || "Login failed";
        setError(errorMsg);
        if (cfg.onError) cfg.onError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error2) {
      const errorMsg = error2 instanceof Error ? error2.message : "Login failed";
      setError(errorMsg);
      if (cfg.onError) cfg.onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [apiCall, setUser, storeToken, cfg]);
  const logout = useCallback(async (options = {}) => {
    try {
      if (options.invalidateAllSessions) {
        await apiCall("/logout", { method: "POST" });
      }
    } catch (error2) {
      console.warn("Logout API call failed:", error2);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      clearTokens();
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      if (cfg.onAuthChange) {
        cfg.onAuthChange(null);
      }
    }
  }, [apiCall, clearTokens, cfg]);
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall("/register", {
        method: "POST",
        body: JSON.stringify(userData)
      });
      if (response.success && response.user && response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        storeToken(response.token, response.refreshToken);
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        return { success: true, user: response.user, token: response.token };
      } else {
        const errorMsg = response.error || "Registration failed";
        setError(errorMsg);
        if (cfg.onError) cfg.onError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error2) {
      const errorMsg = error2 instanceof Error ? error2.message : "Registration failed";
      setError(errorMsg);
      if (cfg.onError) cfg.onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [apiCall, setUser, storeToken, cfg]);
  const updateProfile = useCallback(async (data) => {
    if (!user) {
      const error2 = "No user logged in";
      setError(error2);
      if (cfg.onError) cfg.onError(error2);
      return { success: false, error: error2 };
    }
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall("/profile", {
        method: "PUT",
        body: JSON.stringify(data)
      });
      if (response.success && response.user) {
        setUser(response.user);
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        return { success: true, user: response.user };
      } else {
        const errorMsg = response.error || "Profile update failed";
        setError(errorMsg);
        if (cfg.onError) cfg.onError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error2) {
      const errorMsg = error2 instanceof Error ? error2.message : "Profile update failed";
      setError(errorMsg);
      if (cfg.onError) cfg.onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [apiCall, user, setUser, cfg]);
  const refreshToken = useCallback(async () => {
    const refreshToken2 = AuthStorage.getItem(`${cfg.tokenStorageKey}_refresh`);
    if (!refreshToken2) {
      return { success: false, error: "No refresh token available" };
    }
    try {
      const response = await apiCall("/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken: refreshToken2 })
      });
      if (response.success && response.token && response.user) {
        setUser(response.user);
        storeToken(response.token, response.refreshToken);
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        return { success: true, user: response.user, token: response.token };
      } else {
        await logout();
        return { success: false, error: "Session expired" };
      }
    } catch (error2) {
      await logout();
      return { success: false, error: "Session expired" };
    }
  }, [apiCall, setUser, storeToken, logout, cfg]);
  const resetError = useCallback(() => {
    setError(null);
  }, []);
  useEffect(() => {
    const token = getStoredToken();
    const storedUser = AuthStorage.getUser(cfg.userStorageKey);
    if (token && storedUser && !TokenManager.isTokenExpired(token)) {
      setUser(storedUser);
      setIsAuthenticated(true);
      if (cfg.onAuthChange) {
        cfg.onAuthChange(storedUser);
      }
    } else if (token && TokenManager.isTokenExpired(token)) {
      refreshToken();
    } else {
      setLoading(false);
    }
    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, []);
  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    register,
    updateProfile,
    refreshToken,
    resetError
  };
}
function useIsAuthenticated() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}
function useCurrentUser() {
  const { user } = useAuth();
  return user;
}
function useHasRole(role) {
  const { user } = useAuth();
  return user?.role === role;
}
function useIsAdmin() {
  return useHasRole("admin" /* ADMIN */);
}

// src/stats/index.ts
function formatNumber(num) {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "k";
  }
  return num.toString();
}
function calculateChange(current, previous) {
  if (previous === 0) return 100;
  return Math.round((current - previous) / previous * 100);
}
function formatPercentage(value, options = {}) {
  const { showSign = true, decimals = 0 } = options;
  const sign = showSign && value > 0 ? "+" : "";
  const formattedValue = value.toFixed(decimals);
  return `${sign}${formattedValue}%`;
}
function generateMockChartData(days, locale = "pt-BR") {
  const data = [];
  const now = /* @__PURE__ */ new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit"
      }),
      views: Math.floor(Math.random() * 1e3) + 500,
      uniqueViews: Math.floor(Math.random() * 700) + 300,
      likes: Math.floor(Math.random() * 100) + 50,
      comments: Math.floor(Math.random() * 50) + 10,
      shares: Math.floor(Math.random() * 30) + 5
    });
  }
  return data;
}
function groupDataByPeriod(data) {
  return data;
}
function calculateMovingAverage(data, window2) {
  const result = [];
  for (let i = window2 - 1; i < data.length; i++) {
    const sum = data.slice(i - window2 + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push(sum / window2);
  }
  return result;
}
function findMinMax(data, field) {
  const values = data.map((item) => Number(item[field]) || 0);
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
}

// src/authentication/index.ts
var authentication_exports = {};
__export(authentication_exports, {
  getRefreshToken: () => getRefreshToken,
  getToken: () => getToken,
  getTokens: () => getTokens,
  hasToken: () => hasToken,
  removeToken: () => removeToken,
  setRefreshToken: () => setRefreshToken,
  setToken: () => setToken,
  setTokens: () => setTokens
});
var TOKEN_KEY = "auth_token";
var REFRESH_TOKEN_KEY = "refresh_token";
var getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
};
var setToken = (token) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(TOKEN_KEY, token);
};
var getRefreshToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};
var setRefreshToken = (refreshToken) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};
var removeToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
var hasToken = () => {
  return !!getToken();
};
var getTokens = () => {
  return {
    accessToken: getToken(),
    refreshToken: getRefreshToken()
  };
};
var setTokens = ({
  accessToken,
  refreshToken
}) => {
  setToken(accessToken);
  setRefreshToken(refreshToken);
};

// src/search/index.ts
function searchContent(query, content, options = {}) {
  if (!query.trim()) return content;
  const {
    fields = ["title", "description", "content", "tags"],
    caseSensitive = false,
    exactMatch = false
  } = options;
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  return content.filter((item) => {
    return fields.some((field) => {
      const value = item[field];
      if (!value) return false;
      if (Array.isArray(value)) {
        return value.some((v) => {
          const strValue2 = caseSensitive ? String(v) : String(v).toLowerCase();
          return exactMatch ? strValue2 === searchQuery : strValue2.includes(searchQuery);
        });
      }
      const strValue = caseSensitive ? String(value) : String(value).toLowerCase();
      return exactMatch ? strValue === searchQuery : strValue.includes(searchQuery);
    });
  });
}
function searchWithScore(query, content, options = {}) {
  if (!query.trim()) return content;
  const {
    fields = ["title", "description", "content", "tags"],
    caseSensitive = false
  } = options;
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  const scored = content.map((item) => {
    let score = 0;
    fields.forEach((field, index) => {
      const value = item[field];
      if (!value) return;
      const weight = fields.length - index;
      if (Array.isArray(value)) {
        const matches = value.filter((v) => {
          const strValue = caseSensitive ? String(v) : String(v).toLowerCase();
          return strValue.includes(searchQuery);
        }).length;
        score += matches * weight;
      } else {
        const strValue = caseSensitive ? String(value) : String(value).toLowerCase();
        if (strValue.includes(searchQuery)) {
          score += weight;
          if (strValue === searchQuery) {
            score += weight * 2;
          }
        }
      }
    });
    return { item, score };
  });
  return scored.filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).map(({ item }) => item);
}
function fuzzySearch(query, content, options = {}) {
  if (!query.trim()) return content;
  const {
    fields = ["title", "description"],
    caseSensitive = false,
    threshold = 0.6
    // Similaridade mínima (0-1)
  } = options;
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  return content.filter((item) => {
    return fields.some((field) => {
      const value = item[field];
      if (!value) return false;
      const strValue = caseSensitive ? String(value) : String(value).toLowerCase();
      const similarity = calculateSimilarity(searchQuery, strValue);
      return similarity >= threshold;
    });
  });
}
function calculateSimilarity(str1, str2) {
  if (str1 === str2) return 1;
  if (str1.length === 0 || str2.length === 0) return 0;
  if (str2.includes(str1)) return 0.8;
  const common = str1.split("").filter((char) => str2.includes(char)).length;
  const similarity = common / Math.max(str1.length, str2.length);
  return similarity;
}

// src/string/index.ts
function textToSlug(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").trim().replace(/^-+|-+$/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
function truncate(text, maxLength, suffix = "...") {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}
function getInitials(name, maxInitials = 2) {
  return name.split(" ").filter((word) => word.length > 0).map((word) => word[0]).join("").toUpperCase().slice(0, maxInitials);
}
function formatPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}
function formatCPF(cpf) {
  const digits = cpf.replace(/\D/g, "");
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
function formatCNPJ(cnpj) {
  const digits = cnpj.replace(/\D/g, "");
  return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}
function isCPF(cpf) {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) {
    return false;
  }
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits.charAt(i)) * (10 - i);
  }
  let remainder = sum * 10 % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits.charAt(9))) {
    return false;
  }
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits.charAt(i)) * (11 - i);
  }
  remainder = sum * 10 % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits.charAt(10))) {
    return false;
  }
  return true;
}
function isCNPJ(cnpj) {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14 || /^(\d)\1{13}$/.test(digits)) {
    return false;
  }
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits.charAt(i)) * weights1[i];
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (digit1 !== parseInt(digits.charAt(12))) {
    return false;
  }
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
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

// src/number/index.ts
function formatCurrency(value, locale = DEFAULT_LOCALE, options) {
  const currency = CURRENCY_MAP[locale];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...options
  }).format(value);
}
function formatNumber2(value, decimals = 0, locale = DEFAULT_LOCALE) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}
function formatCompact(value, decimals = 1, locale = DEFAULT_LOCALE) {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}
function usePasswordStrength(password, options = {}) {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
    customPatterns = [],
    labels = {}
  } = options;
  const defaultLabels = {
    veryWeak: "Very Weak",
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
    enterPassword: "Enter a password",
    useMinLength: `Use at least ${minLength} characters`,
    addUppercase: "Add uppercase letters",
    addLowercase: "Add lowercase letters",
    addNumbers: "Add numbers",
    addSpecialChars: "Add special characters (!@#$%)",
    avoidRepeating: "Avoid repeating characters",
    avoidCommon: "Avoid common passwords or obvious patterns"
  };
  const finalLabels = { ...defaultLabels, ...labels };
  const strength = React.useMemo(() => {
    if (!password) return 0;
    let score = 0;
    const length = password.length;
    if (length >= minLength) score += 25;
    if (length >= 12) score += 15;
    if (length >= 16) score += 10;
    if (/[a-z]/.test(password) && requireLowercase) score += 15;
    if (/[A-Z]/.test(password) && requireUppercase) score += 15;
    if (/[0-9]/.test(password) && requireNumbers) score += 15;
    if (/[^a-zA-Z0-9]/.test(password) && requireSpecialChars) score += 20;
    customPatterns.forEach((pattern) => {
      if (new RegExp(pattern).test(password)) {
        score += 5;
      }
    });
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(password)) {
      score += 10;
    }
    const commonPatterns = [
      /^123456/,
      /password/i,
      /qwerty/i,
      /admin/i,
      /abc123/i,
      /^(.)\1+$/,
      // Caracteres repetidos
      /^(?:[a-z]+|[A-Z]+|[0-9]+)$/
      // Apenas um tipo de caractere
    ];
    commonPatterns.forEach((pattern) => {
      if (pattern.test(password)) {
        score = Math.max(0, score - 20);
      }
    });
    return Math.min(100, Math.max(0, score));
  }, [password, minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars, customPatterns]);
  const level = React.useMemo(() => {
    if (strength < 20) return "very-weak";
    if (strength < 40) return "weak";
    if (strength < 60) return "fair";
    if (strength < 80) return "good";
    return "strong";
  }, [strength]);
  const color = React.useMemo(() => {
    switch (level) {
      case "very-weak":
        return "#ef4444";
      // red-500
      case "weak":
        return "#f97316";
      // orange-500
      case "fair":
        return "#eab308";
      // yellow-500
      case "good":
        return "#22c55e";
      // green-500
      case "strong":
        return "#059669";
      // emerald-600
      default:
        return "#6b7280";
    }
  }, [level]);
  const label = React.useMemo(() => {
    switch (level) {
      case "very-weak":
        return finalLabels.veryWeak;
      case "weak":
        return finalLabels.weak;
      case "fair":
        return finalLabels.fair;
      case "good":
        return finalLabels.good;
      case "strong":
        return finalLabels.strong;
      default:
        return finalLabels.enterPassword;
    }
  }, [level, finalLabels]);
  const validations = React.useMemo(() => {
    return {
      hasMinLength: password.length >= minLength,
      hasUppercase: !requireUppercase || /[A-Z]/.test(password),
      hasLowercase: !requireLowercase || /[a-z]/.test(password),
      hasNumbers: !requireNumbers || /[0-9]/.test(password),
      hasSpecialChars: !requireSpecialChars || /[^a-zA-Z0-9]/.test(password),
      noRepeatingChars: !/^(.)\1+$/.test(password),
      noCommonPatterns: !/123456|password|qwerty|admin|abc123/i.test(password)
    };
  }, [password, minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars]);
  const isValid = React.useMemo(() => {
    return Object.values(validations).every(Boolean);
  }, [validations]);
  const suggestions = React.useMemo(() => {
    const suggestions2 = [];
    if (!validations.hasMinLength) {
      suggestions2.push(finalLabels.useMinLength);
    }
    if (!validations.hasUppercase && requireUppercase) {
      suggestions2.push(finalLabels.addUppercase);
    }
    if (!validations.hasLowercase && requireLowercase) {
      suggestions2.push(finalLabels.addLowercase);
    }
    if (!validations.hasNumbers && requireNumbers) {
      suggestions2.push(finalLabels.addNumbers);
    }
    if (!validations.hasSpecialChars && requireSpecialChars) {
      suggestions2.push(finalLabels.addSpecialChars);
    }
    if (!validations.noRepeatingChars) {
      suggestions2.push(finalLabels.avoidRepeating);
    }
    if (!validations.noCommonPatterns) {
      suggestions2.push(finalLabels.avoidCommon);
    }
    return suggestions2;
  }, [validations, finalLabels, minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars]);
  const generateStrongPassword = React.useCallback((length = 16) => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let chars = lowercase;
    if (requireUppercase) chars += uppercase;
    if (requireNumbers) chars += numbers;
    if (requireSpecialChars) chars += special;
    let password2 = "";
    if (requireLowercase) password2 += lowercase[Math.floor(Math.random() * lowercase.length)];
    if (requireUppercase) password2 += uppercase[Math.floor(Math.random() * uppercase.length)];
    if (requireNumbers) password2 += numbers[Math.floor(Math.random() * numbers.length)];
    if (requireSpecialChars) password2 += special[Math.floor(Math.random() * special.length)];
    for (let i = password2.length; i < length; i++) {
      password2 += chars[Math.floor(Math.random() * chars.length)];
    }
    return password2.split("").sort(() => Math.random() - 0.5).join("");
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
    isVeryWeak: level === "very-weak",
    isWeak: level === "weak",
    isFair: level === "fair",
    isGood: level === "good",
    isStrong: level === "strong"
  };
}

// src/pt-br.ts
var pt_br_exports = {};
__export(pt_br_exports, {
  default: () => pt_br_default,
  formatCompact: () => formatCompact2,
  formatCurrency: () => formatCurrency2,
  formatDate: () => formatDate2,
  formatDateTime: () => formatDateTime2,
  formatNumber: () => formatNumber3,
  formatRelativeDate: () => formatRelativeDate2,
  translateStatus: () => translateStatus2
});
function formatDate2(date, format = "long") {
  return formatDate(date, format, "pt-BR");
}
function formatDateTime2(date) {
  return formatDateTime(date, "pt-BR");
}
function formatRelativeDate2(date) {
  return formatRelativeDate(date, "pt-BR");
}
function formatCurrency2(value, options) {
  return formatCurrency(value, "pt-BR", options);
}
function formatNumber3(value, decimals = 0) {
  return formatNumber2(value, decimals, "pt-BR");
}
function formatCompact2(value, decimals = 1) {
  return formatCompact(value, decimals, "pt-BR");
}
function translateStatus2(status) {
  return translateStatus(status, "pt-BR");
}
var pt_br_default = {
  formatDate: formatDate2,
  formatDateTime: formatDateTime2,
  formatRelativeDate: formatRelativeDate2,
  formatCurrency: formatCurrency2,
  formatNumber: formatNumber3,
  formatCompact: formatCompact2,
  translateStatus: translateStatus2
};

// src/text/index.ts
var text_exports = {};
__export(text_exports, {
  calculateReadingTime: () => calculateReadingTime,
  capitalize: () => capitalize,
  cleanText: () => cleanText2,
  countWords: () => countWords2,
  extractInitials: () => extractInitials,
  generateAvatarUrl: () => generateAvatarUrl,
  generateDynamicAvatarUrl: () => generateDynamicAvatarUrl,
  generateUniqueId: () => generateUniqueId,
  getAvatarColorFromName: () => getAvatarColorFromName,
  isEmpty: () => isEmpty,
  isValidAvatarUrl: () => isValidAvatarUrl,
  normalizeSpaces: () => normalizeSpaces,
  truncateText: () => truncateText
});
function extractInitials(name, maxChars = 2) {
  if (!name || !name.trim()) {
    return "";
  }
  const words = name.trim().split(/\s+/);
  const initials = words.slice(0, maxChars).map((word) => word.charAt(0).toUpperCase()).join("");
  return initials;
}
function generateAvatarUrl(name, size = 200, backgroundColor = "0891b2", textColor = "fff") {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&size=${size}&background=${backgroundColor}&color=${textColor}&font-size=0.5`;
}
function isValidAvatarUrl(url) {
  if (!url || typeof url !== "string") {
    return false;
  }
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
function getAvatarColorFromName(name) {
  if (!name || typeof name !== "string") {
    return "#0891b2";
  }
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "#0891b2",
    // cyan-600
    "#9333ea",
    // purple-600
    "#db2777",
    // pink-600
    "#059669",
    // emerald-600
    "#2563eb",
    // blue-600
    "#f97316",
    // orange-500
    "#dc2626",
    // red-600
    "#7c3aed"
    // violet-600
  ];
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
function generateDynamicAvatarUrl(name, size = 200) {
  const color = getAvatarColorFromName(name);
  const colorHex = color.replace("#", "");
  return generateAvatarUrl(name, size, colorHex, "fff");
}
function generateUniqueId(text, prefix = "", suffix = "") {
  const slug = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim().substring(0, 50);
  const parts = [prefix, slug, suffix].filter(Boolean);
  return parts.join("-");
}
function truncateText(text, maxLength, suffix = "...") {
  if (!text || text.length <= maxLength) {
    return text || "";
  }
  return text.substring(0, maxLength - suffix.length) + suffix;
}
function capitalize(text, options = {}) {
  if (!text) return "";
  const { firstWordOnly = false, lowerRest = false } = options;
  if (firstWordOnly) {
    return text.charAt(0).toUpperCase() + (lowerRest ? text.slice(1).toLowerCase() : text.slice(1));
  }
  if (lowerRest) {
    return text.replace(/\b\w/g, (char) => char.toUpperCase()).toLowerCase();
  }
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}
function cleanText2(text, allowSpaces = true) {
  if (!text) return "";
  const pattern = allowSpaces ? /[^\w\s]/g : /[^\w]/g;
  return text.replace(pattern, "");
}
function countWords2(text) {
  if (!text || !text.trim()) {
    return 0;
  }
  return text.trim().split(/\s+/).length;
}
function isEmpty(text) {
  return !text || !text.trim();
}
function normalizeSpaces(text, options = {}) {
  if (!text) return "";
  const { newlines = false } = options;
  let cleaned = text;
  if (newlines) {
    cleaned = cleaned.replace(/\s+/g, " ");
  } else {
    cleaned = cleaned.replace(/\s+/g, " ");
  }
  return cleaned.trim();
}
function calculateReadingTime(content, wordsPerMinute = 200) {
  let text = "";
  if (typeof content === "object" && content !== null) {
    const extractText = (node) => {
      if (!node) return "";
      let result = "";
      if (node.text) {
        result += node.text + " ";
      }
      if (Array.isArray(node.content)) {
        result += node.content.map(extractText).join(" ");
      }
      return result;
    };
    text = extractText(content);
  } else if (typeof content === "string") {
    text = content.replace(/<[^>]*>/g, "");
  }
  const words = text.trim().split(/\s+/).filter((word) => word.length > 0).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time > 0 ? time : 1;
}

// src/index.ts
var textProcessing = text_exports;
var datetime = date_exports;
var authentication = authentication_exports;
var stateManagement = status_exports;

export { CURRENCY_MAP, DEFAULT_LOCALE, adjustBrightness, adjustHue, adjustSaturation, authentication, calculateChange, calculateMovingAverage, calculateReadingTime, capitalize, cleanText2 as cleanText, containsText, copyToClipboard, countCharacters, countWords2 as countWords, createEmptyTiptapContent, darken, datetime, downloadFile, extractInitials, extractTextFromTiptap, findMinMax, formatCNPJ, formatCPF, formatCurrency, formatDate, formatDateTime, formatNumber, formatPercentage, formatPhone, formatRelativeDate, fuzzySearch, generateAvatarUrl, generateDynamicAvatarUrl, generateExcerpt, generateMockChartData, generateUniqueId, getAnalogousPalette, getAvatarColorFromName, getComplementary, getContentStats, getElementPosition, getInitials, getReadingTime, getRefreshToken, getStatusColor, getStatusVariant, getToken, getTokens, groupDataByPeriod, hasToken, hexToHsl, hexToRgb, hexToRgba, hslToHex, isCNPJ, isCPF, isContentEmpty, isDarkMode, isElementVisible, isEmpty, isMobile, isValidAvatarUrl, isValidDate, lighten, normalizeSpaces, onDarkModeChange, onReducedMotionChange, prefersReducedMotion, pt_br_exports as ptBR, removeToken, replaceText, rgbToHex, scrollToElement, scrollToPosition, scrollToTop, searchContent, searchWithScore, setRefreshToken, setToken, setTokens, smoothScrollTo, stateManagement, textProcessing, textToSlug, toISOString, translatePostStatus, translateStatus, truncate, truncateText, useAuth, useCurrentUser, useHasRole, useIsAdmin, useIsAuthenticated, usePasswordStrength, validateContrast, validateEmail, validateMessage, validatePassword, validatePhone, validateSlug, validateText, validateUrl, validateUsername };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map