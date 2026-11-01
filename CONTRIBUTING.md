# Contributing to Samaroh

Thank you for your interest in contributing to **Samaroh (समारोह)**! We welcome contributions that maintain our high standards for code quality, security, performance, accessibility, and user delight.

---

## 1. Development Principles

1. **Zero `any` TypeScript**: All code must pass strict TypeScript checks without `any`, `as unknown`, or `@ts-ignore`.
2. **Accessibility First**: All new interactive UI components must maintain full keyboard navigability and WCAG 2.2 AA contrast.
3. **Comprehensive Test Coverage**: Any new feature or bug fix must include automated Vitest tests.
4. **Zero Vulnerabilities**: Ensure `npm audit --omit=dev --audit-level=high` reports zero vulnerabilities.

---

## 2. Pull Request Verification

Before opening a pull request, ensure the following pass locally:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run test:e2e
```
