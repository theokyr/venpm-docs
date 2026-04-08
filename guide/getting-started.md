# Getting Started

::: warning Disclaimer
Client modifications — including Vencord and plugins installed through venpm — are against [Discord's Terms of Service](https://discord.com/terms). While no widespread bans for client mod usage are known, you use them at your own risk. venpm is not affiliated with Discord Inc. or Vencord. See the full [Disclaimer](/disclaimer).
:::

## Install

Install venpm globally:

```bash
npm install -g @kamaras/venpm
```

Or run it without installing via npx:

```bash
npx @kamaras/venpm <command>
```

Requires **Node.js 18** or later.

## Check Your Environment

Run `doctor` to verify everything venpm needs is in place:

```bash
venpm doctor
```

```
✓ git         available (2.47.0)
✓ pnpm        available (9.15.0)
✓ Vencord     /home/you/src/Vencord
✓ Discord     /usr/bin/discord
✓ Repos       1 configured
✓ venpm       0.1.0
```

If Vencord was not auto-detected, set the path manually:

```bash
venpm config set vencord.path /path/to/Vencord
```

You can also set it via the `VENPM_VENCORD_PATH` environment variable.

## Install Your First Plugin

Search across all configured repos:

```bash
venpm search tabs
```

```
channelTabs  0.1.0  Quick-access tab bar for channels and DMs  [kamaras-plugins]
```

Install it:

```bash
venpm install channelTabs
```

venpm fetches the plugin, writes it to `<vencord>/src/userplugins/`, resolves dependencies, and prompts you to rebuild Vencord. After the rebuild, restart Discord and enable the plugin in Vencord's settings.

## What's Next

- [Installing Plugins](/guide/installing-plugins) — all install options, updating, uninstalling
- [Configuration](/guide/configuration) — repos, rebuild modes, automation
- [Your First Plugin](/author/your-first-plugin) — build and publish your own plugin
