# Samaroh Accessibility Conformance Specification (WCAG 2.2 AA)

Samaroh (समारोह) is designed and engineered to meet and exceed **Web Content Accessibility Guidelines (WCAG) 2.2 Level AA** standards.

---

## 1. Core Conformance Principles

### A. Perceivable

- **High Contrast Ratios**: All text, interactive buttons, badges, and border elements maintain a contrast ratio >= 4.5:1 against their backgrounds (e.g., `#f59e0b` Marigold on `#080c1d` Obsidian Navy provides 7.2:1 contrast).
- **Non-Text Contrast**: Icons, focus rings, and custom Diya meters maintain >= 3.0:1 contrast against adjacent colors.
- **Multilingual Phonetics**: All localized text blocks declare proper HTML `lang` attributes (e.g. `lang="hi"`, `lang="ta"`, `lang="te"`, `lang="en"`) to enable correct pronunciation across screen readers like NVDA, JAWS, and VoiceOver.

### B. Operable

- **Full Keyboard Navigation**: Every interactive element is accessible via standard keyboard controls (`Tab`, `Shift+Tab`, `Enter`, `Space`).
- **Roving Tabindex on Tablists**: The main dashboard tabs implement the WAI-ARIA tablist design pattern with arrow-key switching (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
- **Skip Navigation Link**: High-contrast skip link (`#main-content`) prominently available for keyboard users to bypass header banners.
- **No Sideways Scrolling on Mobile**: Strict viewport compliance ensuring `scrollWidth <= clientWidth` on all viewport widths (including 360px and 412px mobile devices).

### C. Understandable

- **Live Region Announcements (`aria-live="polite"`)**: Real-time status updates (such as saving to cloud, assistant thoughts, and validation errors) are announced unobtrusively.
- **Form Error Association**: Every input error is linked via `aria-describedby` to its corresponding error message, and focus moves automatically to the first invalid field upon submission.

### D. Robust

- **Automated Continuous Accessibility Auditing**: Playwright with `@axe-core/playwright` runs across every page and modal in the GitHub Actions CI pipeline, enforcing zero critical or serious accessibility violations.
