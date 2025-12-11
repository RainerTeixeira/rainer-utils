'use strict';

// src/types.ts
var DEFAULT_LOCALE = "pt-BR";
var CURRENCY_MAP = {
  "pt-BR": "BRL",
  "en-US": "USD",
  "es-ES": "EUR"
};

// src/number/index.ts
function formatCurrency(value, locale = DEFAULT_LOCALE, options) {
  const currency = CURRENCY_MAP[locale];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...options
  }).format(value);
}
function formatPercent(value, decimals = 0, usePercentage = false) {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(usePercentage ? value / 100 : value);
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
function parseCurrency(currency) {
  const cleaned = currency.replace(/[R$\s]/g, "").replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned);
}
function round(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

exports.clamp = clamp;
exports.formatCompact = formatCompact;
exports.formatCurrency = formatCurrency;
exports.formatNumber = formatNumber;
exports.formatPercent = formatPercent;
exports.parseCurrency = parseCurrency;
exports.round = round;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map