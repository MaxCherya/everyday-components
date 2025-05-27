export interface UseSmartClickOptions {
    onClick?: () => void;
    debounceMs?: number;
    throttleMs?: number;
    onDebounceStart?: () => void;
    onThrottleStart?: () => void;
}
export declare function useSmartClick({ onClick, debounceMs, throttleMs, onDebounceStart, onThrottleStart, }: UseSmartClickOptions): {
    handler: () => void;
    isDebounced: boolean;
    isThrottled: boolean;
    isLocked: boolean;
};
