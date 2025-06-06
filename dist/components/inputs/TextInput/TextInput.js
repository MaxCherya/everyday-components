import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { getColors } from "../../../utils/colorUtils";
import { debounce } from "../../../utils/helper";
const TextInput = ({ value, onChange, placeholder, name, id, variant = 'default', size = 'base', fullWidth = false, disabled = false, readonly = false, autoFocus = false, regex, onFocus, onUnfocus, customPrimaryColor, customSecondaryColor, label, labelPosition = 'top', required = false, hint, hintPosition = 'bottom', error, setError, errorColor = '#ff3333', errorPosition = 'top', debounceMs, iconLeft, iconRight, onLeftIconClick, onRightIconClick, autoComplete = 'off', className, classNameHint, classNameLabel, inputClassName, iconLeftClassName, iconRightClassName, customRequiredMessage, customRegexMessage }) => {
    // =========================== STATES ============================ //
    const colorStyle = getColors(customPrimaryColor, customSecondaryColor);
    const [isHover, setIsHover] = useState(false);
    const [isHintHover, setIsHintHover] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState('');
    // =============================================================== //
    // ============================= OBJCTS ========================== //
    const sizes = {
        xs: { label: 'text-xs', input: 'text-[11px]', hint: 'text-[9px]' },
        sm: { label: 'text-sm', input: 'text-xs', hint: 'text-[10px]' },
        base: { label: 'text-base', input: 'text-sm', hint: 'text-xs' },
        md: { label: 'text-lg', input: 'text-base', hint: 'text-sm' },
        lg: { label: 'text-xl', input: 'text-lg', hint: 'text-base' },
        xl: { label: 'text-2xl', input: 'text-xl', hint: 'text-lg' },
        custom: { label: '', input: '', hint: '' }
    };
    const variants = {
        default: '',
        outlined: 'border-1',
        sideBorders: 'border-r-1 border-l-1',
        filled: '',
        lowBorder: 'border-b-1',
        topBorder: 'border-t-1'
    };
    // =============================================================== //
    const debouncedOnChange = useMemo(() => {
        if (!onChange || !debounceMs)
            return undefined;
        return debounce(onChange, debounceMs);
    }, [onChange, debounceMs]);
    useEffect(() => {
        if (setError) {
            if (required && currentValue.length < 1) {
                setError(customRequiredMessage || 'This is a required field');
            }
            else if (regex && !regex.test(currentValue)) {
                setError(customRegexMessage || 'Input does not match the required format');
            }
            else {
                setError('');
            }
        }
    }, [currentValue, regex, required, setError, customRequiredMessage]);
    return (_jsxs("div", { className: `${fullWidth && 'w-full'} ${className}`, children: [hint &&
                _jsxs("div", { onMouseEnter: () => setIsHintHover(true), onMouseLeave: () => setIsHintHover(false), style: colorStyle.primaryStyle, className: `${hintPosition !== 'top' && 'hidden'} mb-2 flex flex-row px-4 py-1 rounded-lg transition-all duration-300 ${isHintHover ? 'opacity-100' : 'opacity-30'} ${classNameHint}`, children: [_jsx("div", { className: "w-0.5 mr-2", style: colorStyle.secondaryStyle }), _jsx("p", { className: `${sizes[size].hint}`, children: hint })] }), label &&
                _jsx("h1", { className: `${sizes[size].label} ${labelPosition !== 'top' && 'hidden'}  mb-1 ${classNameLabel}`, style: { color: colorStyle.secondaryStyle.color }, children: label }), error &&
                _jsx("p", { style: {
                        color: errorColor
                    }, className: `${sizes[size].hint} ${errorPosition !== 'top' && 'hidden'}`, children: error }), _jsxs("div", { className: `relative flex flex-row align-middle ${fullWidth && 'w-full'}`, children: [_jsx("span", { className: `${sizes[size].input} absolute left-2 top-1/2 -translate-y-1/2 ${iconLeftClassName}`, onClick: onLeftIconClick, style: {
                            color: disabled
                                ? colorStyle.disabledStyle.color
                                : variant === 'filled'
                                    ? colorStyle.primaryStyle.color
                                    : isFocused
                                        ? colorStyle.secondaryStyle.backgroundColor
                                        : colorStyle.primaryStyle.backgroundColor,
                            transition: 'color 0.2s ease-in-out',
                            pointerEvents: disabled ? 'none' : 'auto',
                        }, children: iconLeft }), _jsx("input", { disabled: disabled, onChange: (e) => {
                            if (debouncedOnChange) {
                                debouncedOnChange(e);
                            }
                            else if (onChange) {
                                onChange(e);
                            }
                            setCurrentValue(e.target.value);
                        }, autoComplete: autoComplete, readOnly: readonly, autoFocus: autoFocus, name: name, id: id, onFocus: () => {
                            onFocus && onFocus();
                            setIsFocused(true);
                        }, onBlur: () => {
                            onUnfocus && onUnfocus();
                            setIsFocused(false);
                        }, onMouseEnter: () => setIsHover(true), onMouseLeave: () => setIsHover(false), value: value && value, className: `px-2 ${iconLeft && 'pl-9'} ${iconRight && 'pr-9'} ${fullWidth && 'w-full'} py-1 ${variants[variant]} ${sizes[size].input} ${inputClassName}`, placeholder: placeholder ? placeholder + (required ? '*' : '') : undefined, style: {
                            ...(disabled
                                ? {
                                    backgroundColor: colorStyle.disabledStyle.backgroundColor,
                                    color: colorStyle.disabledStyle.color,
                                    border: colorStyle.disabledStyle.border,
                                    cursor: colorStyle.disabledStyle.cursor,
                                    opacity: colorStyle.disabledStyle.opacity,
                                }
                                : variant === 'filled'
                                    ? {
                                        backgroundColor: isHover
                                            ? colorStyle.primaryHover
                                            : colorStyle.primaryStyle.backgroundColor,
                                        color: colorStyle.primaryStyle.color,
                                        border: `1px solid ${error ? errorColor : 'transparent'}`,
                                    }
                                    : {
                                        backgroundColor: 'transparent',
                                        color: colorStyle.primaryStyle.backgroundColor,
                                        borderStyle: 'solid',
                                        ...(variant === 'outlined' && {
                                            border: `1px solid ${error ? errorColor : (isFocused
                                                ? colorStyle.secondaryStyle.backgroundColor
                                                : colorStyle.primaryStyle.backgroundColor)}`,
                                        }),
                                        ...(variant === 'topBorder' && {
                                            borderTopWidth: '1px',
                                            borderTopColor: error
                                                ? errorColor
                                                : isFocused
                                                    ? colorStyle.secondaryStyle.backgroundColor
                                                    : colorStyle.primaryStyle.backgroundColor,
                                        }),
                                        ...(variant === 'lowBorder' && {
                                            borderBottomWidth: '1px',
                                            borderBottomColor: error
                                                ? errorColor
                                                : isFocused
                                                    ? colorStyle.secondaryStyle.backgroundColor
                                                    : colorStyle.primaryStyle.backgroundColor,
                                        }),
                                        ...(variant === 'sideBorders' && {
                                            borderLeftWidth: '1px',
                                            borderRightWidth: '1px',
                                            borderLeftColor: error
                                                ? errorColor
                                                : isFocused
                                                    ? colorStyle.secondaryStyle.backgroundColor
                                                    : colorStyle.primaryStyle.backgroundColor,
                                            borderRightColor: error
                                                ? errorColor
                                                : isFocused
                                                    ? colorStyle.secondaryStyle.backgroundColor
                                                    : colorStyle.primaryStyle.backgroundColor,
                                        }),
                                    }),
                            outline: 'none',
                            transition: 'all 0.2s ease-in-out',
                        } }), iconRight &&
                        _jsx("span", { className: `${sizes[size].input} ml-2 absolute right-2 top-1/2 -translate-y-1/2 ${iconRightClassName}`, onClick: onRightIconClick, style: {
                                color: disabled
                                    ? colorStyle.disabledStyle.color
                                    : variant === 'filled'
                                        ? colorStyle.primaryStyle.color
                                        : isFocused
                                            ? colorStyle.secondaryStyle.backgroundColor
                                            : colorStyle.primaryStyle.backgroundColor,
                                transition: 'color 0.2s ease-in-out',
                                pointerEvents: disabled ? 'none' : 'auto',
                            }, children: iconRight })] }), error &&
                _jsx("p", { style: {
                        color: errorColor
                    }, className: `${sizes[size].hint} ${errorPosition !== 'bottom' && 'hidden'}`, children: error }), label &&
                _jsx("h1", { className: `${sizes[size].label} ${labelPosition !== 'bottom' && 'hidden'}  mb-1 ${classNameLabel}`, style: { color: colorStyle.secondaryStyle.color }, children: label }), hint &&
                _jsxs("div", { onMouseEnter: () => setIsHintHover(true), onMouseLeave: () => setIsHintHover(false), style: colorStyle.primaryStyle, className: `${hintPosition !== 'bottom' && 'hidden'} mt-2 flex flex-row px-4 py-1 rounded-lg transition-all duration-300 ${isHintHover ? 'opacity-100' : 'opacity-30'} ${classNameHint}`, children: [_jsx("div", { className: "w-0.5 mr-2", style: colorStyle.secondaryStyle }), _jsx("p", { className: `${sizes[size].hint}`, children: hint })] })] }));
};
export default TextInput;
