# JSON Output

venpm has two machine-readable output modes: `--json` (single envelope) and `--json-stream` (NDJSON event stream).

## `--json` — Final Envelope

Pass `--json` to any command for a single JSON object on stdout. Implies `--yes` (no interactive prompts).

### Success Envelope

```json
{
  "success": true,
  "data": { /* command-specific payload */ },
  "warnings": ["optional array of warning strings"]
}
```

The `warnings` key is omitted when there are no warnings.

### Error Envelope

```json
{
  "success": false,
  "error": {
    "code": "PLUGIN_NOT_FOUND",
    "message": "Plugin \"BeterVolume\" not found in any configured repo",
    "suggestion": "Did you mean: BetterVolume",
    "candidates": ["BetterVolume"]
  }
}
```

The `error` field is a structured [ErrorInfo](/api/error-codes) object with:

| Field | Type | Description |
|-------|------|-------------|
| `code` | `string` | Machine-readable error code (see [Error Codes](/api/error-codes)) |
| `message` | `string` | Human-readable error description |
| `suggestion` | `string?` | Actionable next step |
| `candidates` | `string[]?` | Fuzzy-matched alternatives (for "did you mean" errors) |
| `docsUrl` | `string?` | Link to relevant documentation |

::: warning Breaking Change (v0.2.0)
In v0.1.x, the `error` field was a plain string. In v0.2.0+, it is a structured `ErrorInfo` object. Update any parsing code that does `envelope.error` as a string — use `envelope.error.message` instead.
:::

## `--json-stream` — NDJSON Event Stream

Pass `--json-stream` for newline-delimited JSON events as they happen. Each line is a valid JSON object. Implies `--yes`.

This is preferred for AI agents and CI pipelines that want progress visibility.

### Event Types

```typescript
type StreamEvent =
  | { type: "progress"; id: string; message: string }
  | { type: "progress"; id: string; status: "done" | "fail"; message: string }
  | { type: "warning"; message: string }
  | { type: "log"; message: string }
  | { type: "result"; success: true; data: unknown; warnings?: string[] }
  | { type: "error"; success: false; error: ErrorInfo }
```

Every stream ends with exactly one `result` or `error` event. The final event's shape matches the `--json` envelope, so parsing code can be shared.

### Example: `venpm install channelTabs --json-stream`

```json
{"type":"progress","id":"fetch-indexes","message":"Fetching indexes..."}
{"type":"progress","id":"fetch-indexes","status":"done","message":"1 repo, 12 plugins"}
{"type":"progress","id":"install-channelTabs","message":"Cloning channelTabs..."}
{"type":"progress","id":"install-channelTabs","status":"done","message":"channelTabs installed"}
{"type":"result","success":true,"data":{"installed":[{"name":"channelTabs","version":"0.1.0","method":"git"}]}}
```

### Example: Error stream

```json
{"type":"warning","message":"Failed to fetch index from \"backup-repo\": timeout"}
{"type":"error","success":false,"error":{"code":"PLUGIN_NOT_FOUND","message":"Plugin \"BeterVolume\" not found","suggestion":"Did you mean: BetterVolume","candidates":["BetterVolume"]}}
```

## Per-Command Data Shapes

### venpm list

```json
{
  "plugins": [
    {
      "name": "channelTabs",
      "version": "0.1.0",
      "repo": "kamaras-plugins",
      "method": "git",
      "pinned": false
    }
  ]
}
```

### venpm search

```json
{
  "results": [
    {
      "name": "channelTabs",
      "version": "0.1.0",
      "description": "Quick-access tab bar for channels and DMs",
      "repo": "kamaras-plugins"
    }
  ]
}
```

### venpm info

```json
{
  "name": "channelTabs",
  "version": "0.1.0",
  "description": "Quick-access tab bar",
  "authors": [{ "name": "kamaras", "id": "123456789012345678" }],
  "repo": "kamaras-plugins",
  "dependencies": [],
  "optionalDependencies": ["settingsHub"],
  "versions": ["0.1.0"],
  "installed": true,
  "installedVersion": "0.1.0"
}
```

### venpm install

```json
{
  "installed": [
    { "name": "channelTabs", "version": "0.1.0", "method": "git" }
  ]
}
```

### venpm uninstall

```json
{
  "removed": "channelTabs"
}
```

### venpm update

```json
{
  "updated": [
    { "name": "channelTabs", "from": "0.1.0", "to": "0.2.0" }
  ],
  "skipped": ["settingsHub"]
}
```

### venpm validate

```json
{
  "path": "plugins.json",
  "valid": true,
  "errors": []
}
```

### venpm doctor

```json
{
  "git": true,
  "pnpm": true,
  "vencordPath": "/home/you/src/Vencord",
  "discordBinary": "/usr/bin/discord",
  "repos": 1,
  "venpmVersion": "0.2.0"
}
```

## Exit Codes

| Code | Category | Description |
|------|----------|-------------|
| `0` | Success | Command completed |
| `1` | Command Error | Plugin not found, validation failed, etc. |
| `2` | Usage Error | Bad arguments, unknown shell |
| `3` | Environment Error | Git/pnpm missing, Vencord not found, build failed |

## Scripting Examples

```bash
# List all installed plugin names
venpm list --json | jq -r '.data.plugins[].name'

# Check if a specific plugin is installed
venpm list --json | jq -e '.data.plugins[] | select(.name == "channelTabs")' > /dev/null

# Install without prompts and check result
venpm install channelTabs --json | jq '.success'

# Stream install events and print progress
venpm install channelTabs --json-stream | while IFS= read -r line; do
  type=$(echo "$line" | jq -r '.type')
  case $type in
    progress) echo "⟩ $(echo "$line" | jq -r '.message')" ;;
    result)   echo "✔ Done" ;;
    error)    echo "✖ $(echo "$line" | jq -r '.error.message')" ;;
  esac
done

# Parse error codes programmatically
result=$(venpm info badPlugin --json 2>/dev/null)
if [ "$(echo "$result" | jq -r '.success')" = "false" ]; then
  code=$(echo "$result" | jq -r '.error.code')
  echo "Error: $code"
fi
```
