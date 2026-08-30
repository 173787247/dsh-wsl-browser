# dsh-wsl-browser

DeepSeek Harness tool: **`win_open_url`** — open an `http` / `https` URL in the **Windows default browser** from WSL.

Part of **[dsh-wsl-kit](https://github.com/173787247/dsh-wsl-kit)**.

[中文说明 → README.zh.md](./README.zh.md)

---

## Why

Services started in WSL (`http://127.0.0.1:3080`, docs sites, etc.) should open on the Windows side where you already work. Only `http`/`https` are allowed (no `file:`).

If localhost forwarding fails, the result may include a hint using the current WSL IP—pair with [dsh-wsl-port](https://github.com/173787247/dsh-wsl-port) for deeper diagnosis.

## Tool

| Arg | Required | Meaning |
|-----|----------|---------|
| `url` | yes | `http://` or `https://` URL |

## Install

```sh
dsh plugin --profile web add github:173787247/dsh-wsl-browser
```

## Config

```yaml
- id: dsh-wsl-browser
  name: dsh-wsl-browser
  config:
    timeoutMs: 15000
```

## Test

```sh
npm test
```

## License

MIT
