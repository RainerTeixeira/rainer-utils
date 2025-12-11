// src/string/index.ts
function textToSlug(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
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

export { capitalize, getInitials, isEmpty, removeAccents, textToSlug, truncate, wordCount };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map