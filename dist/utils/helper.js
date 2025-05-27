import { useCallback, useRef } from "react";
export function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
export function useThrottle(fn, limit) {
    const lastCallRef = useRef(0);
    return useCallback((...args) => {
        const now = Date.now();
        if (now - lastCallRef.current >= limit) {
            lastCallRef.current = now;
            fn(...args);
        }
    }, [fn, limit]);
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
export async function isPasswordPwned(password) {
    const sha1 = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(password));
    const hash = Array.from(new Uint8Array(sha1)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await res.text();
    return text.includes(suffix);
}
/**
 * Evaluates the strength of a given password and returns a score and label.
 * The score is based on length, character diversity, and avoidance of weak patterns.
 *
 * @param password - The password string to evaluate.
 * @param options - Optional configuration for what rules to enforce.
 * @returns An object containing:
 *  - `score`: A number from 0 (Too Weak) to 4 (Very Strong).
 *  - `label`: A human-readable label: 'Too Weak', 'Weak', 'Medium', 'Strong', or 'Very Strong'.
 *
 * @example
 * const result = getPasswordStrength("MyP@ssw0rd123");
 * console.log(result.label); // 'Strong'
 * console.log(result.score); // 3
 */
export function getPasswordStrength(password, options = {}) {
    const { minChars = 8, uppercaseRequired = true, lowercaseRequired = true, digitRequired = true, specialCharRequired = true, noRepeatingChars = true, noSpaces = true, noSequences = true, noKeyboardSequences = true } = options;
    let score = 0;
    if (password.length >= minChars)
        score++;
    if (password.length >= 12)
        score++;
    if (/[A-Z]/.test(password) || !uppercaseRequired)
        score++;
    if (/[a-z]/.test(password) || !lowercaseRequired)
        score++;
    if (/[0-9]/.test(password) || !digitRequired)
        score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password) || !specialCharRequired)
        score++;
    // Deduct for common weaknesses
    if (/(.)\1/.test(password) && noRepeatingChars)
        score--;
    if (/[' ']/.test(password) && noSpaces)
        score--;
    if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789)/i.test(password) && noSequences)
        score--;
    if (/(qwe|wer|ert|rty|tyu|yui|uio|asd|sdf|dfg|fgh|ghj|hjk|jkl|zxc|xcv|cvb|vbn|bnm|qwerty|asdf|zxcv)/i.test(password) && noKeyboardSequences)
        score--;
    const normalizedScore = Math.max(0, Math.min(score, 4));
    const labels = ['Too Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
    const label = labels[normalizedScore];
    return { score: normalizedScore, label };
}
export async function checkEmail(email) {
    try {
        const res = await fetch(`https://disify.com/api/email/${email}`);
        if (!res.ok) {
            console.warn("Email validation failed with status", res.status);
            return null;
        }
        return await res.json();
    }
    catch (error) {
        console.error("Error checking email:", error);
        return null;
    }
}
