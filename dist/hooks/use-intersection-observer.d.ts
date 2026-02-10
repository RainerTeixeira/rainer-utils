interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    rootMargin?: string;
    root?: Element | null;
    freezeOnceVisible?: boolean;
}
interface UseIntersectionObserverResult {
    isIntersecting: boolean;
    targetRef: React.RefObject<Element | null>;
    entry?: IntersectionObserverEntry;
}
export declare function useIntersectionObserver(options?: UseIntersectionObserverOptions): UseIntersectionObserverResult;
export {};
//# sourceMappingURL=use-intersection-observer.d.ts.map