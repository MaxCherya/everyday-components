export declare function debounce(fn: (...args: any[]) => void, delay: number): (...args: any[]) => void;
export declare function useThrottle<T extends (...args: any[]) => void>(fn: T, limit: number): T;
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
export declare function isPasswordPwned(password: string): Promise<boolean>;
/**
 * Options to configure password strength evaluation rules.
 */
export interface PasswordStrengthOptions {
    /** Minimum number of characters required (default: 8) */
    minChars?: number;
    /** Maximum number of characters allowed (not used in scoring) */
    maxChars?: number;
    /** Require at least one uppercase character (default: true) */
    uppercaseRequired?: boolean;
    /** Require at least one lowercase character (default: true) */
    lowercaseRequired?: boolean;
    /** Require at least one digit (default: true) */
    digitRequired?: boolean;
    /** Require at least one special character (default: true) */
    specialCharRequired?: boolean;
    /** Disallow repeated characters (e.g. "aa", "11") (default: true) */
    noRepeatingChars?: boolean;
    /** Disallow spaces (default: true) */
    noSpaces?: boolean;
    /** Disallow sequential characters (e.g. "abc", "123") (default: true) */
    noSequences?: boolean;
    /** Disallow common keyboard sequences (e.g. "qwe", "asd", "zxc") (default: true) */
    noKeyboardSequences?: boolean;
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
export declare function getPasswordStrength(password: string, options?: PasswordStrengthOptions): {
    score: number;
    label: 'Too Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
};
export interface DisifyResponse {
    format: boolean;
    dns: boolean;
    disposable: boolean;
    webmail: boolean;
    mx: boolean;
    domain: string;
    email: string;
}
export declare function checkEmail(email: string): Promise<DisifyResponse | null>;
