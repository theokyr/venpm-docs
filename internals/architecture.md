# Architecture

## Overview

venpm is a CLI tool built in TypeScript (ESM-only, Node.js >= 18). It has two layers:

```
src/
  core/     Pure logic + I/O interfaces
  cli/      Command handlers (compose core modules)
```

The `core/` layer contains all business logic. The `cli/` layer contains commander command definitions that wire core modules together. Core never imports from CLI. CLI imports from core.

## IOContext — Dependency Injection

The central design pattern is **IOContext**: every core module receives its I/O dependencies as function parameters, never importing `fs`, `fetch`, or `child_process` directly.

```typescript
interface IOContext {
    fs: FileSystem;       // readFile, writeFile, exists, mkdir, rm, symlink, etc.
    http: HttpClient;     // fetch with headers (ETag, Last-Modified)
    git: GitClient;       // clone (sparse checkout), pull, revParse, checkout
    shell: ShellRunner;   // exec, spawn (detached support)
    prompter: Prompter;   // confirm, input, select (--yes auto-confirms)
    logger: Logger;       // info, warn, error, verbose, success
}
```

In production, `cli/context.ts` provides `createRealIOContext()` which wires real Node.js APIs. In tests, every interface is mocked — this is what makes the codebase fully testable without touching the filesystem, network, or spawning processes.

## Module Map

### Core Modules (`src/core/`)

| Module | Responsibility |
|--------|----------------|
| `types.ts` | All interfaces: IOContext, PluginIndex, Config, Lockfile, InstallPlan, etc. |
| `paths.ts` | XDG-compliant config directory per OS |
| `config.ts` | Load, save, and merge `config.json` with defaults |
| `lockfile.ts` | Immutable lockfile operations (add/remove return new objects) |
| `schema.ts` | AJV validation against the three JSON Schemas |
| `detect.ts` | Auto-detect Vencord path, Discord binary, git, pnpm |
| `registry.ts` | Fetch, parse, and cache plugin indexes from repos |
| `resolver.ts` | Version resolution, dependency graph (topological sort), install plan generation |
| `fetcher.ts` | Git clone (sparse checkout for monorepos), tarball extract, local symlink |
| `builder.ts` | Vencord `pnpm build`, deploy dist to Discord, restart Discord |
| `cache.ts` | HTTP index caching with ETag/Last-Modified conditional requests |
| `prompt.ts` | Interactive prompts with `--yes` auto-confirm |
| `log.ts` | Structured logger with `--verbose` / `--quiet` support |
| `json.ts` | JSON envelope format for `--json` output |

### CLI Modules (`src/cli/`)

Each file registers one commander command (or command group). They compose core modules by calling functions with `IOContext`.

| Module | Command |
|--------|---------|
| `install.ts` | `venpm install` |
| `uninstall.ts` | `venpm uninstall` |
| `update.ts` | `venpm update` |
| `list.ts` | `venpm list` |
| `search.ts` | `venpm search` |
| `info.ts` | `venpm info` |
| `repo.ts` | `venpm repo add/remove/list` |
| `config-cmd.ts` | `venpm config set/get/path` |
| `create.ts` | `venpm create` |
| `rebuild.ts` | `venpm rebuild` |
| `doctor.ts` | `venpm doctor` |
| `validate.ts` | `venpm validate` |
| `context.ts` | `createRealIOContext()` factory |

## Install Flow

The install pipeline (in `cli/install.ts` composing core modules):

1. Load config, lockfile, and index cache
2. Fetch indexes from all repos (parallel, with ETag/Last-Modified caching)
3. Resolve the plugin across repos (error if ambiguous without `--from`)
4. Build dependency graph (topological sort, circular dependency detection)
5. Generate install plan (skip already-installed, select git/tarball method)
6. Warn about missing optional dependencies
7. Confirm with user (skipped with `--yes`)
8. Fetch each plugin (git sparse checkout or tarball extract)
9. Update lockfile (set `pinned: true` if `--version` was used)
10. Optionally rebuild Vencord + restart Discord

## Config & State

All state lives in a single directory per platform:

| OS | Path |
|----|------|
| Linux | `~/.config/venpm/` (or `$XDG_CONFIG_HOME/venpm/`) |
| macOS | `~/Library/Application Support/venpm/` |
| Windows | `%APPDATA%\venpm\` |

Files:
- `config.json` — user preferences
- `venpm-lock.json` — installed plugin tracking
- `index-cache.json` — HTTP cache metadata for repo indexes

## Design Principles

- **No global state.** All state flows through function parameters.
- **Immutable lockfile.** `addInstalled()` / `removeInstalled()` return new objects — no mutation.
- **Graceful exits.** `process.exitCode = 1; return` — never `process.exit(1)`.
- **Zero native deps.** Only npm packages: `commander`, `ajv`, `ajv-formats`, `tar`.
- **Schema-first.** The JSON Schemas in `schemas/v1/` are the primary deliverable — the CLI is one consumer.
