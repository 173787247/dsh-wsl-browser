# dsh-wsl-browser

DeepSeek Harness 工具：**`win_open_url`** — 从 WSL 用 **Windows 默认浏览器** 打开 `http` / `https` URL。

属于 **[dsh-wsl-kit](https://github.com/173787247/dsh-wsl-kit)**。

[English → README.md](./README.md)

---

## 为什么需要

在 WSL 起的服务（`http://127.0.0.1:3080`、文档站点等）应在你已经工作的 Windows 侧打开。仅允许 `http`/`https`（不允许 `file:`）。

若 localhost 转发失败，结果里可能提示改用当前 WSL IP；更深诊断见 [dsh-wsl-port](https://github.com/173787247/dsh-wsl-port)。

## 工具

| 参数 | 是否必填 | 含义 |
|------|----------|------|
| `url` | 是 | `http://` 或 `https://` URL |

## 安装

```sh
dsh plugin --profile web add github:173787247/dsh-wsl-browser
```

## 配置

```yaml
- id: dsh-wsl-browser
  name: dsh-wsl-browser
  config:
    timeoutMs: 15000
```

## 测试

```sh
npm test
```

## 许可

MIT
