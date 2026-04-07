# Plugin Index Schema

Schema URL: `https://venpm.dev/schemas/v1/plugins.json`

The plugin index is a JSON file that describes a collection of Vencord plugins available for installation via venpm.

## Structure

```json
{
  "$schema": "https://venpm.dev/schemas/v1/plugins.json",  // optional — enables IDE validation
  "name": "my-plugins",                                     // required — repo identifier
  "description": "My custom plugins",                       // required — human-readable description
  "plugins": {                                               // required — plugin map
    "PluginName": { /* plugin entry */ }
  }
}
```

### `name` {#name}

- **Type:** `string`
- **Required:** yes
- **Pattern:** `^[a-zA-Z0-9_-]+$`

Repository identifier used in `--from` flags and `venpm repo list` output.

### `description` {#description}

- **Type:** `string`
- **Required:** yes

Human-readable description of the plugin repository.

### `plugins` {#plugins}

- **Type:** `object` (map of string → [Plugin Entry](#plugin-entry))
- **Required:** yes

Each key is the plugin name (what users pass to `venpm install`). Each value is a plugin entry object.

## Plugin Entry {#plugin-entry}

```json
{
  "version": "1.2.0",
  "description": "Enhanced server folder UI",
  "authors": [{ "name": "kamaras", "id": "123456789012345678" }],
  "license": "MIT",
  "dependencies": ["otherPlugin"],
  "optionalDependencies": ["settingsHub"],
  "source": { "git": "https://...", "path": "plugins/Name" },
  "versions": { "1.2.0": { "git_tag": "v1.2.0" } }
}
```

### `version` {#version}

- **Type:** `string`
- **Required:** yes
- **Pattern:** `^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$`

Semver version of the current/latest release.

### `description` {#entry-description}

- **Type:** `string`
- **Required:** yes

What the plugin does. Shown in `venpm search` and `venpm info`.

### `authors` {#authors}

- **Type:** `array` of [Author](#author-object) (min 1)
- **Required:** yes

### `source` {#source}

- **Type:** [Source Object](#source-object)
- **Required:** yes

Where to fetch the plugin. At least one of `git`, `tarball`, or `local` must be present.

### `license` {#license}

- **Type:** `string`
- **Required:** no

SPDX license identifier (e.g., `"MIT"`, `"GPL-3.0"`).

### `dependencies` {#dependencies}

- **Type:** `array` of `string`
- **Required:** no

Plugin names that must be installed first. venpm auto-installs these.

### `optionalDependencies` {#optional-dependencies}

- **Type:** `array` of `string`
- **Required:** no

Plugin names that enhance this plugin. venpm warns about missing optional deps but does not auto-install them.

### `discord` / `vencord` {#compatibility}

- **Type:** `string`
- **Required:** no

Informational version ranges. Displayed by `venpm info` but never used to block installs.

### `versions` {#versions}

- **Type:** `object` (map of semver string → [Version Entry](#version-entry))
- **Required:** no

Enables `venpm install <plugin> --version <ver>`.

## Author Object {#author-object}

```json
{ "name": "kamaras", "id": "123456789012345678" }
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Display name |
| `id` | string | yes | Discord user ID |

## Source Object {#source-object}

At least one of `git`, `tarball`, or `local` is required.

```json
{
  "git": "https://github.com/user/repo.git",
  "path": "plugins/MyPlugin",
  "tarball": "https://github.com/user/repo/releases/latest/download/MyPlugin.tar.gz",
  "local": "./plugins/MyPlugin"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `git` | string | Git clone URL. Preferred when git is available. |
| `path` | string | Subdirectory within git repo (for monorepos). |
| `tarball` | string (URI) | Direct `.tar.gz` download URL. Fallback when git unavailable. |
| `local` | string | Local filesystem path. Development only. |

## Version Entry {#version-entry}

```json
{ "git_tag": "v1.2.0", "tarball": "https://..." }
```

| Field | Type | Description |
|-------|------|-------------|
| `git_tag` | string | Git tag for this version |
| `tarball` | string (URI) | Tarball URL for this specific version |
