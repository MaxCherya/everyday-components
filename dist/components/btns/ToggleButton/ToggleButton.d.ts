import React, { type ReactNode } from "react";
export interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'custom';
    isLoading?: boolean;
    fullWidth?: boolean;
    iconRight?: ReactNode | string;
    iconLeft?: ReactNode | string;
    iconRightAfter?: ReactNode | string;
    iconLeftAfter?: ReactNode | string;
    isToggled: boolean;
    offLabel: string;
    noOutlines?: boolean;
    customPrimaryColor?: string;
    customSecondaryColor?: string;
    debounceMs?: number;
    throttleMs?: number;
    onClick?: () => void;
    onThrottleStart?: () => void;
    onDebounceStart?: () => void;
    className?: string;
}
declare const ToggleButton: React.FC<ToggleButtonProps>;
export default ToggleButton;
