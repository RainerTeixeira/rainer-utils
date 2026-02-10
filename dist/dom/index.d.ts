export declare function prefersReducedMotion(): boolean;
export declare function onReducedMotionChange(callback: (prefersReduced: boolean) => void): () => void;
export declare function scrollToPosition(x?: number, y?: number, options?: {
    smooth?: boolean;
    behavior?: ScrollBehavior;
}): void;
export declare function scrollToTop(smooth?: boolean): void;
export declare function smoothScrollTo(x: number, y: number, duration?: number): void;
export declare function scrollToElement(element: string | Element, options?: {
    smooth?: boolean;
    offset?: number;
    behavior?: ScrollBehavior;
}): void;
export declare function isElementVisible(element: string | Element, threshold?: number): boolean;
export declare function getElementPosition(element: string | Element): {
    x: number;
    y: number;
} | null;
export declare function isMobile(): boolean;
export declare function isDarkMode(): boolean;
export declare function onDarkModeChange(callback: (isDark: boolean) => void): () => void;
export declare function copyToClipboard(text: string): Promise<boolean>;
export declare function downloadFile(blob: Blob, filename: string): void;
//# sourceMappingURL=index.d.ts.map