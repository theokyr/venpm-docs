# core/detect

## Variables

### VENCORD\_SEARCH\_PATHS

```ts
const VENCORD_SEARCH_PATHS: string[];
```

Defined in: venpm/src/core/detect.ts:5

## Functions

### checkGitAvailable()

```ts
function checkGitAvailable(shell): Promise<boolean>;
```

Defined in: venpm/src/core/detect.ts:91

Check whether `git` is available on PATH.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `shell` | [`ShellRunner`](types.md#shellrunner) |

#### Returns

`Promise`\<`boolean`\>

***

### checkPnpmAvailable()

```ts
function checkPnpmAvailable(shell): Promise<boolean>;
```

Defined in: venpm/src/core/detect.ts:103

Check whether `pnpm` is available on PATH.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `shell` | [`ShellRunner`](types.md#shellrunner) |

#### Returns

`Promise`\<`boolean`\>

***

### detectDiscordBinary()

```ts
function detectDiscordBinary(fs): Promise<string | null>;
```

Defined in: venpm/src/core/detect.ts:79

Detect the Discord binary path.

Returns the first candidate that exists on disk, or null.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |

#### Returns

`Promise`\<`string` \| `null`\>

***

### detectVencordPath()

```ts
function detectVencordPath(fs): Promise<string | null>;
```

Defined in: venpm/src/core/detect.ts:30

Detect the Vencord source checkout path.

Checks `$VENPM_VENCORD_PATH` first, then scans VENCORD_SEARCH_PATHS.
A path is valid when `<path>/package.json` exists.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |

#### Returns

`Promise`\<`string` \| `null`\>

Absolute path string or null when not found.

***

### resolveTilde()

```ts
function resolveTilde(p): string;
```

Defined in: venpm/src/core/detect.ts:15

Replace a leading `~` with the user's home directory.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `p` | `string` |

#### Returns

`string`
