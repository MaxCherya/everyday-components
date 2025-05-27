export declare function hexToRgb(hex: string): [number, number, number];
export declare function rgbToHex(r: number, g: number, b: number): string;
export declare function adjustBrightness(hex: string, amount: number): string;
export declare function getComplementary(hex: string): string;
export declare function isLightColor(hex: string): boolean;
export declare function getDisabledStyleFrom(baseColor: string): React.CSSProperties;
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
export declare const getColors: (customPrimaryColor?: string, customSecondaryColor?: string) => {
    primaryStyle: React.CSSProperties;
    secondaryStyle: React.CSSProperties;
    primaryHover?: string;
    secondaryHover?: string;
    disabledStyle: React.CSSProperties;
};
