export function isSafeHttpUrl(raw) {
  let u;
  try {
    u = new URL(String(raw ?? "").trim());
  } catch {
    return { ok: false, error: "invalid URL" };
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") {
    return { ok: false, error: "only http/https allowed" };
  }
  return { ok: true, href: u.href };
}

export function buildOpenUrlScript(href) {
  const safe = String(href).replace(/'/g, "''");
  return `Start-Process '${safe}'; 'ok'`;
}

export function rewriteLocalhostHint(href, wslIp) {
  try {
    const u = new URL(href);
    if ((u.hostname === "127.0.0.1" || u.hostname === "localhost") && wslIp) {
      return {
        href,
        note: `If Windows browser fails on localhost, try http://${wslIp}:${u.port || (u.protocol === "https:" ? "443" : "80")}${u.pathname}${u.search}`,
      };
    }
  } catch {
    /* ignore */
  }
  return { href, note: "" };
}

export function formatBrowserResult(value) {
  if (!value.ok) return `win_open_url failed: ${value.error}`;
  const lines = [`opened: ${value.href}`];
  if (value.note) lines.push(value.note);
  return lines.join("\n");
}
