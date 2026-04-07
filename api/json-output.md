# JSON Output

Pass `--json` to any venpm command to get structured output instead of human-readable text. This is useful for scripting, CI pipelines, and tool integrations.

## Envelope Format

Every JSON response follows the same envelope:

### Success

```json
{
  "success": true,
  "data": { /* command-specific payload */ }
}
```

### Error

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

Output is a single JSON line written to stdout. Human-readable messages (warnings, progress) go to stderr when `--json` is active, so they don't interfere with JSON parsing.

## Per-Command Data Shapes

### venpm list --json

```json
{
  "success": true,
  "data": {
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
}
```

### venpm search --json

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "name": "channelTabs",
        "version": "0.1.0",
        "description": "Quick-access tab bar for channels and DMs",
        "repo": "kamaras-plugins"
      }
    ]
  }
}
```

### venpm info --json

```json
{
  "success": true,
  "data": {
    "name": "channelTabs",
    "version": "0.1.0",
    "description": "Quick-access tab bar for channels and DMs",
    "authors": [{ "name": "kamaras", "id": "123456789012345678" }],
    "license": "MIT",
    "repo": "kamaras-plugins",
    "dependencies": [],
    "optionalDependencies": ["settingsHub"],
    "source": { "git": "https://...", "path": "plugins/channelTabs" }
  }
}
```

### venpm install --json

```json
{
  "success": true,
  "data": {
    "installed": "channelTabs",
    "version": "0.1.0",
    "dependencies": ["settingsHub"]
  }
}
```

### venpm validate --json

```json
{
  "success": true,
  "data": {
    "path": "plugins.json",
    "valid": true,
    "errors": []
  }
}
```

On validation failure:

```json
{
  "success": false,
  "error": "Validation failed",
  "data": {
    "path": "plugins.json",
    "valid": false,
    "errors": [
      "plugins.BetterFolders.source: must have required property 'git' or 'tarball'"
    ]
  }
}
```

### venpm doctor --json

```json
{
  "success": true,
  "data": {
    "checks": {
      "git": { "ok": true, "version": "2.47.0" },
      "pnpm": { "ok": true, "version": "9.15.0" },
      "vencord": { "ok": true, "path": "/home/you/src/Vencord" },
      "discord": { "ok": true, "binary": "/usr/bin/discord" },
      "repos": { "ok": true, "count": 1 },
      "venpm": { "ok": true, "version": "0.1.0" }
    }
  }
}
```

## Scripting Examples

```bash
# List all installed plugin names
venpm list --json | jq -r '.data.plugins[].name'

# Check if a specific plugin is installed
venpm list --json | jq -e '.data.plugins[] | select(.name == "channelTabs")' > /dev/null

# Install without prompts and check result
venpm install channelTabs --yes --json | jq '.success'

# Validate and extract errors
venpm validate plugins.json --json | jq '.data.errors[]'
```
