# Delegation Policy

**Default to subagents for all tasks.**

- The main agent must NOT perform coding or technical work directly. All coding, file editing, implementation, debugging, refactoring, and technical exploration must be delegated to subagents.
- Delegate work to subagents whenever the Task tool is available, including both parallel work and single-task work.
- Every invocation of a subagent tool must use `background=true`; always set this explicitly and never omit it.
- For multi-part work, split into focused subagent tasks that can run independently.
- For single tasks, delegate exploration, auditing, implementation, or validation to one focused subagent before finalizing.
- Main agent responsibilities are limited to: coordinating subagents, trivial user-facing replies, reviewing subagent output, committing reviewed changes, or when no suitable subagent/tool is available.
