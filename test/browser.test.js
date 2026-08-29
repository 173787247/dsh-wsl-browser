import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isSafeHttpUrl, rewriteLocalhostHint, buildOpenUrlScript } from "../lib/browser.js";

describe("win_open_url", () => {
  it("allows only http(s)", () => {
    assert.equal(isSafeHttpUrl("https://example.com/a").ok, true);
    assert.equal(isSafeHttpUrl("file:///etc/passwd").ok, false);
  });

  it("hints wsl ip for localhost", () => {
    const h = rewriteLocalhostHint("http://127.0.0.1:3080/", "172.1.2.3");
    assert.match(h.note, /172\.1\.2\.3:3080/);
    assert.match(buildOpenUrlScript("https://x.test"), /Start-Process/);
  });
});
