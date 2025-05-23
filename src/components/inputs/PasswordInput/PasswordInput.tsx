import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { getColors } from "../../../utils/colorUtils";
import { debounce, getPasswordStrength, isPasswordPwned } from "../../../utils/helper";

export interface PasswordInputProps {
    value?: string;
    onChange?: (e: any) => void;
    placeholder?: string;
    name?: string;
    id?: string;
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
    displayError?: boolean;
    setError?: React.Dispatch<React.SetStateAction<string>>;
    errorColor?: string; // in hex
    errorPosition?: 'top' | 'bottom';
    debounceMs?: number; // in ms
    iconLeft?: ReactNode | string;
    iconRight?: ReactNode | string;
    passCheckPos?: 'top' | 'bottom';
    displayStrength?: boolean;
    displayStrengthLabel?: boolean;
    onLeftIconClick?: () => void;
    onRightIconClick?: () => void;
    // ==================================== rules
    minChars?: number; // at least x chars for pass
    minCharsMessage?: string;
    maxChars?: number;
    maxCharsMessage?: string;
    uppercaseRequired?: boolean;
    uppercaseMessage?: string;
    lowercaseRequired?: boolean;
    lowercaseMessage?: string;
    digitRequired?: boolean;
    digitReqMessage?: string;
    specialCharRequired?: boolean;
    specialCharMessage?: string;
    noRepeatingChars?: boolean;
    noRepeatingCharsMessage?: string;
    noSpaces?: boolean;
    noSpacesMessage?: string;
    noSequences?: boolean;
    noSequencesMessage?: string;
    noKeyboardSequences?: boolean;
    noKeyboardSequencesMessage?: string;
    isLeakedCheck?: boolean;
    isLeakedMessage?: string;
    // ==========================================
    className?: string;
    classNameHint?: string;
    classNameLabel?: string;
    inputClassName?: string;
    iconLeftClassName?: string;
    iconRightClassName?: string;
    customRequiredMessage?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
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
    displayError = true,
    setError,
    errorColor = '#ff3333',
    errorPosition = 'top',
    debounceMs,
    iconLeft,
    iconRight,
    passCheckPos = 'bottom',
    displayStrength = true,
    displayStrengthLabel = true,
    onLeftIconClick,
    onRightIconClick,
    // ==================== rules
    minChars = 8,
    minCharsMessage,
    maxChars = 64,
    maxCharsMessage,
    uppercaseRequired = true,
    uppercaseMessage,
    lowercaseRequired = true,
    lowercaseMessage,
    digitRequired = true,
    digitReqMessage,
    specialCharRequired = true,
    specialCharMessage,
    noRepeatingChars = true,
    noRepeatingCharsMessage,
    noSpaces = true,
    noSpacesMessage,
    noSequences = true,
    noSequencesMessage,
    noKeyboardSequences = true,
    noKeyboardSequencesMessage,
    isLeakedCheck = true,
    isLeakedMessage,
    // ==========================
    className,
    classNameHint,
    classNameLabel,
    inputClassName,
    iconLeftClassName,
    iconRightClassName,
    customRequiredMessage
}) => {

    // =========================== STATES ============================ //
    const colorStyle = getColors(customPrimaryColor, customSecondaryColor);
    const [isHover, setIsHover] = useState(false);
    const [isHintHover, setIsHintHover] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState('');
    const [passScore, setPassScore] = useState(0);
    const [passLabel, setPassLabel] = useState('');
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
        const validatePass = async () => {
            if (required && currentValue.length < 1) {
                setError(customRequiredMessage || 'This is a required field');
            } else if (currentValue.length < minChars) {
                setError(minCharsMessage || `Your password must contain at least ${minChars} characters`);
            } else if (currentValue.length > maxChars) {
                setError(maxCharsMessage || `Your password must be not longer than ${maxChars} characters`);
            } else if (!/[A-Z]/.test(currentValue) && uppercaseRequired) {
                setError(uppercaseMessage || `Your password must contain at least one uppercase character`);
            } else if (!/[a-z]/.test(currentValue) && lowercaseRequired) {
                setError(lowercaseMessage || `Your password must contain at least one lowercase character`);
            } else if (!/[0-9]/.test(currentValue) && digitRequired) {
                setError(digitReqMessage || `Your password must contain at least one digit`);
            } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(currentValue) && specialCharRequired) {
                setError(specialCharMessage || `Your password must contain at least one special character`);
            } else if (/(.)\1/.test(currentValue) && noRepeatingChars) {
                setError(noRepeatingCharsMessage || `Your password must not contain same characters next to each other.`);
            } else if (/[' ']/.test(currentValue) && noSpaces) {
                setError(noSpacesMessage || `Your password must not contain spaces`);
            } else if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789)/i.test(currentValue) && noSequences) {
                setError(noSequencesMessage || `Your password must not contain sequences`);
            } else if (/(qwe|wer|ert|rty|tyu|yui|uio|asd|sdf|dfg|fgh|ghj|hjk|jkl|zxc|xcv|cvb|vbn|bnm|qwerty|asdf|zxcv)/i.test(currentValue) && noKeyboardSequences) {
                setError(noKeyboardSequencesMessage || `Your password must not contain keyboard sequences`);
            } else if (isLeakedCheck) {
                const isLeaked = await isPasswordPwned(currentValue);
                if (isLeaked) {
                    setError(isLeakedMessage || `This password was compromised before, please use a different one.`);
                    return;
                } else {
                    setError('');
                }
            }
            else {
                setError('');
            }
        }

        const passStrength = () => {
            const result = getPasswordStrength(currentValue);
            setPassScore(result.score);
            setPassLabel(result.label);
        }

        passStrength();
        validatePass();
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

            {error && displayError &&
                <p
                    style={{
                        color: errorColor
                    }}
                    className={`${sizes[size].hint} ${errorPosition !== 'top' && 'hidden'}`}
                >{error}</p>
            }

            <div className={`relative flex flex-col align-middle ${fullWidth && 'w-full'}`}>

                {currentValue.length > 0 && passScore >= 0 && passLabel && passCheckPos === 'top' && displayStrength && (
                    <div className="w-full mt-2">
                        <div className="relative w-full h-2 rounded bg-gray-300 overflow-hidden">
                            <div
                                className={`
                                    h-full transition-all duration-300
                                    ${passScore === 0 ? 'bg-red-500 w-1/5' : ''}
                                    ${passScore === 1 ? 'bg-orange-500 w-2/5' : ''}
                                    ${passScore === 2 ? 'bg-yellow-400 w-3/5' : ''}
                                    ${passScore === 3 ? 'bg-green-400 w-4/5' : ''}
                                    ${passScore === 4 ? 'bg-green-600 w-full' : ''}
                                `}
                            />
                        </div>
                        {displayStrengthLabel &&
                            <p className="mt-1 text-sm font-medium text-gray-700 text-center">
                                {passLabel}
                            </p>
                        }
                    </div>
                )}

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
                <input disabled={disabled} type="password" onChange={(e) => {
                    if (debouncedOnChange) {
                        debouncedOnChange(e);
                    } else if (onChange) {
                        onChange(e);
                    }
                    setCurrentValue(e.target.value)
                }}
                    readOnly={readonly} autoFocus={autoFocus}
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

                {currentValue.length > 0 && passScore >= 0 && passLabel && passCheckPos === 'bottom' && displayStrength && (
                    <div className="w-full mt-2">
                        <div className="relative w-full h-2 rounded bg-gray-300 overflow-hidden">
                            <div
                                className={`
                                    h-full transition-all duration-300
                                    ${passScore === 0 ? 'bg-red-500 w-1/5' : ''}
                                    ${passScore === 1 ? 'bg-orange-500 w-2/5' : ''}
                                    ${passScore === 2 ? 'bg-yellow-400 w-3/5' : ''}
                                    ${passScore === 3 ? 'bg-green-400 w-4/5' : ''}
                                    ${passScore === 4 ? 'bg-green-600 w-full' : ''}
                                `}
                            />
                        </div>
                        {displayStrengthLabel &&
                            <p className="mt-1 text-sm font-medium text-gray-700 text-center">
                                {passLabel}
                            </p>
                        }
                    </div>
                )}

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

            {error && displayError &&
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

export default PasswordInput;