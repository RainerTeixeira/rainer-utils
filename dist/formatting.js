'use strict';

// src/formatting/index.ts
var formatCEP = (cep) => {
  cep = cep.replace(/\D/g, "");
  return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
};

exports.formatCEP = formatCEP;
//# sourceMappingURL=formatting.js.map
//# sourceMappingURL=formatting.js.map