// src/error/index.ts
function formatError(error) {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return String(error);
}
function isError(error) {
  return error instanceof Error;
}
function createError(message, context) {
  const error = new Error(message);
  if (context) {
    error.context = context;
  }
  return error;
}
function validateEmailSimple(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export { createError, formatError, isError, validateEmailSimple };
//# sourceMappingURL=error.mjs.map
//# sourceMappingURL=error.mjs.map