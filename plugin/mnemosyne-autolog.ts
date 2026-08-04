import type { Plugin } from "@opencode-ai/plugin"

/*
 * Auto-logger for Mnemosyne. The trigger this session kept missing was "the
 * agent never persisted what it changed" — so instead of asking the agent to
 * remember, this plugin observes the edit/write tools directly and stores a
 * working memory itself. No discipline required on either side.
 *
 * How it works:
 * - `tool.execute.after` fires for every `edit`/`write`.
 * - File changes accumulate in a buffer, then flush to a single memory entry
 *   after a quiet window (so a burst of edits becomes one memory, not noise).
 * - Writes go through `mnemosyne store <content> auto-plugin <importance>`,
 *   the same CLI the MCP server runs, so Mnemosyne owns its own schema, FTS
 *   index and embeddings. We never touch the database directly.
 * - The write is fire-and-forget and wrapped in try/catch: a memory failure
 *   must never break the coding session.
 *
 * Override the binary with MNEMOSYNE_BIN if the venv path ever moves.
 */
const MNEMOSYNE_BIN =
  process.env.MNEMOSYNE_BIN ??
  "/Users/kangabbad/.local/share/mnemosyne/venv/bin/mnemosyne"

const IMPORTANCE = 0.45
const FLUSH_QUIET_MS = 20000
const FLUSH_MAX_MS = 60000

type Change = { action: "edit" | "write"; snippet: string }

export default (async ({ directory }) => {
  const repo = directory.split("/").pop() ?? directory
  let pending = new Map<string, Change>()
  let quiet: ReturnType<typeof setTimeout> | undefined
  let max: ReturnType<typeof setTimeout> | undefined

  const store = (content: string) => {
    try {
      const proc = Bun.spawn(
        [MNEMOSYNE_BIN, "store", content, "auto-plugin", String(IMPORTANCE)],
        { stdout: "ignore", stderr: "ignore", stdin: "ignore" }
      )
      proc.exited.catch(() => {})
    } catch {
      // never let a memory write break the session
    }
  }

  const flush = () => {
    if (pending.size === 0) return
    const files = [...pending.entries()]
    const lines = files.map(
      ([file, change]) =>
        `- ${change.action} ${file}${change.snippet ? `: ${change.snippet}` : ""}`
    )
    const content = `Auto-logged ${files.length} file change${
      files.length > 1 ? "s" : ""
    } in ${repo}:\n${lines.join("\n")}`
    pending = new Map()
    if (quiet) clearTimeout(quiet)
    if (max) clearTimeout(max)
    quiet = undefined
    max = undefined
    store(content)
  }

  const schedule = () => {
    if (quiet) clearTimeout(quiet)
    quiet = setTimeout(flush, FLUSH_QUIET_MS)
    if (!max) max = setTimeout(flush, FLUSH_MAX_MS)
  }

  const snippet = (args: Record<string, unknown>) => {
    const source =
      typeof args?.newString === "string"
        ? args.newString
        : typeof args?.content === "string"
          ? args.content
          : ""
    const line = source
      .split("\n")
      .map((l) => l.trim())
      .find((l) => l.length > 0)
    return line ? line.slice(0, 90) : ""
  }

  return {
    "tool.execute.after": async (input) => {
      if (input.tool !== "edit" && input.tool !== "write") return
      const filePath = input.args?.filePath
      if (typeof filePath !== "string" || !filePath) return
      if (filePath.includes("/.hermes/") || filePath.includes("/node_modules/"))
        return
      pending.set(filePath, { action: input.tool, snippet: snippet(input.args) })
      schedule()
    },
  }
}) satisfies Plugin
