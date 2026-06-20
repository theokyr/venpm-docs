# core/discord

## Interfaces

### DiscordProcess

Defined in: venpm/src/core/discord.ts:5

#### Properties

##### exe

```ts
exe: string;
```

Defined in: venpm/src/core/discord.ts:7

##### pid

```ts
pid: number;
```

Defined in: venpm/src/core/discord.ts:6

***

### KillResult

Defined in: venpm/src/core/discord.ts:10

#### Properties

##### forced

```ts
forced: number[];
```

Defined in: venpm/src/core/discord.ts:13

##### found

```ts
found: DiscordProcess[];
```

Defined in: venpm/src/core/discord.ts:11

##### killed

```ts
killed: number[];
```

Defined in: venpm/src/core/discord.ts:12

## Functions

### findDiscordProcesses()

```ts
function findDiscordProcesses(
   fs, 
   shell, 
configuredBinary?): Promise<DiscordProcess[]>;
```

Defined in: venpm/src/core/discord.ts:83

Find running Discord processes on Linux by inspecting `/proc/<pid>/exe`.
Only returns processes whose binary resolves to a known Discord path.

On non-Linux platforms, falls back to `ps` output parsing (macOS) or
returns an empty array (Windows — handled separately by the caller).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `shell` | [`ShellRunner`](types.md#shellrunner) |
| `configuredBinary?` | `string` \| `null` |

#### Returns

`Promise`\<[`DiscordProcess`](#discordprocess)[]\>

***

### isDiscordBinary()

```ts
function isDiscordBinary(resolvedPath, configuredBinary?): boolean;
```

Defined in: venpm/src/core/discord.ts:68

Check whether a resolved binary path belongs to a Discord installation.
Matches against known install locations + the user's configured binary.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `resolvedPath` | `string` |
| `configuredBinary?` | `string` \| `null` |

#### Returns

`boolean`

***

### killDiscordProcesses()

```ts
function killDiscordProcesses(
   fs, 
   shell, 
configuredBinary?): Promise<KillResult>;
```

Defined in: venpm/src/core/discord.ts:204

Kill all running Discord processes with SIGTERM → wait → SIGKILL escalation.

1. Discovers processes via `/proc/<pid>/exe` (Linux) or `ps` (macOS)
2. Sends SIGTERM to all matching PIDs
3. Waits up to 5 s for graceful exit (polling every 250 ms)
4. Sends SIGKILL to any survivors
5. Waits up to 2 s for forced exit

On Windows, falls back to `taskkill /F` against the configured binary name.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `shell` | [`ShellRunner`](types.md#shellrunner) |
| `configuredBinary?` | `string` \| `null` |

#### Returns

`Promise`\<[`KillResult`](#killresult)\>
