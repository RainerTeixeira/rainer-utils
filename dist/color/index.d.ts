export declare function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
};
export declare function rgbToHex(r: number, g: number, b: number): string;
export declare function hexToHsl(hex: string): {
    h: number;
    s: number;
    l: number;
};
export declare function hslToHex(h: number, s: number, l: number): string;
export declare function adjustBrightness(hex: string, amount: number): string;
export declare function adjustSaturation(hex: string, amount: number): string;
export declare function adjustHue(hex: string, degrees: number): string;
export declare function lighten(hex: string, amount: number): string;
export declare function darken(hex: string, amount: number): string;
export declare function hexToRgba(hex: string, alpha: number): string;
export declare function getComplementary(hex: string): string;
export declare function getAnalogousPalette(hex: string, count?: number): string[];
//# sourceMappingURL=index.d.ts.map