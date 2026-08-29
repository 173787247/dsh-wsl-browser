# dsh-wsl-browser

DeepSeek Harness tool: **`win_open_url`** — open an `http` / `https` URL in the **Windows default browser** from WSL.

Part of **[dsh-wsl-kit](https://github.com/173787247/dsh-wsl-kit)**.

[中文说明 ↓](#中文)

---

## English

### Why

Services started in WSL (`http://127.0.0.1:3080`, docs sites, etc.) should open on the Windows side where you already work. Only `http`/`https` are allowed (no `file:`).

If localhost forwarding fails, the result may include a hint using the current WSL IP—pair with [dsh-wsl-port](https://github.com/173787247/dsh-wsl-port) for deeper diagnosis.

### Tool

| Arg | Required | Meaning |
|-----|----------|---------|
| `url` | yes | `http://` or `https://` URL |

### Install

```sh
dsh plugin --profile web add github:173787247/dsh-wsl-browser
```

### Config

```yaml
- id: dsh-wsl-browser
  name: dsh-wsl-browser
  config:
    timeoutMs: 15000
```

### Test

```sh
npm test
```

### License

MIT

---

## 中文

### 为什么需要

在 WSL 起的本地服务、文档链接，需要在 Windows 默认浏览器打开。仅允许 `http`/`https`。

若 `localhost` 打不开，结果里可能提示改用 WSL IP；更深诊断见 `dsh-wsl-port`。

### 安装

```sh
dsh plugin --profile web add github:173787247/dsh-wsl-browser
```

### 许可

MIT
