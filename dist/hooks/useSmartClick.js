import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce, useThrottle } from '../utils/helper';
export function useSmartClick({ onClick, debounceMs, throttleMs, onDebounceStart, onThrottleStart, }) {
    const [isDebounced, setIsDebounced] = useState(false);
    const [isThrottled, setIsThrottled] = useState(false);
    const baseClick = useCallback(() => {
        onClick?.();
    }, [onClick]);
    // Throttle with live callback
    const throttledHandler = useThrottle(() => {
        setIsThrottled(true);
        onThrottleStart?.();
        baseClick();
        setTimeout(() => setIsThrottled(false), throttleMs);
    }, throttleMs || 0);
    // Debounce handler (stable ref that updates)
    const debouncedHandlerRef = useRef(() => { });
    useEffect(() => {
        debouncedHandlerRef.current = debounce(() => {
            setIsDebounced(true);
            onDebounceStart?.();
            baseClick();
            setTimeout(() => setIsDebounced(false), debounceMs);
        }, debounceMs || 0);
    }, [baseClick, debounceMs, onDebounceStart]);
    // Final click handler
    const handler = useCallback(() => {
        if (debounceMs) {
            debouncedHandlerRef.current();
        }
        else if (throttleMs) {
            throttledHandler();
        }
        else {
            baseClick();
        }
    }, [debounceMs, throttleMs, throttledHandler, baseClick]);
    return {
        handler,
        isDebounced,
        isThrottled,
        isLocked: isDebounced || isThrottled,
    };
}
