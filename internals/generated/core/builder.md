# core/builder

## Interfaces

### BuildAndDeployOptions

Defined in: venpm/src/core/builder.ts:136

#### Properties

##### discordBinary?

```ts
optional discordBinary?: string;
```

Defined in: venpm/src/core/builder.ts:138

##### pnpmEnv?

```ts
optional pnpmEnv?: Record<string, string>;
```

Defined in: venpm/src/core/builder.ts:139

##### restart?

```ts
optional restart?: boolean;
```

Defined in: venpm/src/core/builder.ts:137

##### restartOptions?

```ts
optional restartOptions?: RestartOptions;
```

Defined in: venpm/src/core/builder.ts:140

***

### BuildVencordOptions

Defined in: venpm/src/core/builder.ts:50

#### Properties

##### pnpmEnv?

```ts
optional pnpmEnv?: Record<string, string>;
```

Defined in: venpm/src/core/builder.ts:51

***

### DeployResult

Defined in: venpm/src/core/builder.ts:40

#### Properties

##### deployed

```ts
deployed: boolean;
```

Defined in: venpm/src/core/builder.ts:41

##### deployPath?

```ts
optional deployPath?: string;
```

Defined in: venpm/src/core/builder.ts:42

##### restarted

```ts
restarted: boolean;
```

Defined in: venpm/src/core/builder.ts:43

##### restartedPids?

```ts
optional restartedPids?: number[];
```

Defined in: venpm/src/core/builder.ts:45

PIDs of the Discord processes confirmed alive after the restart.

***

### RestartOptions

Defined in: venpm/src/core/builder.ts:7

#### Properties

##### env?

```ts
optional env?: Record<string, string | undefined>;
```

Defined in: venpm/src/core/builder.ts:13

##### logFile?

```ts
optional logFile?: string;
```

Defined in: venpm/src/core/builder.ts:10

##### platform?

```ts
optional platform?: Platform;
```

Defined in: venpm/src/core/builder.ts:12

Overrides for tests and for callers that launch into another session.

##### settleMs?

```ts
optional settleMs?: number;
```

Defined in: venpm/src/core/builder.ts:8

##### startupTimeoutMs?

```ts
optional startupTimeoutMs?: number;
```

Defined in: venpm/src/core/builder.ts:9

## Variables

### DEPLOY\_PATHS

```ts
const DEPLOY_PATHS: Record<"linux" | "darwin" | "win32", string>;
```

Defined in: venpm/src/core/builder.ts:32

## Functions

### buildAndDeploy()

```ts
function buildAndDeploy(
   fs, 
   shell, 
   vencordPath, 
options?): Promise<DeployResult>;
```

Defined in: venpm/src/core/builder.ts:146

Orchestrate build → deploy → (optional) restart.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `shell` | [`ShellRunner`](types.md#shellrunner) |
| `vencordPath` | `string` |
| `options` | [`BuildAndDeployOptions`](#buildanddeployoptions) |

#### Returns

`Promise`\<[`DeployResult`](#deployresult)\>

***

### buildVencord()

```ts
function buildVencord(
   shell, 
   vencordPath, 
options?): Promise<void>;
```

Defined in: venpm/src/core/builder.ts:58

Run `pnpm build` inside `vencordPath`.
Throws an error if the build exits with a non-zero code.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `shell` | [`ShellRunner`](types.md#shellrunner) |
| `vencordPath` | `string` |
| `options` | [`BuildVencordOptions`](#buildvencordoptions) |

#### Returns

`Promise`\<`void`\>

***

### deployDist()

```ts
function deployDist(fs, vencordPath): Promise<DeployResult>;
```

Defined in: venpm/src/core/builder.ts:86

Copy `<vencordPath>/dist/` to the platform-specific deployed location.

Creates the deploy directory if it doesn't exist. Previous behaviour was to
skip silently when the directory was missing, which required users to run
Vencord's own installer first to bootstrap it. On macOS Apple Silicon that
installer is x86-only and often fails, so we make `rebuild` self-sufficient.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `vencordPath` | `string` |

#### Returns

`Promise`\<[`DeployResult`](#deployresult)\>

***

### getLaunchLogPath()

```ts
function getLaunchLogPath(): string;
```

Defined in: venpm/src/core/builder.ts:17

Where a failed launch leaves its output, so the error can quote it.

#### Returns

`string`

***

### restartDiscord()

```ts
function restartDiscord(
   fs, 
   shell, 
   discordBinary, 
options?): Promise<LaunchVerification>;
```

Defined in: venpm/src/core/builder.ts:112

Kill all running Discord processes, wait for confirmed exit, then start the
binary again and *prove* it came back.  Uses `/proc/<pid>/exe`-based discovery
so only verified Discord binaries are killed (no stray processes).  SIGTERM is
tried first; survivors are escalated to SIGKILL.

The launch is platform-aware (Wayland/X11 on Linux, `open -a` on macOS) and
verified: an exit during the settle window raises an error instead of the
caller reporting a restart that never happened.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `shell` | [`ShellRunner`](types.md#shellrunner) |
| `discordBinary` | `string` |
| `options` | [`RestartOptions`](#restartoptions-1) |

#### Returns

`Promise`\<[`LaunchVerification`](launch.md#launchverification)\>
