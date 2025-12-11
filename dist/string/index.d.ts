declare function textToSlug(text: string): string;
declare function capitalize(text: string): string;
declare function truncate(text: string, maxLength: number, suffix?: string): string;
declare function removeAccents(text: string): string;
declare function getInitials(name: string, maxInitials?: number): string;
declare function isEmpty(text: string | null | undefined): boolean;
declare function wordCount(text: string): number;

export { capitalize, getInitials, isEmpty, removeAccents, textToSlug, truncate, wordCount };
