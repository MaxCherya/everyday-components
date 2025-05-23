# 🔐 PasswordInput

A secure, flexible password input component with real-time validation, password strength scoring, and breach detection via Have I Been Pwned API. Includes optional hints, icons, debouncing, and full control over password rules.

---

## 🚀 Usage

```tsx
import PasswordInput from 'everyday-components';

const App = () => (
  <PasswordInput
    placeholder="Enter password"
    label="Password"
    required
    displayStrength
    debounceMs={300}
    customPrimaryColor="#2563eb"
    customSecondaryColor="#e5e7eb"
    iconLeft="🔒"
    iconRight="❌"
    onRightIconClick={() => alert("Clear!")}
    isLeakedCheck
  />
);
```

---

## ⚙️ Props

| Prop                                                        | Type                                                                                 | Default     | Description                              |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------- | ---------------------------------------- |
| `value`                                                     | `string`                                                                             | `''`        | Controlled value of the input            |
| `onChange`                                                  | `(e: any) => void`                                                                   | —           | Callback on input change                 |
| `placeholder`                                               | `string`                                                                             | —           | Input placeholder text                   |
| `name` / `id`                                               | `string`                                                                             | —           | Standard input attributes                |
| `variant`                                                   | `'default' \| 'outlined' \| 'filled' \| 'lowBorder' \| 'sideBorders' \| 'topBorder'` | `'default'` | Style variant for borders/backgrounds    |
| `size`                                                      | `'xs' \| 'sm' \| 'base' \| 'md' \| 'lg' \| 'xl' \| 'custom'`                         | `'base'`    | Controls font size                       |
| `fullWidth`                                                 | `boolean`                                                                            | `false`     | Input stretches to container width       |
| `disabled` / `readonly`                                     | `boolean`                                                                            | `false`     | Field usability state                    |
| `autoFocus`                                                 | `boolean`                                                                            | `false`     | Focuses field on mount                   |
| `onFocus` / `onUnfocus`                                     | `() => void`                                                                         | —           | Focus/blur callbacks                     |
| `label`                                                     | `string` \| `ReactNode`                                                              | —           | Input label                              |
| `labelPosition`                                             | `'top' \| 'bottom'`                                                                  | `'top'`     | Label placement                          |
| `hint`                                                      | `string`                                                                             | —           | Optional help tooltip text               |
| `hintPosition`                                              | `'top' \| 'bottom'`                                                                  | `'bottom'`  | Hint position                            |
| `error`                                                     | `string`                                                                             | —           | Display error message                    |
| `displayError`                                              | `boolean`                                                                            | `true`      | Whether to show error text               |
| `setError`                                                  | `Dispatch<SetStateAction<string>>`                                                   | —           | Handles setting validation errors        |
| `errorColor`                                                | `string` (hex)                                                                       | `#ff3333`   | Color of error messages                  |
| `errorPosition`                                             | `'top' \| 'bottom'`                                                                  | `'top'`     | Error text position                      |
| `debounceMs`                                                | `number`                                                                             | —           | Delay before `onChange` fires            |
| `iconLeft` / `iconRight`                                    | `ReactNode` \| `string`                                                              | —           | Optional icons inside input              |
| `onLeftIconClick` / `onRightIconClick`                      | `() => void`                                                                         | —           | Icon click actions                       |
| `passCheckPos`                                              | `'top' \| 'bottom'`                                                                  | `'bottom'`  | Position of password strength bar        |
| `displayStrength`                                           | `boolean`                                                                            | `true`      | Whether to show strength bar             |
| `displayStrengthLabel`                                      | `boolean`                                                                            | `true`      | Whether to show strength text            |
| `customPrimaryColor`                                        | `string`                                                                             | —           | Color used for active state              |
| `customSecondaryColor`                                      | `string`                                                                             | —           | Text and label color                     |
| `customRequiredMessage`                                     | `string`                                                                             | —           | Custom required field message            |
| `minChars` / `maxChars`                                     | `number`                                                                             | `8` / `64`  | Length constraints                       |
| `uppercaseRequired` / `lowercaseRequired` / `digitRequired` | `boolean`                                                                            | `true`      | Character rules                          |
| `specialCharRequired`                                       | `boolean`                                                                            | `true`      | Require special symbol                   |
| `noRepeatingChars` / `noSpaces`                             | `boolean`                                                                            | `true`      | Prevent weak patterns                    |
| `noSequences` / `noKeyboardSequences`                       | `boolean`                                                                            | `true`      | Prevent common sequences (e.g., abc/qwe) |
| `isLeakedCheck`                                             | `boolean`                                                                            | `true`      | Check password via Have I Been Pwned     |

---

## 🔍 Behavior Details

### ✅ Real-Time Validation

* Validates password based on all rules and reports first issue
* `setError` updates external error state if provided

### 🔒 Password Strength

* Uses `getPasswordStrength()` utility
* Evaluates length + character mix + pattern avoidance
* Optional strength bar with adaptive colors and labels

### 🌐 Breach Detection

* Uses `isPasswordPwned()` to check against HIBP leaks
* Only activates when `isLeakedCheck = true`
* Entirely privacy-safe using k-anonymity

---

## 🎨 Style Logic

* `variant` controls borders: outlined, side/top/low, filled
* `size` adjusts text size for label, input, hint
* `colorStyle` comes from `getColors(primary, secondary)`
* Hover/focus changes border and text color

---

## 🧱 Dependencies

* `getColors()` — color object generator
* `debounce()` — delays input updates
* `getPasswordStrength()` — returns score + label
* `isPasswordPwned()` — async breach check via HaveIBeenPwned API

---

## ✅ Accessibility

* Fully accessible native `<input type="password">`
* All error/label/hint elements support screen readers
* Icons have pointer events and adjustable colors