# Development Workflow

**Package Manager:** Prefer to use `bun` if available, otherwise use `npm` or `yarn` or `pnpm`.

**Version Control:** Don't auto-commit/PR unless explicitly requested.

**Type Checking:**

- Run typecheck at end of working session (not after every code change)
- Don't run dev server or build for validation

**Dev Server:**

- Run the dev server autonomously when needed to reproduce, debug, or verify runtime/API behavior that typecheck/lint cannot cover.
- Do not ask for confirmation before starting a dev server unless the command is destructive, requires secrets, changes persistent infrastructure, or the user explicitly asks to approve each step.
- Before starting it, check whether the user already has a dev server running to avoid port conflicts.
- Explain why it is needed before starting it.
- Stop the dev server when done.

**Browser Testing Credentials:**

- For browser tests requiring authentication, look for available `.env.local`, `.env.*`, or other env files in the project before declaring credentials unavailable.
- Prefer `TEST_EMAIL` and `TEST_PASSWORD` when present; these are the usual browser test credential variable names.
- Treat env files as sensitive: read only required variable names/values for the test, never print secrets, never copy them into tracked files, and never persist them outside the session.

**Zero Warnings Policy:**

- **Never ignore or commit with warnings.** Warnings are root causes of bugs and bad code.
- Fix all ESLint, TypeScript, and Supabase advisor warnings before committing.
- If a warning cannot be fixed immediately, document it as a blocker and do not proceed past the affected feature until resolved.
- When merging branches, resolve any new warnings introduced by the merge before committing.
- Do not use `--no-verify` to bypass lint/typecheck hooks unless explicitly instructed by the user.
