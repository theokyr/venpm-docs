# Contributing

## Development Setup

```bash
git clone <repo-url> && cd venpm
node scripts/setup.mjs
```

The setup script:
1. Checks Node.js >= 18 and npm
2. Installs dependencies
3. Compiles TypeScript
4. Links `venpm` globally via `npm link`

After setup, you have a working `venpm` command that points at your local build.

## Development Workflow

```bash
npm run dev          # watch mode — auto-rebuild on source changes
npm test             # run the full test suite
npm run lint         # type-check (tsc --noEmit)
npm run build        # one-shot compile
```

The global `venpm` command uses the compiled output in `dist/`, so changes are picked up immediately in watch mode.

## Project Structure

```
src/
  core/          # Pure logic — never imports from cli/
  cli/           # Commander commands — compose core modules
  index.ts       # CLI entry point
schemas/v1/      # JSON Schemas (primary deliverable)
tests/
  unit/          # Core module tests (mocked IOContext)
  integration/   # Full workflow tests (mocked IOContext)
  e2e/           # Subprocess tests (real filesystem)
  fixtures/      # Test data
```

See [Architecture](/internals/architecture) for the full module map and design principles.

## Code Conventions

- **ESM only** — `"type": "module"` in package.json, `.js` extensions in imports
- **TypeScript strict mode** — no `any` unless unavoidable
- **No global state** — all state flows through function parameters
- **IOContext for I/O** — core modules never import `fs`, `fetch`, `child_process` directly
- **Immutable data** — lockfile operations return new objects, never mutate
- **Graceful exits** — `process.exitCode = 1; return`, never `process.exit(1)`
- **No native deps** — only `commander`, `ajv`, `ajv-formats`, `tar`

## Adding a New Command

1. Create `src/cli/my-command.ts` with a `registerMyCommand(program: Command)` function
2. Implement the logic in `src/core/` if needed (keeping I/O behind IOContext)
3. Register the command in `src/index.ts`
4. Add unit tests in `tests/unit/` for core logic
5. Add integration tests in `tests/integration/` for the full workflow
6. Add `--json` support using the envelope format from `core/json.ts`

## Adding a New Core Module

1. Create `src/core/my-module.ts`
2. Accept `IOContext` (or the specific interfaces you need) as parameters
3. Never import from `cli/`
4. Add unit tests in `tests/unit/my-module.test.ts`

## Cleanup

```bash
npm run unsetup      # remove global link
```
