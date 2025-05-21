import React, { useState } from "react";
import { useSmartClick } from "../../../hooks/useSmartClick";
import { getColors } from "../../../utils/colorUtils";

export interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'custom';
    isLoading?: boolean;
    fullWidth?: boolean;
    isToggled: boolean;
    offLabel: string,
    customPrimaryColor?: string; // in hex
    customSecondaryColor?: string; // in hex
    debounceMs?: number; // in ms
    throttleMs?: number; // in ms
    onClick?: () => void;
    onThrottleStart?: () => void;
    onDebounceStart?: () => void;
    className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
    size,
    isLoading = false,
    fullWidth = false,
    isToggled,
    offLabel,
    customPrimaryColor,
    customSecondaryColor,
    debounceMs,
    throttleMs,
    onClick,
    onThrottleStart,
    onDebounceStart,
    className,
    children,
    ...rest
}) => {

    // ======================== STATES ======================= //
    const [isHover, setIsHover] = useState(false);
    const colorStyle = getColors(customPrimaryColor, customSecondaryColor);
    // ======================================================= //

    const sizes = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
        custom: ''
    }

    const { handler: clickHandler, isThrottled, isDebounced, isLocked } = useSmartClick({ onClick, debounceMs, throttleMs, onDebounceStart, onThrottleStart });

    return (
        <button
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={clickHandler}
            className={`px-8 py-1 ${sizes[size]} ${fullWidth && 'w-full'} transition-all duration-300 ${className}`}
            style={
                isLoading || isLocked || isThrottled || isDebounced
                    ? colorStyle.disabledStyle
                    : isHover
                        ? isToggled
                            ? {
                                backgroundColor: colorStyle.primaryStyle.backgroundColor,
                                color: colorStyle.primaryStyle.color
                            }
                            : {
                                backgroundColor: colorStyle.secondaryStyle.backgroundColor,
                                color: colorStyle.secondaryStyle.color
                            }
                        : isToggled
                            ? colorStyle.primaryStyle
                            : colorStyle.secondaryStyle
            }
            {...rest}
        >
            {isToggled ? children : offLabel}
        </button>
    )
}

export default ToggleButton;