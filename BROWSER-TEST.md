**Browser Testing Requirements:**

- When the user asks for browser testing, load and use the `playwright-cli` skill autonomously for real browser interaction.
- Prefer headed browser when available; headless is acceptable when headed is unavailable or impractical.
- Do not substitute simulated testing, manual reasoning, code inspection, or assumed behavior for browser verification.
- Navigate the app, interact with UI controls, observe real page state, capture errors, and verify outcomes in the browser.
- Do not create, modify, or write unit/e2e/spec/test code files (`*.spec.*`, `*.test.*`, `*.e2e.*`, or similar) unless the user explicitly asks for test code.
- Ask only after following **Browser Testing Credentials** checks, or when required environment setup or approval for non-disposable/destructive actions is missing.

**Browser Testing Credentials:**

- For browser tests requiring authentication, look for available `.env.local`, `.env.*`, or other env files in the project before declaring credentials unavailable.
- Prefer `TEST_EMAIL` and `TEST_PASSWORD` when present; these are the usual browser test credential variable names.
- Treat env files as sensitive: read only required variable names/values for the test, never print secrets, never copy them into tracked files, and never persist them outside the session.

**Browser CRUD Test Prerequisites:**

- When browser CRUD verification requires prerequisite records, create disposable test data autonomously as part of the test.
- Examples: create an organization before contact CRUD, create a parent category before child CRUD, create a seed record before update/delete checks.
- Use obvious disposable names, complete requested CRUD verification, then clean up every created record from both frontend local persistence and backend persistence.
- If the app applies local-first storage such as IndexedDB, localStorage, service-worker cache, or offline mirrors, clean those local records and also verify backend/API/database cleanup separately. Local cleanup alone is incomplete.
- Prefer app UI/API cleanup when available. If backend cleanup needs direct MCP/database/API access, use it. Verify deletion/soft-deletion by reading backend/API/database state after cleanup.
- Do not stop and ask unless the action is destructive beyond disposable test records, requires secrets not already available, affects production, changes billing/infrastructure, or the user explicitly requires approval.
- Report created records, local cleanup status, backend cleanup status, verification method, and any records left behind with exact reason.
