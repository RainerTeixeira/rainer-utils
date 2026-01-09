import { L as Locale } from './types-tUMATEGI.mjs';

type GenericStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | 'DELETED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'APPROVED' | 'REJECTED';
declare function translateStatus(status: string, locale?: Locale): string;
declare function getStatusColor(status: string): string;
declare function getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline';
declare function translatePostStatus(status: string, locale?: Locale): string;

type statusModule_GenericStatus = GenericStatus;
declare const statusModule_getStatusColor: typeof getStatusColor;
declare const statusModule_getStatusVariant: typeof getStatusVariant;
declare const statusModule_translatePostStatus: typeof translatePostStatus;
declare const statusModule_translateStatus: typeof translateStatus;
declare namespace statusModule {
  export { type statusModule_GenericStatus as GenericStatus, statusModule_getStatusColor as getStatusColor, statusModule_getStatusVariant as getStatusVariant, statusModule_translatePostStatus as translatePostStatus, statusModule_translateStatus as translateStatus };
}

export { type GenericStatus as G, getStatusVariant as a, translatePostStatus as b, getStatusColor as g, statusModule as s, translateStatus as t };
