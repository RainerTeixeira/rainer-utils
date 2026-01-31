'use strict';

// src/types.ts
var DEFAULT_LOCALE = "pt-BR";
var CURRENCY_MAP = {
  "pt-BR": "BRL",
  "en-US": "USD",
  "es-ES": "EUR"
};

// src/i18n/index.ts
var currentLocale = DEFAULT_LOCALE;
function setLocale(locale) {
  currentLocale = locale;
}
function getLocale() {
  return currentLocale;
}
function getCurrency(locale) {
  return CURRENCY_MAP[locale || currentLocale];
}
var LOCALE_CONFIG = {
  "pt-BR": {
    locale: "pt-BR",
    currency: "BRL",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm",
    decimalSeparator: ",",
    thousandSeparator: ".",
    firstDayOfWeek: 0
    // Domingo
  },
  "en-US": {
    locale: "en-US",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "hh:mm A",
    decimalSeparator: ".",
    thousandSeparator: ",",
    firstDayOfWeek: 0
    // Domingo
  },
  "es-ES": {
    locale: "es-ES",
    currency: "EUR",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm",
    decimalSeparator: ",",
    thousandSeparator: ".",
    firstDayOfWeek: 1
    // Segunda
  }
};
function getLocaleConfig(locale) {
  return LOCALE_CONFIG[locale || currentLocale];
}
var TRANSLATIONS = {
  "pt-BR": {
    days: ["Domingo", "Segunda", "Ter\xE7a", "Quarta", "Quinta", "Sexta", "S\xE1bado"],
    daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"],
    months: [
      "Janeiro",
      "Fevereiro",
      "Mar\xE7o",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ],
    monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    today: "Hoje",
    yesterday: "Ontem",
    tomorrow: "Amanh\xE3",
    ago: "atr\xE1s",
    in: "em"
  },
  "en-US": {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    yesterday: "Yesterday",
    tomorrow: "Tomorrow",
    ago: "ago",
    in: "in"
  },
  "es-ES": {
    days: ["Domingo", "Lunes", "Martes", "Mi\xE9rcoles", "Jueves", "Viernes", "S\xE1bado"],
    daysShort: ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"],
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ],
    monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    today: "Hoy",
    yesterday: "Ayer",
    tomorrow: "Ma\xF1ana",
    ago: "hace",
    in: "en"
  }
};
function getTranslations(locale) {
  return TRANSLATIONS[locale || currentLocale];
}
function translate(key, locale) {
  const translations = getTranslations(locale);
  return translations[key];
}
function detectBrowserLocale() {
  if (typeof window === "undefined" || !window.navigator) {
    return DEFAULT_LOCALE;
  }
  const browserLang = window.navigator.language;
  if (browserLang.startsWith("pt")) return "pt-BR";
  if (browserLang.startsWith("es")) return "es-ES";
  if (browserLang.startsWith("en")) return "en-US";
  return DEFAULT_LOCALE;
}

exports.CURRENCY_MAP = CURRENCY_MAP;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
exports.LOCALE_CONFIG = LOCALE_CONFIG;
exports.TRANSLATIONS = TRANSLATIONS;
exports.detectBrowserLocale = detectBrowserLocale;
exports.getCurrency = getCurrency;
exports.getLocale = getLocale;
exports.getLocaleConfig = getLocaleConfig;
exports.getTranslations = getTranslations;
exports.setLocale = setLocale;
exports.translate = translate;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map