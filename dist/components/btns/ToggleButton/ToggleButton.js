import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useSmartClick } from "../../../hooks/useSmartClick";
import { getColors } from "../../../utils/colorUtils";
const ToggleButton = ({ size, isLoading = false, fullWidth = false, iconLeft, iconRight, iconRightAfter, iconLeftAfter, noOutlines = false, isToggled, offLabel, customPrimaryColor, customSecondaryColor, debounceMs, throttleMs, onClick, onThrottleStart, onDebounceStart, className, children, ...rest }) => {
    // ======================== STATES ======================= //
    const [isHover, setIsHover] = useState(false);
    const colorStyle = getColors(customPrimaryColor, customSecondaryColor);
    const [dots, setDots] = useState(1);
    const [_time, setTime] = useState(new Date());
    // ======================================================= //
    const sizes = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
        custom: ''
    };
    const { handler: clickHandler, isThrottled, isDebounced, isLocked } = useSmartClick({ onClick, debounceMs, throttleMs, onDebounceStart, onThrottleStart });
    useEffect(() => {
        if (!isLoading && !isLocked && !isThrottled && !isDebounced)
            return;
        const interval = setInterval(() => {
            setTime(new Date());
            setDots((prev) => (prev >= 3 ? 1 : prev + 1));
        }, 500);
        return () => clearInterval(interval);
    }, [isLoading, isLocked, isThrottled, isDebounced]);
    return (_jsxs("button", { onMouseEnter: () => setIsHover(true), onMouseLeave: () => setIsHover(false), onClick: clickHandler, className: `px-8 cursor-pointer py-1 ${sizes[size]} ${fullWidth && 'w-full'} transition-all duration-300 ${className}`, style: {
            ...(isLoading || isLocked || isThrottled || isDebounced
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
                        : colorStyle.secondaryStyle),
            border: noOutlines
                ? '0px'
                : `1px solid ${isHover
                    ? colorStyle.secondaryStyle.backgroundColor
                    : colorStyle.primaryStyle.backgroundColor}`
        }, ...rest, children: [isToggled ? children : offLabel, isToggled ? _jsx("span", { className: `ml-2 ${sizes[size]}`, children: iconLeft }) : _jsx("span", { className: `ml-2 ${sizes[size]}`, children: iconLeftAfter }), _jsx("span", { className: `absolute inline-block w-[1.5ch] ml-2 text-left align-middle ${isLoading || isDebounced || isThrottled ? 'visible' : 'invisible'}`, children: Array.from({ length: dots }).map((_, index) => (_jsx("span", { children: "." }, index))) }), isToggled ? _jsx("span", { className: `ml-2 ${sizes[size]}`, children: iconRight }) : _jsx("span", { className: `ml-2 ${sizes[size]}`, children: iconRightAfter })] }));
};
export default ToggleButton;
