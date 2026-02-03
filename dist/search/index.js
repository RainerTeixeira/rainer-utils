'use strict';

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

exports.fuzzySearch = fuzzySearch;
exports.searchContent = searchContent;
exports.searchWithScore = searchWithScore;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map