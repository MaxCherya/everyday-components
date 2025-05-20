import React, { useEffect, useState, type ElementType, type ReactNode } from 'react';
import { getColors } from '../../../utils/colorUtils';
import { useSmartClick } from '../../../hooks/useSmartClick';

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
    ariaLabel?: string;
    debounceMs?: number; // in ms
    throttleMs?: number; // in ms
    customPrimaryColor?: string; // in hex
    customSecondaryColor?: string; // in hex
    onClick?: () => void;
    onThrottleStart?: () => void;
    onDebounceStart?: () => void;
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
    ariaLabel,
    debounceMs,
    throttleMs,
    customPrimaryColor,
    customSecondaryColor,
    onClick,
    onThrottleStart,
    onDebounceStart,
    className = '',
    children,
    ...rest
}) => {

    // ===================================== STATES ================================= //
    const [isHover, setIsHover] = useState(false);
    const [dots, setDots] = useState(1);
    const [_time, setTime] = useState(new Date())
    const colorStyle = getColors(customPrimaryColor, customSecondaryColor);
    // ============================================================================== //


    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            setTime(new Date());

            setDots((prev) => (prev >= 3 ? 1 : prev + 1));
        }, 500);

        return () => clearInterval(interval);
    }, [isLoading]);


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

    const { handler: clickHandler, isThrottled, isDebounced, isLocked } = useSmartClick({ onClick, debounceMs, throttleMs, onDebounceStart, onThrottleStart });

    return (
        <Component
            disabled={disabled || isLoading || isLocked}
            href={Component === 'a' ? href : undefined}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            target={target}
            onClick={clickHandler}
            className={`px-4 py-1 ${fullWidth ? 'w-full' : ''} ${sizes[size]} ${className} ${disabled || isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            aria-label={ariaLabel}
            style={
                disabled || isLoading || isLocked
                    ? colorStyle.disabledStyle
                    : {
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
                        cursor: 'pointer',
                        opacity: 1,
                        transition: 'all 0.2s ease-in-out',
                    }
            }

            {...rest}
        >
            {iconLeft && <span className={`mr-2 ${sizes[size]}`}>{iconLeft}</span>}
            {children}
            {iconRight && <span className={`ml-2 ${sizes[size]}`}>{iconRight}</span>}
            {isLoading || isDebounced || isThrottled &&
                <span className="inline-block w-[1.5ch] ml-2 text-left align-middle">
                    {Array.from({ length: dots }).map((_, index) => (
                        <span key={index}>.</span>
                    ))}
                </span>
            }
        </Component>
    );
};

export default GeneralButton;