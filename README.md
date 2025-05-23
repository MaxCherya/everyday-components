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
* Typescript

---

## 🧩 Components

Components are organized by category. Each one lives in its own folder and includes a local `README.md` for full documentation.

### 🔘 Buttons

| Component                                                        | Description                                                                                |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`GeneralButton`](./src/components/btns/GeneralButton/README.md) | A polymorphic, themeable button with icons, loading, debounce/throttle, and custom colors. |
| [`ToggleButton`](./src/components/btns/ToggleButton/README.md)   | An adaptive toggle-style button component that can switch between two states               |

### 🧱 Layout (coming soon)

| Component | Description     |
| --------- | --------------- |
| `Stack`   | *(Coming soon)* |
| `Grid`    | *(Coming soon)* |

### 📦 Inputs

| Component                                                  | Description                                                                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`TextInput`](./src/components/inputs/TextInput/README.md) | A highly customizable and accessible input field with icons, label/hint placement, debounce, and validation. |
| [`PasswordInput`](./src/components/inputs/PasswordInput/README.md) | A secure, real-time validating password field with strength meter, breach detection, full rule control, and theming. |

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