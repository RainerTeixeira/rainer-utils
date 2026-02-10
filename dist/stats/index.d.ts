export declare function formatCompactNumber(num: number): string;
export declare function calculateChange(current: number, previous: number): number;
export declare function formatPercentage(value: number, options?: {
    showSign?: boolean;
    decimals?: number;
}): string;
export declare function generateMockChartData(days: number, locale?: string): Array<Record<string, any>>;
export declare function groupDataByPeriod<T extends Record<string, any>>(data: T[]): T[];
export declare function calculateMovingAverage(data: number[], window: number): number[];
export declare function findMinMax<T extends Record<string, any>>(data: T[], field: keyof T): {
    min: number;
    max: number;
};
//# sourceMappingURL=index.d.ts.map