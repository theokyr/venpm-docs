# Config Schema

Schema URL: `https://venpm.dev/schemas/v1/config.json`

The venpm config file stores user preferences. Located at:

| Platform | Path |
|----------|------|
| Linux | `~/.config/venpm/config.json` |
| macOS | `~/Library/Application Support/venpm/config.json` |
| Windows | `%APPDATA%\venpm\config.json` |

## Structure

```json
{
  "repos": [
    { "name": "kamaras-plugins", "url": "https://..." }
  ],
  "vencord": {
    "path": "/home/you/src/Vencord"
  },
  "rebuild": "ask",
  "discord": {
    "restart": "ask",
    "binary": null
  }
}
```

## Fields

### `repos` {#repos}

- **Type:** `array` of repo objects
- **Required:** yes

Each repo object:

| Field | Type | Pattern | Description |
|-------|------|---------|-------------|
| `name` | string | `^[a-zA-Z0-9_-]+$` | Repo identifier |
| `url` | string (URI) | — | URL to the plugin index JSON |

Managed via [`venpm repo add/remove`](/api/cli#venpm-repo).

### `vencord.path` {#vencord-path}

- **Type:** `string | null`
- **Required:** yes

Absolute path to the Vencord source checkout, or `null` if not yet configured. venpm auto-detects common locations; set manually with `venpm config set vencord.path <path>` or via `VENPM_VENCORD_PATH`.

### `rebuild` {#rebuild}

- **Type:** `"ask" | "always" | "never"`
- **Required:** yes
- **Default:** `"ask"`

Whether to rebuild Vencord after install/uninstall:

| Value | Behavior |
|-------|----------|
| `ask` | Prompt each time |
| `always` | Rebuild automatically |
| `never` | Never rebuild |

### `discord.restart` {#discord-restart}

- **Type:** `"ask" | "always" | "never"`
- **Required:** yes
- **Default:** `"ask"`

Whether to restart Discord after a rebuild. Same values as `rebuild`.

### `discord.binary` {#discord-binary}

- **Type:** `string | null`
- **Required:** yes
- **Default:** `null`

Path to the Discord binary. When `null`, venpm auto-detects.
