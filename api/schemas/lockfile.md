# Lockfile Schema

Schema URL: `https://venpm.dev/schemas/v1/lockfile.json`

The lockfile tracks installed plugins. Located at `<config-dir>/venpm-lock.json` alongside the config file. You should not need to edit it manually — venpm manages it automatically.

## Structure

```json
{
  "installed": {
    "channelTabs": {
      "version": "0.1.0",
      "repo": "kamaras-plugins",
      "method": "git",
      "pinned": false,
      "installed_at": "2026-01-15T10:30:00.000Z",
      "git_ref": "abc1234",
      "path": "plugins/channelTabs"
    },
    "myPlugin": {
      "version": "local",
      "repo": "local",
      "method": "local",
      "pinned": true,
      "installed_at": "2026-01-16T14:00:00.000Z"
    }
  }
}
```

## Fields

### `installed` {#installed}

- **Type:** `object` (map of plugin name → installed entry)
- **Required:** yes

### Installed Entry {#installed-entry}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | yes | Semver version or `"local"` for local installs |
| `repo` | string | yes | Repo name the plugin was installed from |
| `method` | `"git"` \| `"tarball"` \| `"local"` | yes | How the plugin was fetched |
| `pinned` | boolean | yes | Whether the plugin is pinned (won't be updated) |
| `installed_at` | string (ISO 8601) | yes | When the plugin was installed |
| `git_ref` | string | no | Git commit SHA or tag (when method is `"git"`) |
| `path` | string | no | Subdirectory path (for monorepo installs) |

### Pinning

A plugin is pinned when installed with `--version`. Pinned plugins are skipped by `venpm update`. Local installs are always pinned.

### Recovery

If the lockfile gets corrupted or out of sync, you can safely delete it. venpm reconstructs it from the installed plugins directory on the next operation.
