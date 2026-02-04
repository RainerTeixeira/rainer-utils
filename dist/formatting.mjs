// src/formatting/index.ts
var formatCEP = (cep) => {
  cep = cep.replace(/\D/g, "");
  return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
};

export { formatCEP };
//# sourceMappingURL=formatting.mjs.map
//# sourceMappingURL=formatting.mjs.map