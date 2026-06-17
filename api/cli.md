# CLI Commands

Every command supports these global flags:

| Flag | Effect |
|------|--------|
| `-y, --yes` | Auto-confirm all prompts |
| `--verbose` | Enable verbose output |
| `--quiet` | Suppress non-essential output |
| `--json` | Output structured JSON (see [JSON Output](/api/json-output)) |
| `--json-stream` | Output events as NDJSON (see [JSON Output](/api/json-output#ndjson-streaming)) |
| `--no-color` | Disable colored output |

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
venpm install channelTabs --version 0.5.0
venpm install channelTabs --from kamaras
venpm install myPlugin --local ./plugins/myPlugin --no-build
```

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Plugin installed successfully |
| `1` | Plugin not found, resolution failure, or cancelled |
| `3` | Environment error (Vencord not found, git missing, build failed) |

> See [Error Codes](/api/error-codes) for the full list of structured error codes returned with each error.

> **Tip:** If the plugin name has a typo, venpm suggests close matches: *"Did you mean: BetterVolume?"*

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

> See [Error Codes](/api/error-codes) for the full list of structured error codes returned with each error.

> **Tip:** If the plugin name has a typo, venpm suggests close matches: *"Did you mean: BetterVolume?"*

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
| `1` | Plugin not found or cancelled |
| `3` | Environment error (Vencord not found, git missing, build failed) |

> See [Error Codes](/api/error-codes) for the full list of structured error codes returned with each error.

---

## venpm list

List installed plugins.

### Usage

```
venpm list
```

### Output Format

```
  Installed plugins (3):

  Name          Version  Method  Repo              Flags
  channelTabs   0.5.0    git     kamaras
  settingsHub   0.3.4    git     kamaras
  myPlugin      local    local   local             pinned
```

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

> See [Error Codes](/api/error-codes) for the full list of structured error codes returned with each error.

> **Tip:** If the plugin name has a typo, venpm suggests close matches: *"Did you mean: BetterVolume?"*

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
venpm rebuild [options]
```

### Options

| Flag | Description |
|------|-------------|
| `--restart` | Restart Discord after rebuilding without prompting |
| `--no-restart` | Skip Discord restart without prompting |

Runs `pnpm build` in the Vencord source tree, copies the output to Discord's load path (`~/.config/Vencord/dist/`), and optionally restarts Discord based on the `discord.restart` config setting.

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Build succeeded |
| `1` | Command error (cancelled, etc.) |
| `3` | Environment error (Vencord not found, pnpm not found, build failed) |

> See [Error Codes](/api/error-codes) for the full list of structured error codes returned with each error.

---

## venpm inject

Patch Discord to load Vencord natively, without shelling out to Vencord's installer.

### Usage

```
venpm inject [options]
```

### Options

| Flag | Description |
|------|-------------|
| `-b, --branch <branch>` | Discord branch: `stable` (default), `canary`, or `ptb` |
| `--restart` | Restart Discord after patching without prompting |
| `--no-restart` | Skip Discord restart after patching |

### Behavior

On macOS and standard Linux installs, venpm replaces Discord's `app.asar` with a small Vencord loader shim and moves Discord's original asar to `_app.asar`. Restart Discord after injecting for the patch to take effect.

::: warning macOS App Management
On macOS Sequoia and later, modifying `/Applications/Discord.app/Contents/` requires App Management permission for the terminal running venpm. Enable it in System Settings -> Privacy & Security -> App Management, then run `venpm inject` again.
:::

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Patch installed |
| `1` | Already injected or patch failed |
| `3` | Discord not found or native inject unsupported |

> See [JSON Output](/api/json-output#venpm-inject) for the structured result shape.

---

## venpm uninject

Remove the native Vencord patch from Discord.

### Usage

```
venpm uninject [options]
```

### Options

| Flag | Description |
|------|-------------|
| `-b, --branch <branch>` | Discord branch: `stable` (default), `canary`, or `ptb` |

### Behavior

Removes the shim `app.asar` and restores Discord's original `_app.asar` backup. If the target Discord branch is already unpatched, the command succeeds and reports that no work was needed.

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Patch removed, or target was already unpatched |
| `1` | Unpatch failed |
| `3` | Discord not found or native inject unsupported |

> See [JSON Output](/api/json-output#venpm-uninject) for the structured result shape.

---

## venpm kill-discord

Stop running Discord processes.

### Usage

```
venpm kill-discord
```

### Behavior

Finds Discord processes using the configured or auto-detected Discord binary and terminates them. Processes that do not exit after the graceful signal are counted under `forced`.

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Scan complete, even if no Discord processes were running |

> See [JSON Output](/api/json-output#venpm-kill-discord) for the structured result shape.

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

> See [Error Codes](/api/error-codes) for the full list of structured error codes returned with each error.

---

## venpm completions

Output a shell completion script.

### Usage

```
venpm completions [shell]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `shell` | Shell type: `bash`, `zsh`, or `fish`. Auto-detected from `$SHELL` if omitted. |

### Setup

```bash
# Zsh (add to ~/.zshrc)
eval "$(venpm completions zsh)"

# Bash (add to ~/.bashrc)
eval "$(venpm completions bash)"

# Fish
venpm completions fish | source
```

### Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Script output |
| `2` | Unknown shell type |
