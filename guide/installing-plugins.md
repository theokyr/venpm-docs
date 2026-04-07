# Installing Plugins

## Search

Find plugins across all configured repos:

```bash
venpm search <query>
```

The query matches against plugin names and descriptions. Results show the plugin name, version, description, and which repo it's from.

## Install

```bash
venpm install <plugin>
```

This resolves the plugin from your configured repos, fetches it (via git clone or tarball), installs any required dependencies, and writes it to `<vencord>/src/userplugins/`. venpm then prompts you to rebuild Vencord based on your [rebuild setting](/guide/configuration#rebuild-modes).

### Install Options

| Flag | Effect |
|------|--------|
| `--version <ver>` | Pin to a specific version (locks in lockfile) |
| `--from <repo>` | Install from a specific repo (if multiple repos have the same plugin) |
| `--git` | Force git clone (even if tarball is available) |
| `--tarball` | Force tarball download (even if git is available) |
| `--local <path>` | Symlink a local directory instead of fetching (for development) |
| `--no-build` | Skip Vencord rebuild after install |
| `--rebuild` | Force rebuild (overrides `never` config) |

### Examples

```bash
# Install from a specific repo
venpm install channelTabs --from kamaras-plugins

# Pin to a version
venpm install channelTabs --version 0.1.0

# Local development — symlink, don't fetch
venpm install myPlugin --local ./plugins/myPlugin

# Install without rebuilding (useful when installing multiple plugins)
venpm install pluginA --no-build
venpm install pluginB --no-build
venpm rebuild
```

### Dependencies

venpm resolves dependencies automatically. If `pluginA` depends on `pluginB`, installing `pluginA` installs both. Optional dependencies are not auto-installed — venpm prints a warning listing them so you can install them manually if you want.

## List Installed Plugins

```bash
venpm list
```

```
channelTabs@0.1.0       [kamaras-plugins] (git)
settingsHub@0.1.0       [kamaras-plugins] (git)
myPlugin@local          [local] (local) pinned
```

## Update

Update all non-pinned plugins:

```bash
venpm update
```

Update a specific plugin:

```bash
venpm update channelTabs
```

Pinned plugins (installed with `--version`) and local plugins are skipped during updates.

## Uninstall

```bash
venpm uninstall channelTabs
```

venpm checks if other installed plugins depend on the one you're removing and warns you before proceeding.

## Plugin Info

View details about a plugin from the index:

```bash
venpm info channelTabs
```

Shows the version, description, authors, license, dependencies, source locations, and compatibility information.

## Rebuild

Rebuild Vencord and optionally restart Discord:

```bash
venpm rebuild
```

This runs `pnpm build` in the Vencord source tree, copies the output to Discord's load path (`~/.config/Vencord/dist/`), and optionally restarts Discord.
