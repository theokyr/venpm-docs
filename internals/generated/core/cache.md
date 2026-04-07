# core/cache

## Interfaces

### CacheEntry

Defined in: venpm/src/core/cache.ts:5

#### Properties

##### body

```ts
body: string;
```

Defined in: venpm/src/core/cache.ts:9

##### cachedAt

```ts
cachedAt: string;
```

Defined in: venpm/src/core/cache.ts:10

##### etag?

```ts
optional etag?: string;
```

Defined in: venpm/src/core/cache.ts:7

##### lastModified?

```ts
optional lastModified?: string;
```

Defined in: venpm/src/core/cache.ts:8

##### url

```ts
url: string;
```

Defined in: venpm/src/core/cache.ts:6

***

### IndexCache

Defined in: venpm/src/core/cache.ts:13

#### Properties

##### entries

```ts
entries: Record<string, CacheEntry>;
```

Defined in: venpm/src/core/cache.ts:14

## Functions

### getCachedEntry()

```ts
function getCachedEntry(cache, url): CacheEntry | undefined;
```

Defined in: venpm/src/core/cache.ts:39

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `cache` | [`IndexCache`](#indexcache) |
| `url` | `string` |

#### Returns

[`CacheEntry`](#cacheentry) \| `undefined`

***

### getCachePath()

```ts
function getCachePath(): string;
```

Defined in: venpm/src/core/cache.ts:17

#### Returns

`string`

***

### loadCache()

```ts
function loadCache(fs): Promise<IndexCache>;
```

Defined in: venpm/src/core/cache.ts:21

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |

#### Returns

`Promise`\<[`IndexCache`](#indexcache)\>

***

### saveCache()

```ts
function saveCache(fs, cache): Promise<void>;
```

Defined in: venpm/src/core/cache.ts:33

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `cache` | [`IndexCache`](#indexcache) |

#### Returns

`Promise`\<`void`\>

***

### setCachedEntry()

```ts
function setCachedEntry(
   cache, 
   url, 
   entry): IndexCache;
```

Defined in: venpm/src/core/cache.ts:43

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `cache` | [`IndexCache`](#indexcache) |
| `url` | `string` |
| `entry` | [`CacheEntry`](#cacheentry) |

#### Returns

[`IndexCache`](#indexcache)
