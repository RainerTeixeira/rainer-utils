'use strict';

// src/stats/index.ts
function formatCompactNumber(num) {
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
function calculateMovingAverage(data, window) {
  const result = [];
  for (let i = window - 1; i < data.length; i++) {
    const sum = data.slice(i - window + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push(sum / window);
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

exports.calculateChange = calculateChange;
exports.calculateMovingAverage = calculateMovingAverage;
exports.findMinMax = findMinMax;
exports.formatCompactNumber = formatCompactNumber;
exports.formatPercentage = formatPercentage;
exports.generateMockChartData = generateMockChartData;
exports.groupDataByPeriod = groupDataByPeriod;
//# sourceMappingURL=stats.js.map
//# sourceMappingURL=stats.js.map