# CLI Commands

Every command supports these global flags:

| Flag | Effect |
|------|--------|
| `-y, --yes` | Auto-confirm all prompts |
| `--verbose` | Enable verbose output |
| `--quiet` | Suppress non-essential output |
| `--json` | Output structured JSON (see [JSON Output](/api/json-output)) |

---

## venpm install

Install a plugin and its dependencies.

### Usage

```
venpm install <plugin> [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `plugin` | Plugin name as listed in a configured repo |

### Options

| Flag | Description |
|------|-------------|
| `--version <ver>` | Install a specific semver version (pins in lockfile) |
| `--from <repo>` | Install from a named repo (when multiple repos have the same plugin) |
| `--local <path>` | Symlink a local directory instead of fetching |
| `--git` | Force git clone (even if tarball is available) |
| `--tarball` | Force tarball download |
| `--no-build` | Skip Vencord rebuild after install |
| `--rebuild` | Force rebuild (overrides `never` config) |

### Examples

```bash
venpm install channelTabs
venpm install channelTabs --version 0.1.0
venpm install channelTabs --from kamaras-plugins
venpm install myPlugin --local ./plugins/myPlugin --no-build
```

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Plugin installed successfully |
| `1` | Plugin not found, resolution failure, or fetch error |

---

## venpm uninstall

Remove an installed plugin.

### Usage

```
venpm uninstall <plugin>
```

### Behavior

Checks for reverse dependencies — if other installed plugins depend on the one being removed, venpm warns you and asks for confirmation. Removes the plugin directory from `<vencord>/src/userplugins/` and updates the lockfile.

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Plugin removed |
| `1` | Plugin not installed, or user cancelled |

---

## venpm update

Update installed plugins to latest versions.

### Usage

```
venpm update [plugin]
```

Without arguments, updates all non-pinned, non-local plugins. With a plugin name, updates only that plugin.

### Behavior

Fetches fresh indexes from all repos, compares installed versions against latest, and re-fetches updated plugins. Pinned plugins (installed with `--version`) and local plugins are skipped.

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Update complete (even if nothing was updated) |
| `1` | Plugin not found or fetch error |

---

## venpm list

List installed plugins.

### Usage

```
venpm list
```

### Output Format

```
channelTabs@0.1.0       [kamaras-plugins] (git)
settingsHub@0.1.0       [kamaras-plugins] (git)
myPlugin@local          [local] (local) pinned
```

Each line shows: name@version, repo name, fetch method, and flags (pinned, local).

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Always |

---

## venpm search

Search for plugins across all configured repos.

### Usage

```
venpm search <query>
```

### Behavior

Matches `query` against plugin names and descriptions in all cached indexes. Results show name, version, description, and repo name.

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Always (empty results are not errors) |

---

## venpm info

Show detailed information about a plugin from the index.

### Usage

```
venpm info <plugin>
```

### Output

Shows version, description, authors, license, dependencies, optional dependencies, Discord/Vencord version ranges, source types, and available versions.

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Plugin found |
| `1` | Plugin not found in any repo |

---

## venpm repo

Manage plugin repository sources.

### venpm repo add

```
venpm repo add <url> [--name <alias>]
```

Add a plugin repository. The URL must point to a valid `plugins.json`. If `--name` is not provided, venpm derives a name from the URL hostname.

### venpm repo remove

```
venpm repo remove <name>
```

Remove a repository by name.

### venpm repo list

```
venpm repo list
```

List all configured repositories (name and URL).

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Operation succeeded |
| `1` | Repo not found (remove), or URL invalid (add) |

---

## venpm config

Read and write configuration values.

### venpm config set

```
venpm config set <key> <value>
```

Set a config value using dotted key paths. Values are type-coerced: `null`, `true`, `false` are parsed as their JSON types; strings and numbers are detected automatically.

Examples:
```bash
venpm config set vencord.path /home/you/src/Vencord
venpm config set rebuild always
venpm config set discord.restart never
venpm config set discord.binary null
```

### venpm config get

```
venpm config get <key>
```

Read a config value by dotted key path.

### venpm config path

```
venpm config path
```

Print the config directory path.

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Operation succeeded |
| `1` | Invalid key or value |

---

## venpm create

Scaffold a plugin repo or plugin.

### Usage

```
venpm create <path> [options]
```

### Options

| Flag | Description |
|------|-------------|
| `--tsx` | Use `.tsx` entry point (React support) |
| `--css` | Include `style.css` |
| `--native` | Include `native.ts` (Node.js / Electron main) |

### Behavior

Walks up the directory tree from `<path>` looking for a `plugins.json` with the venpm schema. If found, scaffolds a plugin. If not found, scaffolds a repo.

### Examples

```bash
venpm create ~/src/my-plugins                           # scaffold a repo
venpm create ~/src/my-plugins/plugins/myPlugin          # scaffold a plugin
venpm create ~/src/my-plugins/plugins/myPlugin --tsx --css
```

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Scaffold created |
| `1` | Path already exists, or filesystem error |

---

## venpm rebuild

Rebuild Vencord and restart Discord.

### Usage

```
venpm rebuild
```

Runs `pnpm build` in the Vencord source tree, copies the output to Discord's load path (`~/.config/Vencord/dist/`), and optionally restarts Discord based on the `discord.restart` config setting.

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Build succeeded |
| `1` | Vencord path not configured, pnpm not found, or build failed |

---

## venpm doctor

Check environment health.

### Usage

```
venpm doctor
```

### Checks

| Check | What it verifies |
|-------|------------------|
| `git` | git binary available |
| `pnpm` | pnpm binary available |
| `Vencord` | Source path configured or auto-detected |
| `Discord` | Discord binary found |
| `Repos` | Number of configured repos |
| `venpm` | Current version |

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Always (issues are reported, not treated as errors) |

---

## venpm validate

Validate a plugin index file against the JSON schema.

### Usage

```
venpm validate [path] [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `path` | Path to `plugins.json` (defaults to `./plugins.json`) |

### Options

| Flag | Description |
|------|-------------|
| `--strict` | Also check dependency cross-references and probe tarball URLs |

### Examples

```bash
venpm validate plugins.json
venpm validate plugins.json --strict
```

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Valid |
| `1` | Schema errors or strict-mode failures |
