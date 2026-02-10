export declare function formatDate(date: string | Date, format?: 'short' | 'long' | 'full'): string;
export declare function formatDateTime(date: string | Date): string;
export declare function formatRelativeDate(date: string | Date): string;
export declare function formatCurrency(value: number, options?: Intl.NumberFormatOptions): string;
export declare function formatNumber(value: number, decimals?: number): string;
export declare function formatCompact(value: number, decimals?: number): string;
export declare function translateStatus(status: string): string;
declare const _default: {
    formatDate: typeof formatDate;
    formatDateTime: typeof formatDateTime;
    formatRelativeDate: typeof formatRelativeDate;
    formatCurrency: typeof formatCurrency;
    formatNumber: typeof formatNumber;
    formatCompact: typeof formatCompact;
    translateStatus: typeof translateStatus;
};
export default _default;
//# sourceMappingURL=pt-br.d.ts.map