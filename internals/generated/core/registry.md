# core/registry

## Interfaces

### FetchAllIndexesOptions

Defined in: venpm/src/core/registry.ts:88

#### Properties

##### cache?

```ts
optional cache?: IndexCache;
```

Defined in: venpm/src/core/registry.ts:89

***

### FetchAllIndexesResult

Defined in: venpm/src/core/registry.ts:92

#### Properties

##### results

```ts
results: FetchedIndex[];
```

Defined in: venpm/src/core/registry.ts:93

##### updatedCache

```ts
updatedCache: IndexCache;
```

Defined in: venpm/src/core/registry.ts:94

***

### FetchedIndex

Defined in: venpm/src/core/registry.ts:5

#### Properties

##### error?

```ts
optional error?: string;
```

Defined in: venpm/src/core/registry.ts:8

##### index?

```ts
optional index?: PluginIndex;
```

Defined in: venpm/src/core/registry.ts:7

##### repoName

```ts
repoName: string;
```

Defined in: venpm/src/core/registry.ts:6

***

### FetchIndexOptions

Defined in: venpm/src/core/registry.ts:17

#### Properties

##### cached?

```ts
optional cached?: CacheEntry;
```

Defined in: venpm/src/core/registry.ts:18

***

### FetchIndexResult

Defined in: venpm/src/core/registry.ts:21

#### Properties

##### index

```ts
index: PluginIndex;
```

Defined in: venpm/src/core/registry.ts:22

##### updatedEntry?

```ts
optional updatedEntry?: CacheEntry;
```

Defined in: venpm/src/core/registry.ts:23

***

### PluginMatch

Defined in: venpm/src/core/registry.ts:11

#### Properties

##### entry

```ts
entry: PluginEntry;
```

Defined in: venpm/src/core/registry.ts:14

##### name

```ts
name: string;
```

Defined in: venpm/src/core/registry.ts:12

##### repoName

```ts
repoName: string;
```

Defined in: venpm/src/core/registry.ts:13

## Functions

### fetchAllIndexes()

```ts
function fetchAllIndexes(
   http, 
   repos, 
options?): Promise<FetchAllIndexesResult>;
```

Defined in: venpm/src/core/registry.ts:101

Fetch all indexes in parallel, capturing errors into FetchedIndex.error (never throwing).
Accepts an optional cache; returns an updated cache with any new/refreshed entries.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](types.md#httpclient) |
| `repos` | [`RepoEntry`](types.md#repoentry)[] |
| `options?` | [`FetchAllIndexesOptions`](#fetchallindexesoptions) |

#### Returns

`Promise`\<[`FetchAllIndexesResult`](#fetchallindexesresult)\>

***

### fetchIndex()

```ts
function fetchIndex(
   http, 
   url, 
options?): Promise<FetchIndexResult>;
```

Defined in: venpm/src/core/registry.ts:33

Fetch a single plugin index from `url` using `http`.
If a cached entry is provided, sends conditional request headers.
On 304 Not Modified, returns the cached body.
On 200, updates the cache entry with new ETag/Last-Modified.
Throws on HTTP error or invalid JSON.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](types.md#httpclient) |
| `url` | `string` |
| `options?` | [`FetchIndexOptions`](#fetchindexoptions) |

#### Returns

`Promise`\<[`FetchIndexResult`](#fetchindexresult)\>

***

### resolvePlugin()

```ts
function resolvePlugin(
   indexes, 
   pluginName, 
   fromRepo?): PluginMatch | undefined;
```

Defined in: venpm/src/core/registry.ts:148

Find a plugin by name across fetched indexes.
If `fromRepo` is given, only that repo is searched.
Returns `undefined` when not found.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `indexes` | [`FetchedIndex`](#fetchedindex)[] |
| `pluginName` | `string` |
| `fromRepo?` | `string` |

#### Returns

[`PluginMatch`](#pluginmatch) \| `undefined`

***

### searchPlugins()

```ts
function searchPlugins(indexes, query): PluginMatch[];
```

Defined in: venpm/src/core/registry.ts:172

Fuzzy search plugins by name and description across all fetched indexes.
Name matches are returned before description-only matches.
Case-insensitive substring match.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `indexes` | [`FetchedIndex`](#fetchedindex)[] |
| `query` | `string` |

#### Returns

[`PluginMatch`](#pluginmatch)[]
