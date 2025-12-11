'use strict';

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/types.ts
var DEFAULT_LOCALE = "pt-BR";
var CURRENCY_MAP = {
  "pt-BR": "BRL",
  "en-US": "USD",
  "es-ES": "EUR"
};

// src/text/index.ts
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
function cleanText(text, allowSpaces = true) {
  if (!text) return "";
  const pattern = allowSpaces ? /[^\w\s]/g : /[^\w]/g;
  return text.replace(pattern, "");
}
function countWords(text) {
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

// src/string/index.ts
function textToSlug(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

// src/date/index.ts
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

// src/number/index.ts
function formatCurrency(value, locale = DEFAULT_LOCALE, options) {
  const currency = CURRENCY_MAP[locale];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...options
  }).format(value);
}
function formatNumber(value, decimals = 0, locale = DEFAULT_LOCALE) {
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

// src/status/index.ts
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

// src/stats/index.ts
function formatNumber2(num) {
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

// src/pt-br.ts
var pt_br_exports = {};
__export(pt_br_exports, {
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
  return formatNumber(value, decimals, "pt-BR");
}
function formatCompact2(value, decimals = 1) {
  return formatCompact(value, decimals, "pt-BR");
}
function translateStatus2(status) {
  return translateStatus(status, "pt-BR");
}

exports.CURRENCY_MAP = CURRENCY_MAP;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
exports.calculateChange = calculateChange;
exports.calculateMovingAverage = calculateMovingAverage;
exports.capitalize = capitalize;
exports.cleanText = cleanText;
exports.copyToClipboard = copyToClipboard;
exports.countWords = countWords;
exports.downloadFile = downloadFile;
exports.extractInitials = extractInitials;
exports.findMinMax = findMinMax;
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
exports.formatNumber = formatNumber2;
exports.formatPercentage = formatPercentage;
exports.formatRelativeDate = formatRelativeDate;
exports.generateAvatarUrl = generateAvatarUrl;
exports.generateDynamicAvatarUrl = generateDynamicAvatarUrl;
exports.generateMockChartData = generateMockChartData;
exports.generateUniqueId = generateUniqueId;
exports.getAvatarColorFromName = getAvatarColorFromName;
exports.getElementPosition = getElementPosition;
exports.getStatusColor = getStatusColor;
exports.getStatusVariant = getStatusVariant;
exports.groupDataByPeriod = groupDataByPeriod;
exports.isDarkMode = isDarkMode;
exports.isElementVisible = isElementVisible;
exports.isEmpty = isEmpty;
exports.isMobile = isMobile;
exports.isValidAvatarUrl = isValidAvatarUrl;
exports.isValidDate = isValidDate;
exports.normalizeSpaces = normalizeSpaces;
exports.onDarkModeChange = onDarkModeChange;
exports.onReducedMotionChange = onReducedMotionChange;
exports.prefersReducedMotion = prefersReducedMotion;
exports.ptBR = pt_br_exports;
exports.scrollToElement = scrollToElement;
exports.scrollToPosition = scrollToPosition;
exports.scrollToTop = scrollToTop;
exports.smoothScrollTo = smoothScrollTo;
exports.textToSlug = textToSlug;
exports.toISOString = toISOString;
exports.translateStatus = translateStatus;
exports.truncateText = truncateText;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validatePhone = validatePhone;
exports.validateSlug = validateSlug;
exports.validateText = validateText;
exports.validateUrl = validateUrl;
exports.validateUsername = validateUsername;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map