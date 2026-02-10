export interface SearchOptions {
    fields?: string[];
    caseSensitive?: boolean;
    exactMatch?: boolean;
}
export declare function searchContent<T extends Record<string, any>>(query: string, content: T[], options?: SearchOptions): T[];
export declare function searchWithScore<T extends Record<string, any>>(query: string, content: T[], options?: SearchOptions): T[];
export declare function fuzzySearch<T extends Record<string, any>>(query: string, content: T[], options?: SearchOptions & {
    threshold?: number;
}): T[];
//# sourceMappingURL=index.d.ts.map