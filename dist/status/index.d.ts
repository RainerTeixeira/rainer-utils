import { L as Locale } from '../types-tUMATEGI.js';

type GenericStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | 'DELETED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'APPROVED' | 'REJECTED';
declare function translateStatus(status: string, locale?: Locale): string;
declare function getStatusColor(status: string): string;
declare function getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline';

export { type GenericStatus, getStatusColor, getStatusVariant, translateStatus };
