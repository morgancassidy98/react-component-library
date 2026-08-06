# CMT UI

A accessible, elegant React component library built with TypeScript. Designed with WCAG 2.1 and Section 508 compliance at its core — not as an afterthought.

[![Storybook](https://img.shields.io/badge/Storybook-Live-ff4785?logo=storybook)](https://6a739c264d21ac19adf2fc20-gjxlpmmmad.chromatic.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

---

## Overview

CMT UI is a front-end component library built for developers who take accessibility seriously. Every component is authored to meet WCAG 2.1 AA standards and Section 508 requirements, with explicit ARIA wiring, keyboard navigation, focus management, and screen reader testing built into the design of each component — not retrofitted after the fact.

The library was built by [Cassidy Morgan Thorp](https://cassidymorganthorp.com), a Front-End Developer and UX Engineer with 5+ years of experience building accessible, government-scale web platforms.

---

## Features

- **WCAG 2.1 AA compliant** — every component meets or exceeds AA contrast and interaction requirements
- **Section 508 ready** — designed for federal and government-adjacent applications
- **Full TypeScript support** — complete prop typing with IntelliSense support
- **Consistent design system** — CSS custom properties for colors, typography, spacing, and shadows
- **Responsive by default** — mobile-first layouts with sensible breakpoints
- **Storybook documentation** — interactive component explorer with autodocs

---

## Components

| Component | Description |
|---|---|
| `Button` | 7 variants, 3 sizes, loading state, icon slots |
| `Badge` | 7 variants, 3 sizes, 3 shapes |
| `Alert` | 4 variants, dismissible, aria-live regions |
| `Input` | Label, helper text, error state, all input types |
| `Select` | Grouped options, placeholder, error state |
| `Checkbox` | Indeterminate state, error, helper text |
| `CheckboxGroup` | Select all, disabled options, fieldset/legend |
| `Radio` | Accessible radio button with helper text |
| `RadioGroup` | Controlled group, fieldset/legend, error state |
| `Modal` | Focus trapping, focus restoration, backdrop, inert |
| `SkipNav` | Skip to main content, Section 508 pattern |
| `Toast` | Auto-dismiss, progress bar, portal rendering |
| `Card` | Compound component, 3 variants, clickable |
| `Nav` | Responsive, hamburger menu, aria-current |
| `Tabs` | Roving tabindex, 3 variants, keyboard navigation |
| `Accordion` | Single/multiple mode, animated panels, aria-expanded |

---

## Installation

```bash
# Clone the repository
git clone https://github.com/morgancassidy98/react-component-library.git

# Install dependencies
cd react-component-library
npm install

# Start Storybook
npm run storybook

# Start dev server
npm run dev
```

---

## Usage

Import the global tokens first in your app entry point:

```tsx
// main.tsx
import './styles/tokens.css';
```

Then import components as needed:

```tsx
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Modal } from './components/Modal/Modal';

// Button
<Button variant="primary" size="md">Save Changes</Button>
<Button variant="danger" isLoading>Deleting...</Button>

// Input
<Input
  label="Email Address"
  type="email"
  required
  helperText="We will never share your email."
  errorText="Please enter a valid email address."
/>

// Modal
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </>
  }
>
  This action cannot be undone.
</Modal>
```

---

## Accordion

```tsx
import { Accordion } from './components/Accordion/Accordion';

// Single mode — opening one closes others
<Accordion defaultOpen="item1" mode="single">
  <Accordion.Item value="item1">
    <Accordion.Trigger>What is CMT UI?</Accordion.Trigger>
    <Accordion.Panel>
      CMT UI is an accessible React component library...
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="item2">
    <Accordion.Trigger>How do I install it?</Accordion.Trigger>
    <Accordion.Panel>
      Clone the repository and run npm install...
    </Accordion.Panel>
  </Accordion.Item>
</Accordion>

// Multiple mode — any number can be open simultaneously
<Accordion mode="multiple" defaultOpen={['item1', 'item2']}>
  ...
</Accordion>
```

---

## Toast System

Toast requires a provider at your app root:

```tsx
// main.tsx
import { ToastProvider, ToastContainer } from './components/Toast/ToastContext';

<ToastProvider>
  <App />
  <ToastContainer />
</ToastProvider>
```

Then trigger toasts from anywhere in the tree:

```tsx
import { useToast } from './components/Toast/useToast';

const { toast } = useToast();

toast.success('Changes saved successfully.');
toast.danger('Something went wrong.', { title: 'Error' });
toast.info('New update available.', { duration: 8000 });
```

---

## Design Tokens

All visual properties are defined as CSS custom properties in `src/styles/tokens.css`. Override them to theme the library:

```css
:root {
  --color-primary:        #2D5D7B;
  --color-primary-hover:  #1e4259;
  --color-danger:         #4C061D;
  --color-success:        #86A873;
  --color-warning:        #7b652d;

  --font-display:         'Cormorant Garamond', Georgia, serif;
  --font-body:            'Jost', system-ui, sans-serif;

  --radius:               4px;
  --radius-lg:            8px;
  --radius-pill:          100px;

  --transition:           0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Accessibility

Accessibility is the primary design constraint of this library, not a feature. Every component is built to meet WCAG 2.1 AA and Section 508 requirements. Below are the specific patterns implemented:

### ARIA Patterns

**Labels and Descriptions**
Every interactive element has an explicit label. Form components use `htmlFor`/`id` pairing for label association and `aria-describedby` for helper and error text. Error messages use `role="alert"` so they are announced immediately when they appear.

**Live Regions**
Alert uses `aria-live="polite"` for informational messages and `role="alert"` (equivalent to `aria-live="assertive"`) for errors. Toast uses the same pattern — success, info, and warning toasts are polite; danger toasts are assertive. The Nav mobile menu announces its open/close state via a polite live region.

**Modal**
Modal implements the full ARIA dialog pattern: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` linking to the title, and `aria-describedby` linking to the body. The background application root receives the `inert` attribute when a modal is open, preventing interaction with and announcement of background content by assistive technology.

**Focus Management**
Modal traps focus within the dialog using a roving focus implementation that handles both Tab and Shift+Tab cycling. When the modal closes, focus is restored to the element that triggered it. Toast auto-focuses the first focusable element when opened.

**Accordion**
Accordion triggers use `aria-expanded` to communicate open/closed state and `aria-controls` linking to the panel ID. Each panel uses `role="region"` with `aria-labelledby` pointing back to its trigger, so screen readers announce the trigger label when entering the panel. Triggers are wrapped in `<h3>` elements to provide heading semantics — screen reader users can navigate accordion sections by heading. The panel expand/collapse animation uses `grid-template-rows` from `0fr` to `1fr`, which reliably animates from zero height to auto height without requiring a hardcoded `max-height` value.

**Tabs**
Tabs implements the ARIA authoring practices roving tabindex pattern. Only the active tab is in the document tab order (`tabIndex={0}`); inactive tabs use `tabIndex={-1}`. Arrow keys move between tabs; Tab moves to the panel. Home and End jump to the first and last tab. Each tab is linked to its panel via `aria-controls` and `aria-labelledby`.

**Navigation**
Nav uses `aria-current="page"` on the active item — the correct attribute for identifying the current page in a navigation landmark, as opposed to `aria-selected` which is reserved for widgets like tabs and listboxes. Disabled nav items use `aria-disabled="true"` and `tabIndex={-1}` rather than the `disabled` attribute, which is not valid on anchor elements.

**Forms**
Radio and checkbox groups use `<fieldset>` and `<legend>` — the only semantically correct way to group related form controls. Screen readers announce the legend before each option, so users always know which group they are in. The required asterisk is hidden from screen readers with `aria-hidden="true"`; the `required` attribute on the input handles the announcement.

**Skip Navigation**
SkipNav renders as a native anchor element that is visually hidden until it receives keyboard focus, at which point it slides into view. It uses a JavaScript click handler to set `tabindex="-1"` on the target element, focus it programmatically, and then remove the tabindex on blur — preserving the natural tab order of the page.

### Keyboard Navigation

| Component | Keys |
|---|---|
| Button | `Enter`, `Space` |
| Checkbox / Radio | `Space` to toggle |
| Modal | `Escape` to close, `Tab` / `Shift+Tab` to cycle focus |
| Tabs | `Arrow Left` / `Arrow Right` to move, `Home` / `End` to jump, `Tab` to enter panel |
| Accordion | `Enter` / `Space` to toggle, `Tab` to move between triggers |
| Nav | `Tab` to navigate, `Enter` to activate |
| Select | Native browser keyboard support |
| Toast | `Tab` to focus dismiss button, `Enter` / `Space` to dismiss |

### Color Contrast

All text/background color combinations in CMT UI meet or exceed the WCAG 2.1 AA contrast ratio of 4.5:1 for normal text and 3:1 for large text. Variant colors were selected and verified using the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

---

## Layout Utilities

CMT UI includes shared layout utilities for building accessible form layouts:

```tsx
{/* Stack form fields vertically */}
<div className="form-stack">
  <Input label="First Name" fullWidth />
  <Input label="Last Name" fullWidth />
</div>

{/* Side by side on tablet+, stacked on mobile */}
<div className="form-row">
  <Input label="First Name" fullWidth />
  <Input label="Last Name" fullWidth />
</div>

{/* Screen reader only text */}
<span className="sr-only">Additional context for screen readers</span>
```

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome | ✓ Latest |
| Firefox | ✓ Latest |
| Safari | ✓ Latest |
| Edge | ✓ Latest |
| Mobile Safari | ✓ iOS 15+ |
| Chrome Android | ✓ Latest |

---

## Built With

- [React 18](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Storybook 8](https://storybook.js.org/)
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [Jost](https://fonts.google.com/specimen/Jost) via Google Fonts

---

## Author

**Cassidy Morgan Thorp**
Front-End Developer & UX Engineer
[cassidymorganthorp.com](https://cassidymorganthorp.com) · [LinkedIn](https://linkedin.com/in/Cassidy-Morgan-Thorp) · [GitHub](https://github.com/morgancassidy98)

---

## License

MIT © Cassidy Morgan Thorp