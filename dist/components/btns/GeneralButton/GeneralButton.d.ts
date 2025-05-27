import React, { type ElementType, type ReactNode } from 'react';
export interface GeneralButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'custom';
    isLoading?: boolean;
    fullWidth?: boolean;
    iconRight?: ReactNode | string;
    iconLeft?: ReactNode | string;
    disabled?: boolean;
    as?: 'button' | 'a' | ElementType;
    href?: string;
    target?: string;
    ariaLabel?: string;
    noOutlines?: boolean;
    debounceMs?: number;
    throttleMs?: number;
    customPrimaryColor?: string;
    customSecondaryColor?: string;
    onClick?: () => void;
    onThrottleStart?: () => void;
    onDebounceStart?: () => void;
    className?: string;
}
declare const GeneralButton: React.FC<GeneralButtonProps>;
export default GeneralButton;
