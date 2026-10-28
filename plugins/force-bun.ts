import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "force-bun",
  async setup(ctx) {
    await ctx.tool.hook("execute.before", (event) => {
      if (event.tool !== "bash") return

      const input = event.input as { command?: unknown } | undefined
      if (!input || typeof input.command !== "string") return

      const cmd = input.command.trim()

      if (cmd.startsWith("npm ")) {
        input.command = cmd.replace(/^npm\b/, "bun")
      } else if (cmd === "npm") {
        input.command = "bun"
      } else if (cmd.startsWith("npx ")) {
        input.command = cmd.replace(/^npx\b/, "bunx")
      }
    })
  },
})
