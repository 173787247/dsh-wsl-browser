import { detectWsl, runPowerShell } from "./lib/wsl-host.js";
import {
  buildOpenUrlScript,
  formatBrowserResult,
  isSafeHttpUrl,
  rewriteLocalhostHint,
} from "./lib/browser.js";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const name = "dsh-wsl-browser";
export const inject = ["tools", "systemPrompt"];

export function apply(ctx, config = {}) {
  const timeoutMs = positive(config.timeoutMs, 15_000);
  const wsl = detectWsl();

  ctx.systemPrompt.section({
    name: "tool:win_open_url",
    order: 124,
    text: "Use win_open_url to open http(s) links in the Windows default browser (including 127.0.0.1 services started in WSL).",
  });

  ctx.tools.register({
    name: "win_open_url",
    description: "Open an http(s) URL in the Windows default browser from WSL.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["url"],
      properties: {
        url: { type: "string", description: "http or https URL." },
      },
    },
    output: {
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          ok: { type: "boolean" },
          href: { type: "string" },
          note: { type: "string" },
          error: { type: "string" },
        },
      },
      render: (_args, value) => [{ type: "text", text: formatBrowserResult(value) }],
    },
    timeoutMs,
    isConcurrencySafe: () => false,
    async execute(args) {
      if (!wsl) return { ok: false, error: "not running in WSL" };
      const checked = isSafeHttpUrl(args?.url);
      if (!checked.ok) return checked;
      let wslIp = "";
      try {
        const { stdout } = await execFileAsync("hostname", ["-I"], { encoding: "utf8", timeout: 3_000 });
        wslIp = String(stdout || "").trim().split(/\s+/)[0] || "";
      } catch {
        /* optional */
      }
      const hint = rewriteLocalhostHint(checked.href, wslIp);
      try {
        await runPowerShell(buildOpenUrlScript(checked.href), { timeoutMs });
        return { ok: true, href: checked.href, note: hint.note };
      } catch (err) {
        return {
          ok: false,
          href: checked.href,
          error: err instanceof Error ? err.message : String(err),
          note: hint.note,
        };
      }
    },
    presentCall: () => ({ card: "generic", title: "Open URL" }),
    presentResult: (_args, result) => (
      result.isError
        ? { card: "generic", title: "Open URL failed", content: result.content }
        : { card: "generic", title: "Open URL", content: result.content }
    ),
  });
}

function positive(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}
