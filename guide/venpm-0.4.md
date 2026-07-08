# venpm 0.4 Prep Notes

This page tracks the public-facing changes to verify before the 0.4 release is published.

## CLI Surface

0.4 documentation covers the full current command surface:

- `venpm inject` and `venpm uninject` for native Discord patch management on macOS and Linux
- `venpm kill-discord` for stopping running Discord processes before rebuild or inject work
- `venpm rebuild --restart` and `venpm rebuild --no-restart` for explicit restart control
- `--json-stream` for NDJSON progress events in agent and CI workflows

For exact flags and exit codes, see the [CLI Reference](/api/cli).

## Custom Plugin Index

The default plugin repository is named `kamaras`. Use that alias with `--from` when needed:

```bash
venpm install channelTabs --from kamaras
```

The public showcase now tracks every user-facing installable `plugins.json` entry, including `betterRes` and `vipNotifications`. Shared `_lib*` packages are documented as transitive dependency modules, not end-user plugins.

## Attribution

`betterBlockIgnore` is a fork of Vencord's stock `NoBlockedMessages` plugin. The showcase and plugin source headers credit Vencord, Vendicated and contributors, and the upstream plugin authors.

## Pre-Check List

Before publishing 0.4:

1. Confirm `package.json` is bumped to the release version.
2. Run the docs quality check and VitePress build.
3. Run focused CLI tests for scaffold output and JSON/error docs.
4. Run the venpm ecosystem scrub before any public push.
5. Verify the published `plugins.json` asset matches the local plugin catalog.
