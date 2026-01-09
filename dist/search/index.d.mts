interface SearchOptions {
    fields?: string[];
    caseSensitive?: boolean;
    exactMatch?: boolean;
}
declare function searchContent<T extends Record<string, any>>(query: string, content: T[], options?: SearchOptions): T[];
declare function searchWithScore<T extends Record<string, any>>(query: string, content: T[], options?: SearchOptions): T[];
declare function fuzzySearch<T extends Record<string, any>>(query: string, content: T[], options?: SearchOptions & {
    threshold?: number;
}): T[];

export { type SearchOptions, fuzzySearch, searchContent, searchWithScore };
