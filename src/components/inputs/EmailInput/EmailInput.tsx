import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { checkEmail, debounce } from "../../../utils/helper";
import { getColors } from "../../../utils/colorUtils";

export interface EmailInputProps {
    value?: string;
    onChange?: (e: any) => void;
    placeholder?: string;
    name?: string; // form name
    id?: string; // DOM id
    variant?: 'default' | 'outlined' | 'filled' | 'lowBorder' | 'sideBorders' | 'topBorder';
    size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'custom';
    fullWidth?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    autoFocus?: boolean;
    onFocus?: () => void;
    onUnfocus?: () => void;
    customPrimaryColor?: string;
    customSecondaryColor?: string;
    label?: string | ReactNode;
    required?: boolean;
    hint?: string;
    hintPosition?: 'top' | 'bottom';
    labelPosition?: 'top' | 'bottom';
    error?: string;
    setError?: React.Dispatch<React.SetStateAction<string>>;
    errorColor?: string; // in hex
    errorPosition?: 'top' | 'bottom';
    debounceMs?: number; // in ms
    iconLeft?: ReactNode | string;
    iconRight?: ReactNode | string;
    onLeftIconClick?: () => void;
    onRightIconClick?: () => void;
    autoComplete?: 'on' | 'off';
    additionalEmailCheck?: boolean;
    additionalEmailCheck_formatMessage?: string;
    additionalEmailCheck_mxMessage?: string;
    additionalEmailCheck_disposableMessage?: string;
    additionalEmailCheck_errorMessage?: string;
    allowedDomains?: string[];
    allowedDomainsMessage?: string;
    className?: string;
    classNameHint?: string;
    classNameLabel?: string;
    inputClassName?: string;
    iconLeftClassName?: string;
    iconRightClassName?: string;
    customRequiredMessage?: string;
    customValidEmailMessage?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
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
    onFocus,
    onUnfocus,
    customPrimaryColor,
    customSecondaryColor,
    label,
    labelPosition = 'top',
    required = false,
    hint,
    hintPosition = 'bottom',
    error,
    setError,
    errorColor = '#ff3333',
    errorPosition = 'top',
    debounceMs,
    iconLeft,
    iconRight,
    onLeftIconClick,
    onRightIconClick,
    autoComplete = 'off',
    additionalEmailCheck = true,
    additionalEmailCheck_formatMessage,
    additionalEmailCheck_mxMessage,
    additionalEmailCheck_disposableMessage,
    additionalEmailCheck_errorMessage,
    allowedDomains,
    allowedDomainsMessage,
    className,
    classNameHint,
    classNameLabel,
    inputClassName,
    iconLeftClassName,
    iconRightClassName,
    customRequiredMessage,
    customValidEmailMessage
}) => {

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
    }
    // =============================================================== //

    const debouncedOnChange = useMemo(() => {
        if (!onChange || !debounceMs) return undefined;
        return debounce(onChange, debounceMs);
    }, [onChange, debounceMs]);

    useEffect(() => {
        if (!setError) return;
        const validateEmail = async () => {
            if (required && currentValue.length < 1) {
                setError(customRequiredMessage || 'This is a required field');
            } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(currentValue)) {
                setError(customValidEmailMessage || 'Please, enter the valid email address');
            } else if (allowedDomains && allowedDomains?.length > 0 && !allowedDomains?.includes(currentValue.split('@')[1].toLowerCase())) {
                setError(allowedDomainsMessage || 'This domain is not allowed');
            } else if (additionalEmailCheck) {
                const result = await checkEmail(currentValue)
                if (result) {
                    if (!result.format) {
                        setError(additionalEmailCheck_formatMessage || "Invalid email format");
                    } else if (!result.dns) {
                        setError(additionalEmailCheck_mxMessage || "This email domain can't receive mail (no MX record)");
                    } else if (result.disposable) {
                        setError(additionalEmailCheck_disposableMessage || "Please use a permanent email (disposable detected)");
                    } else {
                        setError(""); // email looks valid
                    }
                } else {
                    setError(additionalEmailCheck_errorMessage || "Unable to verify this email right now");
                }
            }
            else {
                setError('');
            }
        }

        validateEmail();
    }, [currentValue, required, setError, customRequiredMessage]);

    return (
        <div className={`${fullWidth && 'w-full'} ${className}`}>

            {hint &&
                <div onMouseEnter={() => setIsHintHover(true)} onMouseLeave={() => setIsHintHover(false)}
                    style={
                        colorStyle.primaryStyle
                    }
                    className={`${hintPosition !== 'top' && 'hidden'} mb-2 flex flex-row px-4 py-1 rounded-lg transition-all duration-300 ${isHintHover ? 'opacity-100' : 'opacity-30'} ${classNameHint}`}>
                    <div className="w-0.5 mr-2" style={colorStyle.secondaryStyle} />
                    <p className={`${sizes[size].hint}`}>{hint}</p>
                </div>
            }

            {label &&
                <h1 className={`${sizes[size].label} ${labelPosition !== 'top' && 'hidden'}  mb-1 ${classNameLabel}`} style={{ color: colorStyle.secondaryStyle.color }}>{label}</h1>
            }

            {error &&
                <p
                    style={{
                        color: errorColor
                    }}
                    className={`${sizes[size].hint} ${errorPosition !== 'top' && 'hidden'}`}
                >{error}</p>
            }

            <div className={`relative flex flex-row align-middle ${fullWidth && 'w-full'}`}>
                <span className={`${sizes[size].input} absolute left-2 top-1/2 -translate-y-1/2 ${iconLeftClassName}`}
                    onClick={onLeftIconClick}
                    style={{
                        color: disabled
                            ? colorStyle.disabledStyle.color
                            : variant === 'filled'
                                ? colorStyle.primaryStyle.color
                                : isFocused
                                    ? colorStyle.secondaryStyle.backgroundColor
                                    : colorStyle.primaryStyle.backgroundColor,
                        transition: 'color 0.2s ease-in-out',
                        pointerEvents: disabled ? 'none' : 'auto',
                    }}
                >
                    {iconLeft}
                </span>
                <input type="email" disabled={disabled} onChange={(e) => {
                    if (debouncedOnChange) {
                        debouncedOnChange(e);
                    } else if (onChange) {
                        onChange(e);
                    }
                    setCurrentValue(e.target.value)
                }}
                    autoComplete={autoComplete} readOnly={readonly} autoFocus={autoFocus}
                    name={name}
                    id={id}
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
                    value={value && value} className={`px-2 ${iconLeft && 'pl-9'} ${iconRight && 'pr-9'} ${fullWidth && 'w-full'} py-1 ${variants[variant]} ${sizes[size].input} ${inputClassName}`}
                    placeholder={placeholder ? placeholder + (required ? '*' : '') : undefined}
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
                    }}
                />
                {iconRight &&
                    <span className={`${sizes[size].input} ml-2 absolute right-2 top-1/2 -translate-y-1/2 ${iconRightClassName}`}
                        onClick={onRightIconClick}
                        style={{
                            color: disabled
                                ? colorStyle.disabledStyle.color
                                : variant === 'filled'
                                    ? colorStyle.primaryStyle.color
                                    : isFocused
                                        ? colorStyle.secondaryStyle.backgroundColor
                                        : colorStyle.primaryStyle.backgroundColor,
                            transition: 'color 0.2s ease-in-out',
                            pointerEvents: disabled ? 'none' : 'auto',
                        }}>
                        {iconRight}
                    </span>
                }
            </div>

            {error &&
                <p
                    style={{
                        color: errorColor
                    }}
                    className={`${sizes[size].hint} ${errorPosition !== 'bottom' && 'hidden'}`}
                >{error}</p>
            }

            {label &&
                <h1 className={`${sizes[size].label} ${labelPosition !== 'bottom' && 'hidden'}  mb-1 ${classNameLabel}`} style={{ color: colorStyle.secondaryStyle.color }}>{label}</h1>
            }

            {hint &&
                <div onMouseEnter={() => setIsHintHover(true)} onMouseLeave={() => setIsHintHover(false)}
                    style={
                        colorStyle.primaryStyle
                    }
                    className={`${hintPosition !== 'bottom' && 'hidden'} mt-2 flex flex-row px-4 py-1 rounded-lg transition-all duration-300 ${isHintHover ? 'opacity-100' : 'opacity-30'} ${classNameHint}`}>
                    <div className="w-0.5 mr-2" style={colorStyle.secondaryStyle} />
                    <p className={`${sizes[size].hint}`}>{hint}</p>
                </div>
            }

        </div>
    )
}

export default EmailInput;