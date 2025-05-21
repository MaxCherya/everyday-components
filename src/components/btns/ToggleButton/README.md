# 🔁 ToggleButton

An adaptive toggle-style button component that can switch between two states, with built-in support for loading indicators, debounce/throttle behavior, custom colors, and icon swapping.

---

## 🚀 Usage

```tsx
import ToggleButton from 'everyday-components';

const App = () => (
  <>
    <ToggleButton
      isToggled={true}
      size="md"
      offLabel="Turn On"
      iconLeft="✅"
      iconRight="➡️"
      iconLeftAfter="❌"
      iconRightAfter="⬅️"
      customPrimaryColor="#1D4ED8"
      customSecondaryColor="#F1F5F9"
    >
      Turned On
    </ToggleButton>
  </>
);
```

---

## ⚙️ Props

| Prop                   | Type                                                                     | Default  | Description                                       |
| ---------------------- | ------------------------------------------------------------------------ | -------- | ------------------------------------------------- |
| `size`                 | `"xs"` \| `"sm"` \| `"base"` \| `"md"` \| `"lg"` \| `"xl"` \| `"custom"` | `"base"` | Text size of the button                           |
| `isLoading`            | `boolean`                                                                | `false`  | Shows animated dots (⠁⠂⠄) while locked            |
| `fullWidth`            | `boolean`                                                                | `false`  | Makes button span the full width of its container |
| `iconLeft`             | `ReactNode` \| `string`                                                  | `—`      | Icon/emoji before text (when toggled `on`)        |
| `iconRight`            | `ReactNode` \| `string`                                                  | `—`      | Icon/emoji after text (when toggled `on`)         |
| `iconLeftAfter`        | `ReactNode` \| `string`                                                  | `—`      | Icon/emoji before text (when toggled `off`)       |
| `iconRightAfter`       | `ReactNode` \| `string`                                                  | `—`      | Icon/emoji after text (when toggled `off`)        |
| `isToggled`            | `boolean`                                                                | `false`  | Current state of the button                       |
| `offLabel`             | `string`                                                                 | `—`      | Text shown when `isToggled` is `false`            |
| `customPrimaryColor`   | `string (hex)`                                                           | `—`      | Main color for the "on" state                     |
| `customSecondaryColor` | `string (hex)`                                                           | `—`      | Main color for the "off" state                    |
| `debounceMs`           | `number`                                                                 | `—`      | Debounce delay for click events                   |
| `throttleMs`           | `number`                                                                 | `—`      | Throttle lock duration                            |
| `onClick`              | `() => void`                                                             | `—`      | Main click handler                                |
| `onThrottleStart`      | `() => void`                                                             | `—`      | Triggered when throttle lock begins               |
| `onDebounceStart`      | `() => void`                                                             | `—`      | Triggered when debounce lock begins               |
| `className`            | `string`                                                                 | `—`      | Additional Tailwind/CSS classes                   |
| `children`             | `ReactNode`                                                              | `—`      | Label shown when `isToggled` is `true`            |

---

## 🎨 Theming Logic

Same color logic as `GeneralButton`:

* If only `customPrimaryColor` is provided → used for both background and hover on "on" state
* If only `customSecondaryColor` is provided → used on "off" state
* If both provided → hover swaps between them depending on `isToggled`
* If neither provided → fallback to blue (`#2563eb`) and gray (`#e5e7eb`)
* Disabled/locked state uses softened tones via `getColors`

Colors are applied **inline**, so no Tailwind safelisting required.

---

## 🧠 Behavior Details

### Toggle Labels & Icons

* `isToggled === true`: shows `children`, `iconLeft`, `iconRight`
* `isToggled === false`: shows `offLabel`, `iconLeftAfter`, `iconRightAfter`

### Loading & Locking States

When locked (`isLoading`, throttled, or debounced):

* Button becomes unclickable
* Shows animated `...` inside the button (visible for 1–3 dots)

---

## 🔒 Accessibility

* Uses native `<button>` element
* Keyboard-accessible
* Optional `aria-label` can be added via `...rest` props
* Visually communicates disabled/locked states

---

## 🔁 Dependencies

* `useSmartClick` — internal throttle & debounce handler
* `getColors` — utility for primary/secondary/hover/disabled styles
* `adjustBrightness`, `hexToRgb`, etc. — color manipulation tools