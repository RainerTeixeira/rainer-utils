export interface CounterOptions {
    initialValue?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: number, delta: number) => void;
}
export declare function useCounter({ initialValue, min, max, step, onChange }?: CounterOptions): {
    count: number;
    increment: () => void;
    decrement: () => void;
    set: (value: number) => void;
    reset: () => void;
    canIncrement: boolean;
    canDecrement: boolean;
    isAtMin: boolean;
    isAtMax: boolean;
};
//# sourceMappingURL=use-counter.d.ts.map