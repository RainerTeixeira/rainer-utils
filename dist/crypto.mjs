// src/crypto/index.ts
var generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
var generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
};
var hash = async (text) => {
  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return text;
};
var base64Encode = (text) => {
  if (typeof window !== "undefined") {
    return window.btoa(text);
  }
  return Buffer.from(text).toString("base64");
};
var base64Decode = (encoded) => {
  if (typeof window !== "undefined") {
    return window.atob(encoded);
  }
  return Buffer.from(encoded, "base64").toString("utf-8");
};

export { base64Decode, base64Encode, generateId, generateUUID, hash };
//# sourceMappingURL=crypto.mjs.map
//# sourceMappingURL=crypto.mjs.map