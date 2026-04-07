# core/lockfile

## Variables

### EMPTY\_LOCKFILE

```ts
const EMPTY_LOCKFILE: LockfileData;
```

Defined in: venpm/src/core/lockfile.ts:4

## Functions

### addInstalled()

```ts
function addInstalled(
   data, 
   name, 
   entry): LockfileData;
```

Defined in: venpm/src/core/lockfile.ts:26

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`LockfileData`](types.md#lockfiledata) |
| `name` | `string` |
| `entry` | [`InstalledPlugin`](types.md#installedplugin) |

#### Returns

[`LockfileData`](types.md#lockfiledata)

***

### getInstalled()

```ts
function getInstalled(data, name): InstalledPlugin | undefined;
```

Defined in: venpm/src/core/lockfile.ts:22

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`LockfileData`](types.md#lockfiledata) |
| `name` | `string` |

#### Returns

[`InstalledPlugin`](types.md#installedplugin) \| `undefined`

***

### isInstalled()

```ts
function isInstalled(data, name): boolean;
```

Defined in: venpm/src/core/lockfile.ts:18

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`LockfileData`](types.md#lockfiledata) |
| `name` | `string` |

#### Returns

`boolean`

***

### loadLockfile()

```ts
function loadLockfile(fs, path): Promise<LockfileData>;
```

Defined in: venpm/src/core/lockfile.ts:6

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `path` | `string` |

#### Returns

`Promise`\<[`LockfileData`](types.md#lockfiledata)\>

***

### removeInstalled()

```ts
function removeInstalled(data, name): LockfileData;
```

Defined in: venpm/src/core/lockfile.ts:33

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`LockfileData`](types.md#lockfiledata) |
| `name` | `string` |

#### Returns

[`LockfileData`](types.md#lockfiledata)

***

### saveLockfile()

```ts
function saveLockfile(
   fs, 
   path, 
data): Promise<void>;
```

Defined in: venpm/src/core/lockfile.ts:13

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `path` | `string` |
| `data` | [`LockfileData`](types.md#lockfiledata) |

#### Returns

`Promise`\<`void`\>
