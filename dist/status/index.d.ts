import type { Locale } from '../types';
export type GenericStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | 'DELETED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'APPROVED' | 'REJECTED';
export declare function translateStatus(status: string, locale?: Locale): string;
export declare function getStatusColor(status: string): string;
export declare function getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline';
export declare function translatePostStatus(status: string, locale?: Locale): string;
//# sourceMappingURL=index.d.ts.map