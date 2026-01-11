declare function textToSlug(text: string): string;
declare function capitalize(text: string): string;
declare function truncate(text: string, maxLength: number, suffix?: string): string;
declare function removeAccents(text: string): string;
declare function getInitials(name: string, maxInitials?: number): string;
declare function isEmpty(text: string | null | undefined): boolean;
declare function wordCount(text: string): number;
declare function formatPhone(phone: string): string;
declare function formatCPF(cpf: string): string;
declare function formatCNPJ(cnpj: string): string;
declare function isCPF(cpf: string): boolean;
declare function isCNPJ(cnpj: string): boolean;

export { capitalize, formatCNPJ, formatCPF, formatPhone, getInitials, isCNPJ, isCPF, isEmpty, removeAccents, textToSlug, truncate, wordCount };
