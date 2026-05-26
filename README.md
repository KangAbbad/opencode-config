# OpenCode Configuration

Personal OpenCode setup for work, shared for anyone around the world who wants to understand, reuse, or adapt my AI coding agent environment.

This repository contains my global OpenCode configuration, agent behavior rules, provider and model setup, MCP integrations, permissions, plugins, and terminal UI preferences.

> [!NOTE]  
> ☝️ I’m currently looking for a job, particularly with companies in Indonesia that offer on-site or remote positions. I’m also open to fully remote roles with companies based overseas. Here's [my Linkedin profile](https://www.linkedin.com/in/kangabbad/). Thank you 🙏

## What's inside

```txt
.
├── AGENTS.md           # Global agent behavior and workflow rules
├── opencode.json       # Provider, model, and custom agent setup
├── opencode.jsonc      # Main OpenCode config, plugins, MCP, and permissions
├── tui.json            # Terminal UI preferences
├── package.json        # OpenCode plugin dependency
├── .env.example        # Required API key template
└── README.md           # Repository overview
```

## Configuration highlights

### Agent behavior

`AGENTS.md` defines how agents should work in this environment:

- Keep responses extremely concise.
- Delegate technical work to subagents by default.
- Prefer `bun`, then npm, yarn, or pnpm.
- Never auto-commit or create pull requests unless requested.
- Run typecheck at the end of coding sessions.
- Follow a zero-warnings policy for lint, TypeScript, and Supabase checks.
- Prefer MCP tools over CLI commands when supported.

### Model and provider setup

`opencode.json` configures the primary model provider and custom agents:

- Provider: `9router`
- Default model: `9router/KIROxGPT`
- Custom `explorer` subagent for fast codebase exploration

### MCP integrations

`opencode.jsonc` configures MCP servers for external tools and services:

- Exa
- Context7
- Firecrawl
- shadcn
- Playwright
- Cloudflare

### Plugins

This setup includes OpenCode plugin support, including:

- `opencode-wakatime`
- `@opencode-ai/plugin`

### Terminal UI

`tui.json` stores terminal interface preferences, including scroll speed and scroll acceleration.

## Environment variables

Use `.env.example` as a template for required API keys:

```sh
EXA_API_KEY=
CONTEXT7_API_KEY=
FIRECRAWL_API_KEY=
```

Local secret files such as `.env.local` and auth files should stay private and must not be committed.

## Goal

This setup is meant to make OpenCode more consistent, tool-aware, safe, and practical for real software development work.
