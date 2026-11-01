# Security Policy for Samaroh

## Reporting a Vulnerability

Please open a private security advisory on this repository rather than a public issue.

## Threat Model & Security Controls

| Threat                               | Control                                                                                                                | Implementation                                                                     |
| :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **Leaked AI Credentials**            | `GEMINI_API_KEY` is read strictly on the server by isolated route handlers. Zero secrets bundled to client.            | [`gemini.ts`](src/ai/gemini.ts), [`provider.ts`](src/ai/provider.ts)               |
| **Cross-Site Scripting (XSS)**       | Per-request cryptographic nonce CSP with `strict-dynamic`; zero `unsafe-inline` or `unsafe-eval` in production.        | [`proxy.ts`](src/proxy.ts), [`csp.ts`](src/server/csp.ts)                          |
| **Clickjacking & Downgrades**        | `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, HSTS preload.                    | [`next.config.ts`](next.config.ts), [`vercel.json`](vercel.json)                   |
| **Malformed / Oversized Injections** | Strict Zod validation on every API endpoint, body size capping (64 KB; 400 KB for assistant context).                  | [`guard.ts`](src/server/guard.ts), [`schemas.ts`](src/server/schemas.ts)           |
| **Rate Abuse & Quota Exhaustion**    | Per-client sliding window throttling, 30-minute memoization cache, strict execution time budgets.                      | [`throttle.ts`](src/server/throttle.ts), [`memo.ts`](src/server/memo.ts)           |
| **Prompt Injection**                 | User input sanitized in delimited tagged structures with XML escaping; tool proposals require explicit human approval. | [`prompts.ts`](src/ai/prompts.ts), [`tools.ts`](src/ai/tools.ts)                   |
| **Untrusted Model Output**           | `cleanBlueprint` sanitization, fallback tier enforcement, and strict Zod runtime schema re-parsing.                    | [`assemble.ts`](src/core/assemble.ts), [`changes.ts`](src/core/changes.ts)         |
| **Database Authorization Tampering** | Granular Firestore security rules with cryptographic role checks for owner, editor, and viewer tiers.                  | [`firestore.rules`](firestore.rules), [`rules/plans.test.ts`](rules/plans.test.ts) |
| **Tampered Local Storage**           | All records parsed from `localStorage` validate through `PlanSchema.safeParse`; corrupt records are purged.            | [`local.ts`](src/store/local.ts)                                                   |
| **Vulnerable Dependencies**          | Automated CI audit via `npm audit --omit=dev --audit-level=high` (0 vulnerabilities).                                  | [`.github/workflows/ci.yml`](.github/workflows/ci.yml)                             |
