# Troubleshooting

## Run the Doctor

Always start here:

```bash
venpm doctor
```

The doctor checks git, pnpm, Vencord path, Discord binary, configured repos, and venpm version. Each line shows a status:

- `✓` — working
- `✗` — missing or misconfigured

## Common Issues

### "Vencord path not configured"

venpm can't find your Vencord source checkout. Set it manually:

```bash
venpm config set vencord.path /path/to/Vencord
```

This should point to the root of the Vencord git repo (the directory containing `package.json` and `src/`).

### "pnpm not found"

Vencord uses pnpm for builds. Install it:

```bash
npm install -g pnpm
```

### Plugin installed but not showing in Discord

1. Make sure you rebuilt after installing: `venpm rebuild`
2. Check that the plugin appears in `venpm list`
3. In Discord, go to Vencord settings and look for the plugin. It may be disabled by default — toggle it on.
4. Some plugins require a Discord restart. Close and reopen Discord.

### "Plugin not found" during install

The plugin may not exist in any of your configured repos. Check which repos you have:

```bash
venpm repo list
```

Search across all repos to verify the plugin name:

```bash
venpm search <name>
```

Plugin names are case-sensitive.

### Build fails during rebuild

If `venpm rebuild` fails:

1. Make sure `pnpm` is installed globally
2. Try building Vencord manually to see the full error:
   ```bash
   cd /path/to/Vencord && pnpm build
   ```
3. Check that your Vencord checkout is up to date: `cd /path/to/Vencord && git pull`

### Ambiguous plugin (multiple repos)

If the same plugin name exists in multiple repos, venpm asks you to disambiguate. Use `--from`:

```bash
venpm install myPlugin --from specific-repo
```

### Lockfile issues

The lockfile is at `~/.config/venpm/venpm-lock.json` (Linux). If it gets corrupted, you can safely delete it — venpm will rebuild it from the installed plugins directory on the next operation.

## Getting Help

- [venpm repository](https://github.com/theokyr/venpm) — issues and source code
- [Vencord Discord](https://discord.gg/vencord) — community support
