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



/**
 * Checks whether the given password has been exposed in known data breaches,
 * using the Have I Been Pwned Pwned Passwords API with k-Anonymity model.
 *
 * This function is privacy-safe: only the first 5 characters of the SHA-1 hash
 * of the password are sent to the API, and the rest is checked locally.
 *
 * @param {string} password - The plain-text password to check.
 * @returns {Promise<boolean>} - Returns a Promise that resolves to `true` if the password is found
 *                                in a known breach, otherwise `false`.
 *
 * @example
 * const leaked = await isPasswordPwned("P@ssw0rd123");
 * if (leaked) {
 *   console.warn("This password has been compromised in a data breach.");
 * }
 *
 * @see https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange
 */
export async function isPasswordPwned(password: string): Promise<boolean> {
    const sha1 = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(password));
    const hash = Array.from(new Uint8Array(sha1)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await res.text();
    return text.includes(suffix);
}