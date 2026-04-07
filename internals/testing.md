# Testing

venpm has 224 tests across three layers, all using [vitest](https://vitest.dev/).

## Running Tests

```bash
npm test                  # run all tests once
npm run test:watch        # watch mode
npm run test:coverage     # with coverage report
```

## Test Layers

### Unit Tests (`tests/unit/`)

Test individual core modules in isolation. Each core module has a corresponding test file. IOContext interfaces are mocked — no filesystem, network, or process spawning.

| Test File | Module Under Test |
|-----------|-------------------|
| `builder.test.ts` | `core/builder.ts` |
| `cache.test.ts` | `core/cache.ts` |
| `config.test.ts` | `core/config.ts` |
| `detect.test.ts` | `core/detect.ts` |
| `fetcher.test.ts` | `core/fetcher.ts` |
| `json.test.ts` | `core/json.ts` |
| `lockfile.test.ts` | `core/lockfile.ts` |
| `log.test.ts` | `core/log.ts` |
| `paths.test.ts` | `core/paths.ts` |
| `prompt.test.ts` | `core/prompt.ts` |
| `registry.test.ts` | `core/registry.ts` |
| `resolver.test.ts` | `core/resolver.ts` |
| `schema.test.ts` | `core/schema.ts` |
| `types.test.ts` | `core/types.ts` |

### Integration Tests (`tests/integration/`)

Test full command workflows with mocked IOContext. These call the `execute*()` functions directly (not through commander) with a mock context that captures all I/O.

| Test File | Workflow |
|-----------|----------|
| `install.test.ts` | Full install flow including dependency resolution |
| `uninstall.test.ts` | Uninstall with reverse dependency warnings |
| `create.test.ts` | Repo and plugin scaffolding |
| `json-commands.test.ts` | `--json` output for list, search, info |

### E2E Tests (`tests/e2e/`)

Run the compiled CLI as a subprocess against real temp directories. Tests use `execFile("node", [CLI_PATH, ...args])` with a temporary `XDG_CONFIG_HOME`.

| Test File | Coverage |
|-----------|----------|
| `cli.test.ts` | Full CLI: doctor, config, repo, create, validate |

## Writing Tests

### Mocking IOContext

Create a mock context with stubs for every interface:

```typescript
import { IOContext } from "../../src/core/types.js";
import { vi } from "vitest";

function createMockContext(): IOContext {
    return {
        fs: {
            readFile: vi.fn(),
            writeFile: vi.fn(),
            exists: vi.fn().mockResolvedValue(false),
            mkdir: vi.fn(),
            rm: vi.fn(),
            symlink: vi.fn(),
            readlink: vi.fn(),
            readdir: vi.fn().mockResolvedValue([]),
            stat: vi.fn(),
            lstat: vi.fn(),
            copyDir: vi.fn(),
        },
        http: {
            fetch: vi.fn(),
        },
        git: {
            available: vi.fn().mockResolvedValue(true),
            clone: vi.fn(),
            pull: vi.fn(),
            revParse: vi.fn(),
            checkout: vi.fn(),
        },
        shell: {
            exec: vi.fn().mockResolvedValue({ stdout: "", stderr: "", exitCode: 0 }),
            spawn: vi.fn(),
        },
        prompter: {
            confirm: vi.fn().mockResolvedValue(true),
            input: vi.fn(),
            select: vi.fn(),
        },
        logger: {
            info: vi.fn(),
            warn: vi.fn(),
            error: vi.fn(),
            verbose: vi.fn(),
            success: vi.fn(),
        },
    };
}
```

### Test Fixtures

Test fixtures live in `tests/fixtures/`. Currently includes a minimal plugin at `tests/fixtures/plugins/simplePlugin/index.ts`.

### Conventions

- Test files mirror the module they test: `core/resolver.ts` → `tests/unit/resolver.test.ts`
- Integration tests test `execute*()` functions, not commander
- E2E tests use temp directories and `XDG_CONFIG_HOME` override
- Mock only IOContext interfaces — no mocking internal functions
