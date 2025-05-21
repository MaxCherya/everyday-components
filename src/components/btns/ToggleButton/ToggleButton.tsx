import React, { useEffect, useState, type ReactNode } from "react";
import { useSmartClick } from "../../../hooks/useSmartClick";
import { getColors } from "../../../utils/colorUtils";

export interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'custom';
    isLoading?: boolean;
    fullWidth?: boolean;
    iconRight?: ReactNode | string;
    iconLeft?: ReactNode | string;
    iconRightAfter?: ReactNode | string;
    iconLeftAfter?: ReactNode | string;
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
    iconLeft,
    iconRight,
    iconRightAfter,
    iconLeftAfter,
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
    const [dots, setDots] = useState(1);
    const [_time, setTime] = useState(new Date())
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

    useEffect(() => {
        if (!isLoading && !isLocked && !isThrottled && !isDebounced) return

        const interval = setInterval(() => {
            setTime(new Date())
            setDots((prev) => (prev >= 3 ? 1 : prev + 1));
        }, 500)

        return () => clearInterval(interval);
    }, [isLoading, isLocked, isThrottled, isDebounced])

    console.log(colorStyle.primaryStyle)
    console.log(colorStyle.secondaryStyle)

    return (
        <button
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={clickHandler}
            className={`px-8 cursor-pointer py-1 ${sizes[size]} ${fullWidth && 'w-full'} transition-all duration-300 ${className}`}
            style={
                isLoading || isLocked || isThrottled || isDebounced
                    ? colorStyle.disabledStyle
                    : isHover
                        ? isToggled
                            ? {
                                backgroundColor: colorStyle.primaryHover,
                                color: colorStyle.primaryStyle.color
                            }
                            : {
                                backgroundColor: colorStyle.secondaryHover,
                                color: colorStyle.secondaryStyle.color
                            }
                        : isToggled
                            ? colorStyle.primaryStyle
                            : colorStyle.secondaryStyle
            }
            {...rest}
        >
            {isToggled ? children : offLabel}

            {isToggled ? <span className={`ml-2 ${sizes[size]}`}>{iconLeft}</span> : <span className={`ml-2 ${sizes[size]}`}>{iconLeftAfter}</span>}

            <span
                className={`absolute inline-block w-[1.5ch] ml-2 text-left align-middle ${isLoading || isDebounced || isThrottled ? 'visible' : 'invisible'
                    }`}
            >
                {Array.from({ length: dots }).map((_, index) => (
                    <span key={index}>.</span>
                ))}
            </span>

            {isToggled ? <span className={`ml-2 ${sizes[size]}`}>{iconRight}</span> : <span className={`ml-2 ${sizes[size]}`}>{iconRightAfter}</span>}

        </button>
    )
}

export default ToggleButton;