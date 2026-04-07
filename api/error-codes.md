# Error Codes

Every venpm error includes a structured `ErrorInfo` object with a machine-readable code, human message, and actionable suggestion.

## ErrorInfo Structure

```typescript
interface ErrorInfo {
  code: string;        // Machine-readable error code
  message: string;     // Human-readable description
  suggestion?: string; // Actionable next step
  candidates?: string[]; // Fuzzy-matched alternatives
  docsUrl?: string;    // Link to documentation
}
```

In the terminal, errors render as:

```
✖ Plugin "BeterVolume" not found in any configured repo
  ⟩ Did you mean: BetterVolume
                                              [PLUGIN_NOT_FOUND]
```

In `--json` mode, the error is in the envelope's `error` field. In `--json-stream`, it's the final event.

## Error Code Reference

### Plugin Errors

| Code | When | Default Suggestion |
|------|------|-------------------|
| `PLUGIN_NOT_FOUND` | Plugin name not in any configured repo | `venpm search <query>` + fuzzy candidates |
| `PLUGIN_AMBIGUOUS` | Plugin found in multiple repos without `--from` | `venpm install <plugin> --from <repo>` |
| `PLUGIN_NOT_INSTALLED` | Uninstall or update targets a plugin that isn't installed | `venpm list` |

### Environment Errors

| Code | When | Default Suggestion |
|------|------|-------------------|
| `VENCORD_NOT_FOUND` | Vencord source path not configured or detected | `venpm config set vencord.path /path/to/Vencord` |
| `GIT_NOT_AVAILABLE` | Git required for clone but not found | `Install git, or use --tarball` |
| `PNPM_NOT_AVAILABLE` | pnpm required for Vencord rebuild | `npm i -g pnpm` |
| `DISCORD_NOT_FOUND` | Discord binary not found for restart | `venpm config set discord.binary /path/to/discord` |
| `BUILD_FAILED` | Vencord pnpm build failed | `venpm doctor` |

### Resolution Errors

| Code | When | Default Suggestion |
|------|------|-------------------|
| `CIRCULAR_DEPENDENCY` | Dependency graph contains a cycle | Error message shows the cycle path |
| `VERSION_NOT_FOUND` | `--version` specifies a version that doesn't exist | `venpm info <plugin>` |

### Validation Errors

| Code | When | Default Suggestion |
|------|------|-------------------|
| `SCHEMA_INVALID` | `plugins.json` fails schema validation | `venpm validate --strict` |

### Other Errors

| Code | When | Default Suggestion |
|------|------|-------------------|
| `REPO_FETCH_FAILED` | HTTP error fetching a repo's plugin index | `venpm repo list` |
| `NON_INTERACTIVE` | Interactive prompt needed but no TTY available | `--yes` to auto-confirm, or set config values explicitly |

## Exit Code Categories

Error codes map to exit code categories:

| Exit Code | Category | Error Codes |
|-----------|----------|-------------|
| `0` | Success | — |
| `1` | Command Error | `PLUGIN_NOT_FOUND`, `PLUGIN_AMBIGUOUS`, `PLUGIN_NOT_INSTALLED`, `CIRCULAR_DEPENDENCY`, `VERSION_NOT_FOUND`, `SCHEMA_INVALID`, `REPO_FETCH_FAILED`, `NON_INTERACTIVE` |
| `2` | Usage Error | Bad arguments (handled by commander) |
| `3` | Environment Error | `VENCORD_NOT_FOUND`, `GIT_NOT_AVAILABLE`, `PNPM_NOT_AVAILABLE`, `DISCORD_NOT_FOUND`, `BUILD_FAILED` |

## Fuzzy Matching

When a `PLUGIN_NOT_FOUND` error occurs, venpm computes Levenshtein distance against all known plugin names and suggests close matches:

- Single match: `"Did you mean: BetterVolume"`
- Multiple matches: `"Did you mean one of: BetterVolume, VolumeBooster"`

In JSON output, the candidates are in the `candidates` array:

```json
{
  "code": "PLUGIN_NOT_FOUND",
  "message": "Plugin \"BeterVolume\" not found",
  "suggestion": "Did you mean: BetterVolume",
  "candidates": ["BetterVolume"]
}
```

This also applies to repo names (`--from`) and config keys (`venpm config get/set`).

## Handling Errors Programmatically

```bash
# Parse error code from --json output
result=$(venpm install badPlugin --json 2>/dev/null)
code=$(echo "$result" | jq -r '.error.code // empty')

case "$code" in
  PLUGIN_NOT_FOUND)
    echo "Plugin not found. Suggestions: $(echo "$result" | jq -r '.error.candidates[]')"
    ;;
  VENCORD_NOT_FOUND)
    echo "Configure Vencord: venpm config set vencord.path /path"
    ;;
  *)
    echo "Error: $(echo "$result" | jq -r '.error.message')"
    ;;
esac
```
