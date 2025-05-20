# 🧩 everyday-components

A flexible component library for modern web apps, built with **React + TypeScript**.  
Includes reusable, customizable UI components that work with or without Tailwind CSS.

---

## 📦 Installation

```bash
npm install everyday-components
````

or

```bash
yarn add everyday-components
```

---

## ⚙️ Requirements

* **React** 17 or 18
* Tailwind CSS
---

## 🚀 Usage: GeneralButton

```tsx
import { GeneralButton } from 'everyday-components';

const App = () => (
  <>
    <GeneralButton variant="primary">
      Default Primary
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
```

---

## 🧩 Props

| Prop                   | Type                                                                     | Description                         |
| ---------------------- | ------------------------------------------------------------------------ | ----------------------------------- |
| `variant`              | `"primary"` \| `"secondary"`                                             | Button variant style                |
| `size`                 | `"xs"` \| `"sm"` \| `"base"` \| `"md"` \| `"lg"` \| `"xl"` \| `"custom"` | Size preset                         |
| `iconLeft`             | `ReactNode` \| `string`                                                  | Icon or emoji before text           |
| `iconRight`            | `ReactNode` \| `string`                                                  | Icon or emoji after text            |
| `fullWidth`            | `boolean`                                                                | Makes button expand to full width   |
| `customPrimaryColor`   | `string (hex)`                                                           | Custom background color             |
| `customSecondaryColor` | `string (hex)`                                                           | Custom hover/border color           |
| `as`                   | `"button"` \| `"a"` \| `ElementType`                                     | Element to render                   |
| `href`                 | `string`                                                                 | Used when `as="a"`                  |
| `onClick`              | `() => void`                                                             | Click handler                       |
| `isLoading`            | `boolean`                                                                | Shows a loading spinner or ellipsis |
| `disabled`             | `boolean`                                                                | Disables the button                 |
| `debounceMs`           | `number`                                                                 | Debounces click event               |
| `className`            | `string`                                                                 | Additional CSS or Tailwind classes  |
| `children`             | `ReactNode`                                                              | Button content (text or JSX)        |

---

## 🎨 Dynamic Color Logic

* If only `customPrimaryColor` is provided → used for background, hover, and text
* If only `customSecondaryColor` is provided → used for border, hover, and text
* If both are provided → hover swaps `primary <-> secondary` colors for background, text, and border
* Uses **inline styles**, so no Tailwind safelist or config is needed

---

## ✅ Live Preview (Local Dev)

To develop or preview locally:

```bash
npm run dev
```

---

## 📘 License

MIT — free to use in personal or commercial projects.
Please credit the author or project in public usage if possible.

---