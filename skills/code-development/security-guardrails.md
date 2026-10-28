# Security Guardrails

**Hard rule: never hardcode secrets or identifiers that grant access.**

- NEVER write API tokens, passwords, private keys, service-account JSON, database URLs, cloud account IDs, database IDs, project refs, org IDs, OAuth secrets, webhook secrets, session tokens, or provider credentials into tracked files.
- NEVER create fallback literals for credentials or cloud resource IDs. Use environment variables only. If env vars are missing, fail loudly with a clear error or document required env vars.
- NEVER copy values from CLI output, MCP responses, dashboards, `.env*`, logs, local config, shell history, or user screenshots into source code, docs, tests, examples, or config files.
- NEVER expose secrets in chat output. Refer to variable names only, for example `CLOUDFLARE_ACCOUNT_ID`, not the value.
- Before editing config/auth/deploy/database files, pause and identify whether each value is secret or environment-specific. If yes, use env vars or a secrets manager.
- After editing config/auth/deploy/database files, scan the diff for secrets. Use available secret-scanning tools first; otherwise inspect `git diff` for credentials, tokens, IDs, URLs with embedded credentials, and key material.
- Before every commit, inspect `git diff --cached` and run available secret scanning on staged changes. Do not commit if any credential, cloud ID, or environment-specific identifier is hardcoded.
- If a secret or sensitive identifier was written, remove it immediately, tell the user exactly which file was affected, and recommend rotation if the value may have been exposed outside the local working tree.
- Treat `.env*`, credential files, key files, cloud config files, and generated logs as sensitive. Do not read or print them unless explicitly required, and never persist their values.
