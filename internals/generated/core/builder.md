# core/builder

## Interfaces

### BuildAndDeployOptions

Defined in: venpm/src/core/builder.ts:95

#### Properties

##### discordBinary?

```ts
optional discordBinary?: string;
```

Defined in: venpm/src/core/builder.ts:97

##### restart?

```ts
optional restart?: boolean;
```

Defined in: venpm/src/core/builder.ts:96

***

### DeployResult

Defined in: venpm/src/core/builder.ts:15

#### Properties

##### deployed

```ts
deployed: boolean;
```

Defined in: venpm/src/core/builder.ts:16

##### deployPath?

```ts
optional deployPath?: string;
```

Defined in: venpm/src/core/builder.ts:17

##### restarted

```ts
restarted: boolean;
```

Defined in: venpm/src/core/builder.ts:18

## Variables

### DEPLOY\_PATHS

```ts
const DEPLOY_PATHS: Record<"linux" | "darwin" | "win32", string>;
```

Defined in: venpm/src/core/builder.ts:7

## Functions

### buildAndDeploy()

```ts
function buildAndDeploy(
   fs, 
   shell, 
   vencordPath, 
options?): Promise<DeployResult>;
```

Defined in: venpm/src/core/builder.ts:103

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

Defined in: venpm/src/core/builder.ts:27

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

Defined in: venpm/src/core/builder.ts:42

Copy `<vencordPath>/dist/` to the platform-specific deployed location.
Skips silently when the deployed directory does not exist on disk.

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
function restartDiscord(shell, discordBinary): Promise<void>;
```

Defined in: venpm/src/core/builder.ts:64

Kill Discord via `pkill`, wait briefly, then spawn the binary detached.
If pkill reports the process is not running (exit code 1) the kill step is
skipped — Discord is still spawned so the caller can open it fresh.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `shell` | [`ShellRunner`](types.md#shellrunner) |
| `discordBinary` | `string` |

#### Returns

`Promise`\<`void`\>
