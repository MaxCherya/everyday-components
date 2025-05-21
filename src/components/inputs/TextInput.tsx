import React, { useState, type ReactNode } from "react";
import { getColors } from "../../utils/colorUtils";

interface Params {
    value?: string;
    onChange?: () => void;
    placeholder?: string;
    name?: string; // form name
    id?: string; // DOM id
    variant?: 'default' | 'outlined' | 'filled' | 'lowBorder' | 'sideBorders' | 'topBorder';
    size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'custom';
    fullWidth?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    autoFocus?: boolean;
    regex?: boolean;
    onFocus?: () => void;
    onUnfocus?: () => void;
    customPrimaryColor?: string;
    customSecondaryColor?: string;
    label?: string | React.ReactNode;
    required?: boolean;
    hint?: string;
    error?: string;
    debounceMs?: number; // in ms
    iconLeft?: ReactNode | string;
    iconRight?: ReactNode | string;
    onLeftIconClick?: () => void;
    onRightIconClick?: () => void;
    autoComplete?: 'on' | 'off';
    className?: string;
    classNameHint?: string;
    inputClassName?: string;
}

const TextInput: React.FC<Params> = ({
    value,
    onChange,
    placeholder,
    name,
    id,
    variant = 'default',
    size = 'base',
    fullWidth = false,
    disabled = false,
    readonly = false,
    autoFocus = false,
    regex,
    onFocus,
    onUnfocus,
    customPrimaryColor,
    customSecondaryColor,
    label,
    required = false,
    hint,
    error,
    debounceMs,
    iconLeft,
    iconRight,
    onLeftIconClick,
    onRightIconClick,
    autoComplete = 'off',
    className,
    classNameHint,
    inputClassName
}) => {

    // =========================== STATES ============================ //
    const colorStyle = getColors(customPrimaryColor, customSecondaryColor);
    const [isHover, setIsHover] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    // =============================================================== //

    // ============================= OBJCTS ========================== //
    const sizes = {
        xs: { input: 'text-xs', hint: 'text-xs' },
        sm: { input: 'text-sm', hint: 'text-sm' },
        base: { input: 'text-base', hint: 'text-base' },
        md: { input: 'text-md', hint: 'text-md' },
        lg: { input: 'text-lg', hint: 'text-lg' },
        xl: { input: 'text-xl', hint: 'text-xl' },
        custom: { input: '', hint: '' }
    }

    const variants = {
        default: '',
        outlined: 'border-1',
        sideBorders: 'border-r-1 border-l-1',
        filled: '',
        lowBorder: 'border-b-1',
        topBorder: 'border-t-1'
    }
    // =============================================================== //

    return (
        <div className={`${fullWidth && 'w-full'} ${className}`}>
            <div className={`${classNameHint}`}>

            </div>

            <input disabled={disabled} autoComplete={autoComplete} readOnly={readonly} autoFocus={autoFocus}
                onFocus={() => {
                    onFocus && onFocus()
                    setIsFocused(true)
                }}
                onBlur={() => {
                    onUnfocus && onUnfocus()
                    setIsFocused(false)
                }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                value={value && value} className={`px-2 py-1 ${variants[variant]} ${sizes[size].input} ${inputClassName}`}
                placeholder={placeholder && placeholder}
                style={{
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
                                border: '1px solid transparent',
                            }
                            : {
                                backgroundColor: 'transparent',
                                color: colorStyle.primaryStyle.backgroundColor,
                                borderStyle: 'solid',
                                ...(variant === 'outlined' && {
                                    border: `1px solid ${isFocused
                                        ? colorStyle.secondaryStyle.backgroundColor
                                        : colorStyle.primaryStyle.backgroundColor
                                        }`,
                                }),
                                ...(variant === 'topBorder' && {
                                    borderTopWidth: '1px',
                                    borderTopColor: isFocused
                                        ? colorStyle.secondaryStyle.backgroundColor
                                        : colorStyle.primaryStyle.backgroundColor,
                                }),
                                ...(variant === 'lowBorder' && {
                                    borderBottomWidth: '1px',
                                    borderBottomColor: isFocused
                                        ? colorStyle.secondaryStyle.backgroundColor
                                        : colorStyle.primaryStyle.backgroundColor,
                                }),
                                ...(variant === 'sideBorders' && {
                                    borderLeftWidth: '1px',
                                    borderRightWidth: '1px',
                                    borderLeftColor: isFocused
                                        ? colorStyle.secondaryStyle.backgroundColor
                                        : colorStyle.primaryStyle.backgroundColor,
                                    borderRightColor: isFocused
                                        ? colorStyle.secondaryStyle.backgroundColor
                                        : colorStyle.primaryStyle.backgroundColor,
                                }),
                            }),
                    outline: 'none',
                    transition: 'all 0.2s ease-in-out',
                }}
            />

        </div>
    )
}

export default TextInput;