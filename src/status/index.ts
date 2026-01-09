/**
 * Status Utilities
 *
 * Utilitários para tradução e manipulação de status.
 * Agnóstico de domínio - pode ser usado para posts, pedidos, tarefas, etc.
 * Suporte para múltiplos idiomas: pt-BR, en-US, es-ES.
 *
 * @module @rainersoft/utils/status
 * @author Rainer Teixeira
 */

import type { Locale } from '../types';
import { DEFAULT_LOCALE } from '../types';

/**
 * Status genéricos de entidades
 */
export type GenericStatus =
  | 'DRAFT'
  | 'PENDING'
  | 'PUBLISHED'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'ARCHIVED'
  | 'DELETED'
  | 'SCHEDULED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'APPROVED'
  | 'REJECTED';

/**
 * Traduções de status por idioma
 */
const STATUS_TRANSLATIONS: Record<Locale, Record<string, string>> = {
  'pt-BR': {
  // Estados de conteúdo
  DRAFT: 'Rascunho',
  PUBLISHED: 'Publicado',
  ARCHIVED: 'Arquivado',
  SCHEDULED: 'Agendado',
  DELETED: 'Excluído',
  
  // Estados de processo
  PENDING: 'Pendente',
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
  COMPLETED: 'Concluído',
  CANCELLED: 'Cancelado',
  
  // Estados de aprovação
  APPROVED: 'Aprovado',
  REJECTED: 'Rejeitado',
  
  // Estados de pedido/pagamento
  PROCESSING: 'Processando',
  PAID: 'Pago',
  UNPAID: 'Não Pago',
  REFUNDED: 'Reembolsado',
  FAILED: 'Falhou',
  
    // Estados de usuário
    VERIFIED: 'Verificado',
    UNVERIFIED: 'Não Verificado',
    BANNED: 'Banido',
    SUSPENDED: 'Suspenso',
  },
  'en-US': {
    DRAFT: 'Draft',
    PUBLISHED: 'Published',
    ARCHIVED: 'Archived',
    SCHEDULED: 'Scheduled',
    DELETED: 'Deleted',
    PENDING: 'Pending',
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
    PROCESSING: 'Processing',
    PAID: 'Paid',
    UNPAID: 'Unpaid',
    REFUNDED: 'Refunded',
    FAILED: 'Failed',
    VERIFIED: 'Verified',
    UNVERIFIED: 'Unverified',
    BANNED: 'Banned',
    SUSPENDED: 'Suspended',
  },
  'es-ES': {
    DRAFT: 'Borrador',
    PUBLISHED: 'Publicado',
    ARCHIVED: 'Archivado',
    SCHEDULED: 'Programado',
    DELETED: 'Eliminado',
    PENDING: 'Pendiente',
    ACTIVE: 'Activo',
    INACTIVE: 'Inactivo',
    COMPLETED: 'Completado',
    CANCELLED: 'Cancelado',
    APPROVED: 'Aprobado',
    REJECTED: 'Rechazado',
    PROCESSING: 'Procesando',
    PAID: 'Pagado',
    UNPAID: 'No Pagado',
    REFUNDED: 'Reembolsado',
    FAILED: 'Fallido',
    VERIFIED: 'Verificado',
    UNVERIFIED: 'No Verificado',
    BANNED: 'Bloqueado',
    SUSPENDED: 'Suspendido',
  },
} as const;

/**
 * Traduz status com suporte a idiomas
 *
 * @param status - Status em inglês (uppercase)
 * @param locale - Idioma (padrão: 'pt-BR')
 * @returns Status traduzido
 *
 * @example
 * translateStatus('DRAFT') // 'Rascunho' (pt-BR)
 * translateStatus('DRAFT', 'en-US') // 'Draft'
 * translateStatus('DRAFT', 'es-ES') // 'Borrador'
 */
export function translateStatus(status: string, locale: Locale = DEFAULT_LOCALE): string {
  const normalized = status.toUpperCase();
  return STATUS_TRANSLATIONS[locale][normalized] || status;
}

/**
 * Obtém cor baseada no status
 *
 * @param status - Status
 * @returns Classe Tailwind de cor
 *
 * @example
 * getStatusColor('PUBLISHED') // 'text-green-600'
 * getStatusColor('DRAFT') // 'text-gray-600'
 */
export function getStatusColor(status: string): string {
  const normalized = status.toUpperCase();
  
  const colorMap: Record<string, string> = {
    DRAFT: 'text-gray-600',
    PENDING: 'text-yellow-600',
    PUBLISHED: 'text-green-600',
    ACTIVE: 'text-green-600',
    INACTIVE: 'text-gray-600',
    ARCHIVED: 'text-orange-600',
    DELETED: 'text-red-600',
    SCHEDULED: 'text-blue-600',
    COMPLETED: 'text-green-600',
    CANCELLED: 'text-red-600',
    APPROVED: 'text-green-600',
    REJECTED: 'text-red-600',
    FAILED: 'text-red-600',
    VERIFIED: 'text-green-600',
    BANNED: 'text-red-600',
  };
  
  return colorMap[normalized] || 'text-gray-600';
}

/**
 * Obtém badge variant baseado no status
 *
 * @param status - Status
 * @returns Variant do badge
 *
 * @example
 * getStatusVariant('PUBLISHED') // 'success'
 * getStatusVariant('DRAFT') // 'secondary'
 */
export function getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  const normalized = status.toUpperCase();
  
  if (['PUBLISHED', 'ACTIVE', 'COMPLETED', 'APPROVED', 'VERIFIED'].includes(normalized)) {
    return 'default'; // Verde/sucesso
  }
  
  if (['DELETED', 'CANCELLED', 'REJECTED', 'FAILED', 'BANNED'].includes(normalized)) {
    return 'destructive'; // Vermelho/erro
  }
  
  if (['DRAFT', 'INACTIVE', 'ARCHIVED'].includes(normalized)) {
    return 'secondary'; // Cinza/neutro
  }
  
  return 'outline'; // Padrão
}

/**
 * Traduz status de posts do blog (alias para translateStatus)
 * Mantém compatibilidade com código legado
 *
 * @param status - Status do post (draft, published, archived, etc)
 * @param locale - Idioma (padrão: 'pt-BR')
 * @returns Status traduzido
 *
 * @example
 * translatePostStatus('draft') // 'Rascunho'
 * translatePostStatus('published') // 'Publicado'
 * translatePostStatus('pending_review') // 'Aguardando Revisão'
 */
export function translatePostStatus(status: string, locale: Locale = DEFAULT_LOCALE): string {
  // Mapeamento de status específicos de posts
  const postStatusMap: Record<string, string> = {
    'draft': 'DRAFT',
    'published': 'PUBLISHED',
    'archived': 'ARCHIVED',
    'scheduled': 'SCHEDULED',
    'pending_review': 'PENDING',
  };
  
  // Normaliza o status (lowercase com underscores para uppercase)
  const normalized = postStatusMap[status.toLowerCase()] || status.toUpperCase();
  
  // Traduções específicas para pending_review
  if (status.toLowerCase() === 'pending_review') {
    const translations = {
      'pt-BR': 'Aguardando Revisão',
      'en-US': 'Pending Review',
      'es-ES': 'Pendiente de Revisión'
    };
    return translations[locale] || translations['pt-BR'];
  }
  
  return translateStatus(normalized, locale);
}
