export interface StorageConfig {
    type?: 'localStorage' | 'sessionStorage' | 'memory' | 'none';
    key?: string;
    ttl?: number;
}
export interface ToggleStateOptions {
    initialValue?: boolean;
    storage?: StorageConfig;
    onToggle?: (isActive: boolean) => void;
}
export declare function useToggleState({ initialValue, storage, onToggle }?: ToggleStateOptions): {
    isActive: boolean;
    isLoading: boolean;
    toggle: () => void;
    setActive: (value: boolean) => void;
    setIsActive: (newValue: boolean) => void;
};
//# sourceMappingURL=use-toggle-state.d.ts.map