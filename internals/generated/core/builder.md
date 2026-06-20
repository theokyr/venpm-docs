# core/builder

## Interfaces

### BuildAndDeployOptions

Defined in: venpm/src/core/builder.ts:81

#### Properties

##### discordBinary?

```ts
optional discordBinary?: string;
```

Defined in: venpm/src/core/builder.ts:83

##### restart?

```ts
optional restart?: boolean;
```

Defined in: venpm/src/core/builder.ts:82

***

### DeployResult

Defined in: venpm/src/core/builder.ts:16

#### Properties

##### deployed

```ts
deployed: boolean;
```

Defined in: venpm/src/core/builder.ts:17

##### deployPath?

```ts
optional deployPath?: string;
```

Defined in: venpm/src/core/builder.ts:18

##### restarted

```ts
restarted: boolean;
```

Defined in: venpm/src/core/builder.ts:19

## Variables

### DEPLOY\_PATHS

```ts
const DEPLOY_PATHS: Record<"linux" | "darwin" | "win32", string>;
```

Defined in: venpm/src/core/builder.ts:8

## Functions

### buildAndDeploy()

```ts
function buildAndDeploy(
   fs, 
   shell, 
   vencordPath, 
options?): Promise<DeployResult>;
```

Defined in: venpm/src/core/builder.ts:89

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
function buildVencord(shell, vencordPath): Promise<void>;
```

Defined in: venpm/src/core/builder.ts:28

Run `pnpm build` inside `vencordPath`.
Throws an error if the build exits with a non-zero code.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `shell` | [`ShellRunner`](types.md#shellrunner) |
| `vencordPath` | `string` |

#### Returns

`Promise`\<`void`\>

***

### deployDist()

```ts
function deployDist(fs, vencordPath): Promise<DeployResult>;
```

Defined in: venpm/src/core/builder.ts:47

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

### restartDiscord()

```ts
function restartDiscord(
   fs, 
   shell, 
discordBinary): Promise<void>;
```

Defined in: venpm/src/core/builder.ts:69

Kill all running Discord processes, wait for confirmed exit, then spawn
the binary detached.  Uses `/proc/<pid>/exe`-based discovery so only
verified Discord binaries are killed (no stray processes).  SIGTERM is
tried first; survivors are escalated to SIGKILL.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `shell` | [`ShellRunner`](types.md#shellrunner) |
| `discordBinary` | `string` |

#### Returns

`Promise`\<`void`\>
