import React, { useState, type ElementType, type ReactNode } from 'react';
import { getColors } from '../../../utils/colorUtils';

export interface GeneralButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'custom';
    isLoading?: boolean;
    fullWidth?: boolean;
    iconRight?: ReactNode | string;
    iconLeft?: ReactNode | string;
    disabled?: boolean;
    as?: 'button' | 'a' | ElementType;
    href?: string; // required if `as: 'a'`
    target?: string;
    customSpinner?: ReactNode;
    ariaLabel?: string;
    debounceMs?: number; // in ms
    customPrimaryColor?: string; // in hex
    customSecondaryColor?: string; // in hex
    onClick?: () => void;
    className?: string;
}

const GeneralButton: React.FC<GeneralButtonProps> = ({
    variant = 'primary',
    size = 'base',
    isLoading = false,
    fullWidth = false,
    iconLeft,
    iconRight,
    disabled = false,
    as: Component = 'button',
    href,
    target,
    customSpinner,
    ariaLabel,
    debounceMs,
    customPrimaryColor,
    customSecondaryColor,
    onClick,
    className = '',
    children,
    ...rest
}) => {

    // ===================================== STATES ================================= //
    const [colorStyle, _setColorStyle] = useState(() => getColors(customPrimaryColor, customSecondaryColor));
    const [isHover, setIsHover] = useState(false);
    // ============================================================================== //


    // ===================================== FUNCS ================================== //
    // ============================================================================== //


    // ================================= OBJECTS ================================== //
    const sizes = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
        custom: ''
    }

    const styles = {
        primary: {
            first_backgroundColor: colorStyle.primaryStyle.backgroundColor,
            second_backgroundColor: colorStyle.secondaryStyle.backgroundColor,
            first_color: colorStyle.primaryStyle.color,
            second_color: colorStyle.secondaryStyle.color,
            first_hover: colorStyle.primaryHover,
            second_hover: colorStyle.secondaryHover
        },
        secondary: {
            first_backgroundColor: colorStyle.secondaryStyle.backgroundColor,
            second_backgroundColor: colorStyle.primaryStyle.backgroundColor,
            first_color: colorStyle.secondaryStyle.color,
            second_color: colorStyle.primaryStyle.color,
            first_hover: colorStyle.secondaryHover,
            second_hover: colorStyle.primaryHover
        },
    };

    // ============================================================================ //


    return (
        <Component
            disabled={disabled}
            href={Component === 'a' ? href : undefined}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            target={target}
            className={`px-2 py-1 ${fullWidth ? 'w-full' : ''} ${sizes[size]} ${className} ${disabled ? 'cursor-not-allowed bg-gray-500 text-gray-400' : 'cursor-pointer'}`}
            aria-label={ariaLabel}
            style={{
                backgroundColor: isHover
                    ? styles[variant].second_backgroundColor
                    : styles[variant].first_backgroundColor,

                color: isHover
                    ? styles[variant].second_color
                    : styles[variant].first_color,

                border: `1px solid ${isHover
                    ? styles[variant].first_backgroundColor
                    : styles[variant].second_backgroundColor
                    }`,

                transition: 'all 0.2s ease-in-out',
            }}

            {...rest}
        >
            {iconLeft && <span className={`mr-2 ${sizes[size]}`}>{iconLeft}</span>}
            {children}{isLoading && '...'}
            {iconRight && <span className={`ml-2 ${sizes[size]}`}>{iconRight}</span>}
        </Component>
    );
};

export default GeneralButton;