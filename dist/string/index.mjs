// src/string/index.ts
function textToSlug(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").trim().replace(/^-+|-+$/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
function capitalize(text) {
  return text.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function truncate(text, maxLength, suffix = "...") {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}
function removeAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function getInitials(name, maxInitials = 2) {
  return name.split(" ").filter((word) => word.length > 0).map((word) => word[0]).join("").toUpperCase().slice(0, maxInitials);
}
function isEmpty(text) {
  return !text || text.trim().length === 0;
}
function wordCount(text) {
  return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
}
function formatPhone(phone, locale = "pt-BR") {
  const digits = phone.replace(/\D/g, "");
  switch (locale) {
    case "pt-BR":
      if (digits.length === 11) {
        return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      }
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    case "en-US":
      if (digits.length === 10) {
        return digits.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      }
      if (digits.length === 11 && digits.startsWith("1")) {
        return digits.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4");
      }
      return digits;
    case "es-ES":
      if (digits.length === 9) {
        return digits.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "+34 $1 $2 $3 $4");
      }
      return digits;
    default:
      return digits;
  }
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

export { capitalize, formatCNPJ, formatCPF, formatPhone, getInitials, isCNPJ, isCPF, isEmpty, removeAccents, textToSlug, truncate, wordCount };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map