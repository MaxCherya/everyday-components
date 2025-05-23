# 📧 EmailInput

A flexible, intelligent email input component designed for modern web forms. Features built-in validation, domain whitelisting, real-time API-based checks (syntax, MX records, disposable detection), debounced updates, and complete visual theming support.

---

## 🚀 Usage

```tsx
import EmailInput from 'everyday-components';

const App = () => (
  <EmailInput
    placeholder="Enter email"
    label="Email"
    required
    debounceMs={300}
    customPrimaryColor="#2563eb"
    customSecondaryColor="#e5e7eb"
    iconLeft="📧"
    iconRight="❌"
    onRightIconClick={() => alert("Clear!")}
    additionalEmailCheck
    allowedDomains={["gmail.com", "company.org"]}
  />
);
```

---

## ⚙️ Props

| Prop                                                | Type                                                                                 | Default     | Description                                            |
| --------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------ |
| `value`                                             | `string`                                                                             | `''`        | Controlled input value                                 |
| `onChange`                                          | `(e: any) => void`                                                                   | —           | Callback on input change                               |
| `placeholder`                                       | `string`                                                                             | —           | Placeholder text                                       |
| `name` / `id`                                       | `string`                                                                             | —           | Native input attributes                                |
| `variant`                                           | `'default' \| 'outlined' \| 'filled' \| 'lowBorder' \| 'sideBorders' \| 'topBorder'` | `'default'` | Styling variant                                        |
| `size`                                              | `'xs' \| 'sm' \| 'base' \| 'md' \| 'lg' \| 'xl' \| 'custom'`                         | `'base'`    | Font sizing presets                                    |
| `fullWidth`                                         | `boolean`                                                                            | `false`     | Expands to full width                                  |
| `disabled` / `readonly`                             | `boolean`                                                                            | `false`     | Toggles usability state                                |
| `autoFocus`                                         | `boolean`                                                                            | `false`     | Autofocuses on mount                                   |
| `onFocus` / `onUnfocus`                             | `() => void`                                                                         | —           | Focus/blur callbacks                                   |
| `label`                                             | `string` \| `ReactNode`                                                              | —           | Input label                                            |
| `labelPosition`                                     | `'top' \| 'bottom'`                                                                  | `'top'`     | Label placement                                        |
| `hint`                                              | `string`                                                                             | —           | Help text below/above input                            |
| `hintPosition`                                      | `'top' \| 'bottom'`                                                                  | `'bottom'`  | Hint placement                                         |
| `error`                                             | `string`                                                                             | —           | Error message (manual or auto)                         |
| `setError`                                          | `Dispatch<SetStateAction<string>>`                                                   | —           | External error handler                                 |
| `errorColor`                                        | `string` (hex)                                                                       | `#ff3333`   | Error text/border color                                |
| `errorPosition`                                     | `'top' \| 'bottom'`                                                                  | `'top'`     | Error text position                                    |
| `debounceMs`                                        | `number` (ms)                                                                        | —           | Debounce delay before `onChange` triggers              |
| `iconLeft` / `iconRight`                            | `ReactNode` \| `string`                                                              | —           | Optional icons                                         |
| `onLeftIconClick` / `onRightIconClick`              | `() => void`                                                                         | —           | Icon click handlers                                    |
| `autoComplete`                                      | `'on' \| 'off'`                                                                      | `'off'`     | Sets native autoComplete attribute                     |
| `customPrimaryColor` / `customSecondaryColor`       | `string` (hex)                                                                       | —           | Custom theming colors                                  |
| `className*`                                        | `string`                                                                             | —           | Custom styles for container, label, hint, input, icons |
| `customRequiredMessage` / `customValidEmailMessage` | `string`                                                                             | —           | Custom error messages                                  |
| `additionalEmailCheck`                              | `boolean`                                                                            | `true`      | Whether to validate using external API                 |
| `additionalEmailCheck_formatMessage`                | `string`                                                                             | —           | Custom invalid format message from API                 |
| `additionalEmailCheck_mxMessage`                    | `string`                                                                             | —           | Message if domain lacks DNS records                    |
| `additionalEmailCheck_disposableMessage`            | `string`                                                                             | —           | Message for temp mail detection                        |
| `additionalEmailCheck_errorMessage`                 | `string`                                                                             | —           | Fallback if checkEmail fails                           |
| `allowedDomains`                                    | `string[]`                                                                           | —           | Restrict to these domains (e.g., `gmail.com`)          |
| `allowedDomainsMessage`                             | `string`                                                                             | —           | Custom error for blocked domains                       |

---

## 🔍 Behavior Details

### ✅ Validation Logic

* Required + format regex check
* Optional domain whitelisting (`allowedDomains`)
* Optional `checkEmail()` call to Disify API for:

  * Format
  * DNS
  * Disposable mail provider

### 🧠 Debounce

* `onChange` will debounce if `debounceMs` is set
* Optimizes API calls for autocomplete-heavy typing

### 🎯 Domain Whitelisting

* You can pass `allowedDomains={["gmail.com", "my.org"]}`
* Automatically extracts domain with `split('@')[1]`

---

## 🧱 Dependencies

* `getColors()` — generates color theming config
* `debounce()` — debounce wrapper for `onChange`
* `checkEmail()` — calls Disify API to verify format/disposable/etc.

---

## ✅ Accessibility

* Uses native `<input type="email">`
* Supports all ARIA and HTML5 email features
* Icons are focusable and clickable
* Works with screen readers and tab navigation

---

## 📦 Recommended Use

| Situation                       | Recommendation                           |
| ------------------------------- | ---------------------------------------- |
| Basic email entry               | Use built-in validation only             |
| Enterprise / restricted systems | Enable domain allowlist + API validation |
| Security-conscious flows        | Pair with email confirmation logic       |