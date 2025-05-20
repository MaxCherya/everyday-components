import { useCallback, useRef } from "react";

export function debounce(fn: (...args: any[]) => void, delay: number) {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}



export function useThrottle<T extends (...args: any[]) => void>(fn: T, limit: number): T {
    const lastCallRef = useRef<number>(0);

    return useCallback((...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastCallRef.current >= limit) {
            lastCallRef.current = now;
            fn(...args);
        }
    }, [fn, limit]) as T;
}