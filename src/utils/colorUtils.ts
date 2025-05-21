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


export function getDisabledStyleFrom(baseColor: string): React.CSSProperties {
    const disabledBg = adjustBrightness(baseColor, +30);
    const disabledText = isLightColor(disabledBg) ? '#9ca3af' : '#d1d5db';
    const border = adjustBrightness(baseColor, +50);

    return {
        backgroundColor: disabledBg,
        color: disabledText,
        border: `1px solid ${border}`,
        cursor: 'not-allowed',
        opacity: 0.6,
    };
}



/**
 * Function to determine the best matching Tailwind-style inline color styles
 * using complementary or default rules based on user input.
 *
 * Accepts:
 * - customPrimaryColor (hex string)
 * - customSecondaryColor (hex string)
 *
 * Returns:
 * - primaryStyle: inline style object for primary button
 * - secondaryStyle: inline style object for secondary button
 * - primaryHover: backgroundColor (string) for hover
 * - secondaryHover: backgroundColor (string) for hover
 * - disabledStyle: includes 4 css propertires to overwrite during disabled process
 */
export const getColors = (
    customPrimaryColor?: string,
    customSecondaryColor?: string
): {
    primaryStyle: React.CSSProperties;
    secondaryStyle: React.CSSProperties;
    primaryHover?: string;
    secondaryHover?: string;
    disabledStyle: React.CSSProperties;
} => {
    // Scenario 1: Only Primary
    if (customPrimaryColor && !customSecondaryColor) {
        const secondaryColor = getComplementary(customPrimaryColor);
        const primaryHover = adjustBrightness(customPrimaryColor, -20);
        const secondaryHover = adjustBrightness(secondaryColor, -20);
        const primaryText = isLightColor(customPrimaryColor) ? '#000' : '#fff';
        const secondaryText = isLightColor(secondaryColor) ? '#000' : '#fff';

        return {
            primaryStyle: { backgroundColor: customPrimaryColor, color: primaryText },
            secondaryStyle: { backgroundColor: secondaryColor, color: secondaryText },
            primaryHover,
            secondaryHover,
            disabledStyle: getDisabledStyleFrom(customPrimaryColor),
        };
    }

    // Scenario 2: Only Secondary
    if (!customPrimaryColor && customSecondaryColor) {
        const primaryColor = getComplementary(customSecondaryColor);
        const secondaryHover = adjustBrightness(customSecondaryColor, -20);
        const primaryHover = adjustBrightness(primaryColor, -20);
        const primaryText = isLightColor(primaryColor) ? '#000' : '#fff';
        const secondaryText = isLightColor(customSecondaryColor) ? '#000' : '#fff';

        return {
            primaryStyle: { backgroundColor: primaryColor, color: primaryText },
            secondaryStyle: { backgroundColor: customSecondaryColor, color: secondaryText },
            primaryHover,
            secondaryHover,
            disabledStyle: getDisabledStyleFrom(primaryColor),
        };
    }

    // Scenario 3: Both Provided
    if (customPrimaryColor && customSecondaryColor) {
        const primaryHover = adjustBrightness(customPrimaryColor, -20);
        const secondaryHover = adjustBrightness(customSecondaryColor, -20);
        const primaryText = isLightColor(customPrimaryColor) ? '#000' : '#fff';
        const secondaryText = isLightColor(customSecondaryColor) ? '#000' : '#fff';

        return {
            primaryStyle: { backgroundColor: customPrimaryColor, color: primaryText },
            secondaryStyle: { backgroundColor: customSecondaryColor, color: secondaryText },
            primaryHover,
            secondaryHover,
            disabledStyle: getDisabledStyleFrom(customPrimaryColor),
        };
    }

    // Default
    return {
        primaryStyle: { backgroundColor: '#2563eb', color: '#fff' },
        secondaryStyle: { backgroundColor: '#e5e7eb', color: '#000' },
        primaryHover: '#1e40af',
        secondaryHover: '#d1d5db',
        disabledStyle: getDisabledStyleFrom('#2563eb'),
    };
};