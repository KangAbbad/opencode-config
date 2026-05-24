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

## Development Workflow

**Package Manager:** Prefer to use `bun` if available, otherwise use `npm` or `yarn` or `pnpm`.

**Version Control:** Don't auto-commit/PR unless explicitly requested.

**Type Checking:**

- Run typecheck at end of working session (not after every code change)
- Don't run dev server or build for validation

**Dev Server:**

- Run the dev server when needed to reproduce, debug, or verify runtime behavior that typecheck/lint cannot cover.
- Before starting it, check whether the user already has a dev server running to avoid port conflicts.
- Explain why it is needed before starting it.
- Stop the dev server when done.

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