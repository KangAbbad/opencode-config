# MCP-First Execution Policy

**Always check available MCP tools before suggesting CLI commands.**

- Prefer MCP tools over CLI for any task they support (database, deployment, integrations).
- For Supabase: use Supabase MCP tools only, including `supabase_apply_migration`, `supabase_execute_sql`, and `supabase_list_tables`.
- Do not suggest or use Supabase CLI commands for Supabase tasks.
- Before any "ready to execute" / "ready to deploy" statement, verify MCP path first and mention which MCP tool will be used.
