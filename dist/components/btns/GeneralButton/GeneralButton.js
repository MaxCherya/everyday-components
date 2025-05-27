import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getColors } from '../../../utils/colorUtils';
import { useSmartClick } from '../../../hooks/useSmartClick';
const GeneralButton = ({ variant = 'primary', size = 'base', isLoading = false, fullWidth = false, iconLeft, iconRight, disabled = false, as: Component = 'button', href, target, ariaLabel, noOutlines = false, debounceMs, throttleMs, customPrimaryColor, customSecondaryColor, onClick, onThrottleStart, onDebounceStart, className = '', children, ...rest }) => {
    // ===================================== STATES ================================= //
    const [isHover, setIsHover] = useState(false);
    const [dots, setDots] = useState(1);
    const [_time, setTime] = useState(new Date());
    const colorStyle = getColors(customPrimaryColor, customSecondaryColor);
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
    };
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
    useEffect(() => {
        if (!isLoading && !isDebounced && !isThrottled)
            return;
        const interval = setInterval(() => {
            setTime(new Date());
            setDots((prev) => (prev >= 3 ? 1 : prev + 1));
        }, 500);
        return () => clearInterval(interval);
    }, [isLoading, isThrottled, isDebounced]);
    return (_jsxs(Component, { disabled: disabled || isLoading || isLocked, href: Component === 'a' ? href : undefined, onMouseEnter: () => setIsHover(true), onMouseLeave: () => setIsHover(false), target: target, onClick: clickHandler, className: `relative px-8 py-1 ${fullWidth ? 'w-full' : ''} ${sizes[size]} ${className} ${disabled || isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`, "aria-label": ariaLabel, style: disabled || isLoading || isLocked
            ? colorStyle.disabledStyle
            : {
                backgroundColor: isHover
                    ? variant === 'primary' ? styles[variant].second_hover : styles[variant].first_hover
                    : styles[variant].first_backgroundColor,
                color: isHover
                    ? styles[variant].second_color
                    : styles[variant].first_color,
                border: noOutlines ? '0px' : `1px solid ${isHover
                    ? styles[variant].first_backgroundColor
                    : styles[variant].second_backgroundColor}`,
                cursor: 'pointer',
                opacity: 1,
                transition: 'all 0.2s ease-in-out',
            }, ...rest, children: [iconLeft && _jsx("span", { className: `mr-2 ${sizes[size]}`, children: iconLeft }), children, iconRight && _jsx("span", { className: `ml-2 ${sizes[size]}`, children: iconRight }), _jsx("span", { className: `absolute inline-block w-[1.5ch] ml-2 text-left align-middle ${isLoading || isDebounced || isThrottled ? 'visible' : 'invisible'}`, children: Array.from({ length: dots }).map((_, index) => (_jsx("span", { children: "." }, index))) })] }));
};
export default GeneralButton;
