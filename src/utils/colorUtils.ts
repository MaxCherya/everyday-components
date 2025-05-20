// UTILS FOR COLORS OPERATIONS


export function hexToRgb(hex: string): [number, number, number] {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
}


export function rgbToHex(r: number, g: number, b: number): string {
    return (
        '#' +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('')
    );
}


export function adjustBrightness(hex: string, amount: number): string {
    const [r, g, b] = hexToRgb(hex);

    const adjust = (channel: number) =>
        Math.max(0, Math.min(255, channel + amount));

    return rgbToHex(adjust(r), adjust(g), adjust(b));
}


export function getComplementary(hex: string): string {
    const [r, g, b] = hexToRgb(hex);
    return rgbToHex(255 - r, 255 - g, 255 - b);
}


export function isLightColor(hex: string): boolean {
    const [r, g, b] = hexToRgb(hex);
    // Formula from W3C: https://www.w3.org/TR/AERT/#color-contrast
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
}


/**
 * Function to determine the best matching Tailwind color classes
 * using complementary or default rules based on user input.
 *
 * Accepts:
 * - customPrimaryColor (hex string)
 * - customSecondaryColor (hex string)
 *
 * Returns:
 * - primaryStyle: Tailwind utility string for the primary button
 * - secondaryStyle: Tailwind utility string for the secondary button
 */
export const getColors = (
    customPrimaryColor?: string,
    customSecondaryColor?: string
): {
    primaryStyle: React.CSSProperties;
    secondaryStyle: React.CSSProperties;
    primaryHover?: string;
    secondaryHover?: string;
} => {
    if (customPrimaryColor && !customSecondaryColor) {
        const hover = adjustBrightness(customPrimaryColor, -20);
        const textColor = isLightColor(customPrimaryColor) ? '#000' : '#fff';

        return {
            primaryStyle: { backgroundColor: customPrimaryColor, color: textColor },
            secondaryStyle: { backgroundColor: customPrimaryColor, color: textColor },
            primaryHover: hover,
            secondaryHover: hover,
        };
    }

    // Default
    return {
        primaryStyle: { backgroundColor: '#2563eb', color: '#fff' },
        secondaryStyle: { backgroundColor: '#e5e7eb', color: '#000' },
        primaryHover: '#1e40af',
        secondaryHover: '#d1d5db',
    };
};