/**
 * Error utilities - Utilitários para tratamento de erros
 * 
 * Funções para formatar e manipular objetos de erro
 */

/**
 * Formata um erro para string
 * 
 * @param error - Objeto de erro desconhecido
 * @returns Mensagem de erro formatada como string
 * 
 * @example
 * formatError(new Error('Something went wrong')) // 'Something went wrong'
 * formatError('String error') // 'String error'
 * formatError({ message: 'Custom error' }) // 'Custom error'
 */
export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  
  if (typeof error === 'string') {
    return error
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }
  
  return String(error)
}

/**
 * Verifica se um objeto é um erro
 * 
 * @param error - Objeto a verificar
 * @returns true se for um erro
 * 
 * @example
 * isError(new Error()) // true
 * isError('string') // false
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error
}

/**
 * Cria um erro formatado com contexto
 * 
 * @param message - Mensagem de erro
 * @param context - Contexto adicional
 * @returns Objeto Error com contexto
 * 
 * @example
 * const error = createError('Failed to login', { userId: 123 })
 * console.log(error.message) // 'Failed to login'
 * console.log(error.context) // { userId: 123 }
 */
export function createError(message: string, context?: Record<string, unknown>): Error {
  const error = new Error(message)
  if (context) {
    (error as any).context = context
  }
  return error
}

/**
 * Valida e-mail de forma simples (retorna boolean)
 * 
 * @param email - E-mail a validar
 * @returns true se válido
 * 
 * @example
 * validateEmailSimple('user@example.com') // true
 * validateEmailSimple('invalid') // false
 */
export function validateEmailSimple(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
