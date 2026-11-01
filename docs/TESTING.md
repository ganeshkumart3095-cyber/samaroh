# Samaroh Automated Testing Architecture & Quality Strategy

Samaroh implements a multi-tier testing pyramid combining fast deterministic unit tests, realistic component rendering, security rule emulator verification, and end-to-end browser automation.

---

## 1. Test Suite Overview

| Category               | Framework / Tool                       |       Test Suites       |   Target Coverage    | Scope                                                     |
| :--------------------- | :------------------------------------- | :---------------------: | :------------------: | :-------------------------------------------------------- |
| **Unit & Integration** | Vitest + React Testing Library         | 40+ suites (224+ tests) | > 95% Core Coverage  | Domain math, AI parsers, state mutations, UI tabs         |
| **Database Security**  | Firebase Rules Unit Testing            |    1 suite (5 tests)    | 100% Rules Coverage  | Firestore emulator write/read role boundaries             |
| **End-to-End (E2E)**   | Playwright (Chromium)                  |        29 tests         |   Core user flows    | Intake wizard, dashboard tabs, mobile viewport layout     |
| **Code Hygiene**       | Vitest (`src/quality/hygiene.test.ts`) |    5 automated tests    | 100% Tree Compliance | Zero `any`, zero `eval`, zero credentials, docs integrity |

---

## 2. Running Test Commands

```bash
# Run full Vitest unit & integration test suite
npm test

# Run test coverage report
npm run coverage

# Run Firestore security rules test against local emulator
npm run test:rules

# Run end-to-end Playwright tests across Desktop & Mobile
npm run test:e2e
```
