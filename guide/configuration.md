# Configuration

## Config File Location

| Platform | Path |
|----------|------|
| Linux | `~/.config/venpm/config.json` |
| macOS | `~/Library/Application Support/venpm/config.json` |
| Windows | `%APPDATA%\venpm\config.json` |

Print the config directory:

```bash
venpm config path
```

Read or write individual values:

```bash
venpm config get vencord.path
venpm config set vencord.path /home/you/src/Vencord
```

## Repos

venpm ships with one default repo. Add more:

```bash
venpm repo add https://example.com/plugins.json
venpm repo add https://example.com/plugins.json --name my-plugins
venpm repo list
venpm repo remove my-plugins
```

The URL must point to a JSON file conforming to the [venpm plugin index schema](/api/schemas/plugins).

## Rebuild Modes

Control whether venpm rebuilds Vencord after plugin changes:

```bash
venpm config set rebuild ask       # prompt each time (default)
venpm config set rebuild always    # rebuild automatically
venpm config set rebuild never     # never rebuild
```

The same modes apply to Discord restart:

```bash
venpm config set discord.restart ask
venpm config set discord.restart always
venpm config set discord.restart never
```

## Discord Binary

venpm auto-detects the Discord binary. To override:

```bash
venpm config set discord.binary /usr/bin/discord
```

Set to `null` to revert to auto-detection:

```bash
venpm config set discord.binary null
```

## Automation

Skip all confirmation prompts with `--yes`:

```bash
venpm install channelTabs --yes
venpm update --yes
venpm rebuild --yes
```

Combine with `--json` for scripting:

```bash
venpm list --json | jq '.data.plugins[].name'
venpm search tabs --json
```

## Environment Variables

| Variable | Overrides |
|----------|-----------|
| `VENPM_VENCORD_PATH` | `vencord.path` config value |

## Full Config Schema

See the [Config Schema Reference](/api/schemas/config) for every field, type, and default.
