# 🔘 GeneralButton

A flexible, themeable, and accessible button component with support for debounce/throttle, loading states, polymorphic rendering (`<button>` or `<a>`), and custom colors.

---

## 🚀 Usage

```tsx
import { GeneralButton } from 'everyday-components';

const App = () => (
  <>
    <GeneralButton>
      Default Button
    </GeneralButton>

    <GeneralButton
      variant="secondary"
      size="lg"
      iconLeft="🔥"
      iconRight="➡️"
      customPrimaryColor="#CD3514"
      customSecondaryColor="#F4F4F4"
      className="mt-4"
    >
      Custom Colors
    </GeneralButton>
  </>
);
````

---

## ⚙️ Props

| Prop                   | Type                                                                     | Default     | Description                                    |
| ---------------------- | ------------------------------------------------------------------------ | ----------- | ---------------------------------------------- |
| `variant`              | `"primary"` \| `"secondary"`                                             | `"primary"` | Visual style variant                           |
| `size`                 | `"xs"` \| `"sm"` \| `"base"` \| `"md"` \| `"lg"` \| `"xl"` \| `"custom"` | `"base"`    | Font size preset                               |
| `isLoading`            | `boolean`                                                                | `false`     | Shows animated dots (⠁⠂⠄) as loading indicator |
| `fullWidth`            | `boolean`                                                                | `false`     | Makes button stretch to full container width   |
| `iconLeft`             | `ReactNode` \| `string`                                                  | `—`         | Icon/emoji before text                         |
| `iconRight`            | `ReactNode` \| `string`                                                  | `—`         | Icon/emoji after text                          |
| `disabled`             | `boolean`                                                                | `false`     | Disables the button                            |
| `as`                   | `"button"` \| `"a"` \| `ElementType`                                     | `"button"`  | Renders as HTML tag or custom component        |
| `href`                 | `string`                                                                 | `—`         | URL if `as="a"`                                |
| `target`               | `string`                                                                 | `—`         | Link target (e.g. `_blank`)                    |
| `ariaLabel`            | `string`                                                                 | `—`         | ARIA accessibility label                       |
| `noOutlines`           | `boolean`                                                                | `false`     | Removes default border styling                 |
| `debounceMs`           | `number`                                                                 | `—`         | Debounce duration for click events             |
| `throttleMs`           | `number`                                                                 | `—`         | Throttle duration for click events             |
| `customPrimaryColor`   | `string (hex)`                                                           | `—`         | Main color for background/text                 |
| `customSecondaryColor` | `string (hex)`                                                           | `—`         | Hover color or secondary theme                 |
| `onClick`              | `() => void`                                                             | `—`         | Main click handler                             |
| `onThrottleStart`      | `() => void`                                                             | `—`         | Fired when throttle lock activates             |
| `onDebounceStart`      | `() => void`                                                             | `—`         | Fired when debounce lock activates             |
| `className`            | `string`                                                                 | `—`         | Additional CSS or Tailwind classes             |
| `children`             | `ReactNode`                                                              | `—`         | Content inside the button                      |

---

## 🎨 Theming Logic

* If only `customPrimaryColor` is provided → it becomes both background and hover color
* If only `customSecondaryColor` is provided → used for hover/border only
* If both provided → hover swaps colors (primary ↔ secondary)
* If neither provided → defaults to `#2563eb` (blue) and `#e5e7eb` (gray)
* Disabled state generates softened tone based on primary color

All colors are applied via **inline styles** — no Tailwind safelisting needed.

---

## 🧠 Behavior Details

### Loading State

When `isLoading` or `isDebounced` or `isThrottled` is `true`:

* Button shows animated `...` indicator
* Click is locked temporarily

### Debounce & Throttle

* Controlled via `debounceMs` and `throttleMs`
* Prevents rapid-fire clicking or double-submits
* Optional callbacks `onDebounceStart` and `onThrottleStart` let you track status

---

## 🔒 Accessibility

* ARIA-compliant with `aria-label`
* Supports keyboard navigation
* Handles `disabled` states natively

---

## 🔁 Dependencies

* `useSmartClick` — Custom debounce/throttle logic
* `getColors` — Color theme generator from hex
* Utility functions:

  * `debounce(fn, ms)`
  * `useThrottle(fn, ms)`
  * `hexToRgb`, `adjustBrightness`, etc.

---