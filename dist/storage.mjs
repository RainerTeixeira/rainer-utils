var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);

// src/storage/index.ts
var MemoryStorage = class {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  async getItem(key) {
    return this.store.get(key) || null;
  }
  async setItem(key, value) {
    this.store.set(key, value);
  }
  async removeItem(key) {
    this.store.delete(key);
  }
  async clear() {
    this.store.clear();
  }
};
var createStorage = (prefix = "rainersoft") => {
  if (typeof window !== "undefined" && window.localStorage) {
    return {
      async getItem(key) {
        return localStorage.getItem(`${prefix}:${key}`);
      },
      async setItem(key, value) {
        localStorage.setItem(`${prefix}:${key}`, value);
      },
      async removeItem(key) {
        localStorage.removeItem(`${prefix}:${key}`);
      },
      async clear() {
        const keys = Object.keys(localStorage).filter((k) => k.startsWith(`${prefix}:`));
        keys.forEach((k) => localStorage.removeItem(k));
      }
    };
  }
  return new MemoryStorage();
};

export { MemoryStorage, createStorage };
//# sourceMappingURL=storage.mjs.map
//# sourceMappingURL=storage.mjs.map