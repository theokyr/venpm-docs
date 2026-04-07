# core/fetcher

## Interfaces

### FetchResult

Defined in: venpm/src/core/fetcher.ts:11

#### Properties

##### git\_ref?

```ts
optional git_ref?: string;
```

Defined in: venpm/src/core/fetcher.ts:14

Git commit hash (only set when method === "git")

##### method

```ts
method: FetchMethod;
```

Defined in: venpm/src/core/fetcher.ts:12

##### path?

```ts
optional path?: string;
```

Defined in: venpm/src/core/fetcher.ts:16

Subdirectory path within the plugin dir (carried through from source)

## Functions

### fetchPlugin()

```ts
function fetchPlugin(
   entry, 
   userpluginDir, 
ctx): Promise<FetchResult>;
```

Defined in: venpm/src/core/fetcher.ts:112

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`InstallPlanEntry`](types.md#installplanentry) |
| `userpluginDir` | `string` |
| `ctx` | \{ `fs`: [`FileSystem`](types.md#filesystem); `git`: [`GitClient`](types.md#gitclient); `http`: [`HttpClient`](types.md#httpclient); \} |
| `ctx.fs` | [`FileSystem`](types.md#filesystem) |
| `ctx.git` | [`GitClient`](types.md#gitclient) |
| `ctx.http` | [`HttpClient`](types.md#httpclient) |

#### Returns

`Promise`\<[`FetchResult`](#fetchresult)\>

***

### fetchViaGit()

```ts
function fetchViaGit(
   git, 
   fs, 
   gitUrl, 
   dest, 
options?): Promise<FetchResult>;
```

Defined in: venpm/src/core/fetcher.ts:21

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `git` | [`GitClient`](types.md#gitclient) |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `gitUrl` | `string` |
| `dest` | `string` |
| `options` | \{ `path?`: `string`; `tag?`: `string`; \} |
| `options.path?` | `string` |
| `options.tag?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](#fetchresult)\>

***

### fetchViaLocal()

```ts
function fetchViaLocal(
   fs, 
   localPath, 
dest): Promise<FetchResult>;
```

Defined in: venpm/src/core/fetcher.ts:94

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `localPath` | `string` |
| `dest` | `string` |

#### Returns

`Promise`\<[`FetchResult`](#fetchresult)\>

***

### fetchViaTarball()

```ts
function fetchViaTarball(
   http, 
   fs, 
   tarballUrl, 
dest): Promise<FetchResult>;
```

Defined in: venpm/src/core/fetcher.ts:67

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](types.md#httpclient) |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `tarballUrl` | `string` |
| `dest` | `string` |

#### Returns

`Promise`\<[`FetchResult`](#fetchresult)\>
