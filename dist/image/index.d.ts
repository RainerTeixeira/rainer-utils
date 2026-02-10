export declare function isAcceptedFormat(mimeType: string): boolean;
export declare function isWebP(mimeType: string): boolean;
export declare function supportsWebP(): Promise<boolean>;
export declare function getImageInfo(file: File): Promise<{
    width: number;
    height: number;
    size: number;
    type: string;
}>;
export declare function resizeImage(file: File, maxWidth: number, maxHeight: number, quality?: number, format?: 'image/jpeg' | 'image/png' | 'image/webp'): Promise<File>;
export declare function convertToWebP(file: File, quality?: number): Promise<File>;
export declare function prepareImageForUpload(file: File, options?: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    shouldConvertToWebP?: boolean;
    maxSizeBytes?: number;
}): Promise<File>;
export declare function generatePlaceholder(width: number, height: number, text?: string): string;
//# sourceMappingURL=index.d.ts.map