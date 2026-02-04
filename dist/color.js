'use strict';

// src/color/index.ts
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
function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function hexToHsl(hex) {
  const rgb = hexToRgb(hex);
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
  const rgb = hexToRgb(hex);
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

exports.adjustBrightness = adjustBrightness;
exports.adjustHue = adjustHue;
exports.adjustSaturation = adjustSaturation;
exports.darken = darken;
exports.getAnalogousPalette = getAnalogousPalette;
exports.getComplementary = getComplementary;
exports.hexToHsl = hexToHsl;
exports.hexToRgb = hexToRgb;
exports.hexToRgba = hexToRgba;
exports.hslToHex = hslToHex;
exports.lighten = lighten;
exports.rgbToHex = rgbToHex;
//# sourceMappingURL=color.js.map
//# sourceMappingURL=color.js.map