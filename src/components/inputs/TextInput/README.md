# 📝 TextInput

A highly customizable, accessible input component for modern web forms. Features include adaptive styling, validation, optional icons, debounced change handling, and flexible layout with labels, hints, and error messaging.

---

## 🚀 Usage

```tsx
import TextInput from 'everyday-components';

const App = () => (
  <TextInput
    placeholder="Enter email"
    label="Email"
    required
    regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
    customPrimaryColor="#2563eb"
    customSecondaryColor="#e5e7eb"
    debounceMs={300}
    errorColor="#ff3333"
    iconLeft="📧"
    iconRight="❌"
    onRightIconClick={() => alert("Clear!")}
  />
);
```

---

## ⚙️ Props

| Prop                                   | Type                                                                                           | Default     | Description                                           |
| -------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------- |
| `value`                                | `string`                                                                                       | `''`        | Controlled value of the input                         |
| `onChange`                             | `(e: any) => void`                                                                             | —           | Callback on input change                              |
| `placeholder`                          | `string`                                                                                       | —           | Placeholder text                                      |
| `name` / `id`                          | `string`                                                                                       | —           | HTML input `name` / `id`                              |
| `variant`                              | `"default"` \| `"outlined"` \| `"filled"` \| `"lowBorder"` \| `"sideBorders"` \| `"topBorder"` | `"default"` | Input style variant                                   |
| `size`                                 | `"xs"` \| `"sm"` \| `"base"` \| `"md"` \| `"lg"` \| `"xl"` \| `"custom"`                       | `"base"`    | Controls font size of label/input/hint                |
| `fullWidth`                            | `boolean`                                                                                      | `false`     | Makes input occupy full container width               |
| `disabled`                             | `boolean`                                                                                      | `false`     | Disables input field                                  |
| `readonly`                             | `boolean`                                                                                      | `false`     | Makes input read-only                                 |
| `autoFocus`                            | `boolean`                                                                                      | `false`     | Auto focuses input on render                          |
| `regex`                                | `RegExp`                                                                                       | —           | Input validation rule                                 |
| `required`                             | `boolean`                                                                                      | `false`     | Marks field as required                               |
| `onFocus` / `onUnfocus`                | `() => void`                                                                                   | —           | Callbacks for focus/blur                              |
| `customPrimaryColor`                   | `string` (hex)                                                                                 | —           | Color for active/focused state                        |
| `customSecondaryColor`                 | `string` (hex)                                                                                 | —           | Color for text, label, hint                           |
| `label`                                | `string` \| `ReactNode`                                                                        | —           | Field label                                           |
| `labelPosition`                        | `"top"` \| `"bottom"`                                                                          | `"top"`     | Position of label                                     |
| `hint`                                 | `string`                                                                                       | —           | Additional help text                                  |
| `hintPosition`                         | `"top"` \| `"bottom"`                                                                          | `"bottom"`  | Position of hint                                      |
| `error`                                | `string`                                                                                       | —           | Validation error text                                 |
| `setError`                             | `Dispatch<SetStateAction<string>>`                                                             | —           | Function to update error state                        |
| `errorColor`                           | `string` (hex)                                                                                 | `#ff3333`   | Color for error text and border                       |
| `errorPosition`                        | `"top"` \| `"bottom"`                                                                          | `"top"`     | Position of error message                             |
| `debounceMs`                           | `number` (ms)                                                                                  | —           | Delay before firing `onChange`                        |
| `iconLeft` / `iconRight`               | `ReactNode` \| `string`                                                                        | —           | Icons before/after the input                          |
| `onLeftIconClick` / `onRightIconClick` | `() => void`                                                                                   | —           | Click handlers for input icons                        |
| `autoComplete`                         | `"on"` \| `"off"`                                                                              | `"off"`     | HTML autocomplete setting                             |
| `className*`                           | `string`                                                                                       | —           | Custom class for container, label, hint, input, icons |
| `customRequiredMessage`                | `string`                                                                                       | —           | Message to show when `required` field is empty        |
| `customRegexMessage`                   | `string`                                                                                       | —           | Message to show when regex validation fails           |

---

## 🎨 Theming & Style Logic

* **Primary/Secondary colors**: Passed into `getColors()` for consistent styling
* **Focus styles**: Border color changes on focus
* **Variants**: Choose between full borders or side/top/bottom-only borders
* **Filled mode**: Applies background and hover colors
* **Disabled styles**: Softened colors with lower opacity

---

## 🧠 Behavior Details

### Validation

* When `required` is true and value is empty → triggers error
* When `regex` is provided and value fails the pattern → triggers error
* If `setError` is provided, the component manages the error state automatically

### Icons

* Optional left/right icons render inside the input
* Clickable via `onLeftIconClick` / `onRightIconClick`
* Color adjusts based on focus and hover state

### Debounce

* When `debounceMs` is set, input change handler is debounced
* Uses `debounce()` from `utils/helper.ts`

---

## 🔒 Accessibility

* Uses native `<input>` element
* Supports `autoFocus`, `disabled`, and `readonly`
* Label, hint, and error messages are screen-reader friendly
* Custom `aria-label` can be passed via `...rest` props

---

## 🧱 Dependencies

* `getColors` — generates color objects (primary, secondary, hover, disabled)
* `debounce` — debounced input handler
* Utility styling is handled via Tailwind CSS classes + inline styles (no safelisting needed)