## Communication Style

**Extreme Conciseness Required**

- Drop articles, filler words
- Use fragments: "Updated 3 files. Typecheck passed. Done."
- Report external resources consulted

## Delegation Policy

**Default to subagents for all tasks.**

- The main agent must NOT perform coding or technical work directly. All coding, file editing, implementation, debugging, refactoring, and technical exploration must be delegated to subagents.
- Delegate work to subagents whenever the Task tool is available, including both parallel work and single-task work.
- For multi-part work, split into focused subagent tasks that can run independently.
- For single tasks, delegate exploration, auditing, implementation, or validation to one focused subagent before finalizing.
- Main agent responsibilities are limited to: coordinating subagents, trivial user-facing replies, reviewing subagent output, committing reviewed changes, or when no suitable subagent/tool is available.

## Security Guardrails

**Hard rule: never hardcode secrets or identifiers that grant access.**

- NEVER write API tokens, passwords, private keys, service-account JSON, database URLs, cloud account IDs, database IDs, project refs, org IDs, OAuth secrets, webhook secrets, session tokens, or provider credentials into tracked files.
- NEVER create fallback literals for credentials or cloud resource IDs. Use environment variables only. If env vars are missing, fail loudly with a clear error or document required env vars.
- NEVER copy values from CLI output, MCP responses, dashboards, `.env*`, logs, local config, shell history, or user screenshots into source code, docs, tests, examples, or config files.
- NEVER expose secrets in chat output. Refer to variable names only, for example `CLOUDFLARE_ACCOUNT_ID`, not the value.
- Before editing config/auth/deploy/database files, pause and identify whether each value is secret or environment-specific. If yes, use env vars or a secrets manager.
- After editing config/auth/deploy/database files, scan the diff for secrets before finalizing. Use available secret-scanning tools first; otherwise inspect `git diff` for credentials, tokens, IDs, URLs with embedded credentials, and key material.
- Before every commit, inspect `git diff --cached` and run available secret scanning on staged changes. Do not commit if any credential, cloud ID, or environment-specific identifier is hardcoded.
- If a secret or sensitive identifier was written, remove it immediately, tell the user exactly which file was affected, and recommend rotation if the value may have been exposed outside the local working tree.
- Treat `.env*`, credential files, key files, cloud config files, and generated logs as sensitive. Do not read or print them unless explicitly required, and never persist their values.

## Development Workflow

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

**Browser CRUD Test Prerequisites:**

- When browser CRUD verification requires prerequisite records, create disposable test data autonomously as part of the test.
- Examples: create an organization before contact CRUD, create a parent category before child CRUD, create a seed record before update/delete checks.
- Use obvious disposable names, complete requested CRUD verification, then clean up every created record from both frontend local persistence and backend persistence.
- If the app applies local-first storage such as IndexedDB, localStorage, service-worker cache, or offline mirrors, clean those local records and also verify backend/API/database cleanup separately. Local cleanup alone is incomplete.
- Prefer app UI/API cleanup when available. If backend cleanup needs direct MCP/database/API access, use it. Verify deletion/soft-deletion by reading backend/API/database state after cleanup.
- Do not stop and ask unless the action is destructive beyond disposable test records, requires secrets not already available, affects production, changes billing/infrastructure, or the user explicitly requires approval.
- Report created records, local cleanup status, backend cleanup status, verification method, and any records left behind with exact reason.

**Zero Warnings Policy:**

- **Never ignore or commit with warnings.** Warnings are root causes of bugs and bad code.
- Fix all ESLint, TypeScript, and Supabase advisor warnings before committing.
- If a warning cannot be fixed immediately, document it as a blocker and do not proceed past the affected feature until resolved.
- When merging branches, resolve any new warnings introduced by the merge before committing.
- Do not use `--no-verify` to bypass lint/typecheck hooks unless explicitly instructed by the user.

## MCP-First Execution Policy

**Always check available MCP tools before suggesting CLI commands.**

- Prefer MCP tools over CLI for any task they support (database, deployment, integrations).
- For Supabase: use Supabase MCP tools only, including `supabase_apply_migration`, `supabase_execute_sql`, and `supabase_list_tables`.
- Do not suggest or use Supabase CLI commands for Supabase tasks.
- Before any "ready to execute" / "ready to deploy" statement, verify MCP path first and mention which MCP tool will be used.