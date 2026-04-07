# cli/create

## Interfaces

### CreateOptions

Defined in: venpm/src/cli/create.ts:9

#### Extends

- [`GlobalOptions`](../core/types.md#globaloptions)

#### Properties

##### config?

```ts
optional config?: string;
```

Defined in: venpm/src/core/types.ts:191

###### Inherited from

[`GlobalOptions`](../core/types.md#globaloptions).[`config`](../core/types.md#config-2)

##### css?

```ts
optional css?: boolean;
```

Defined in: venpm/src/cli/create.ts:11

##### json?

```ts
optional json?: boolean;
```

Defined in: venpm/src/core/types.ts:193

###### Inherited from

[`GlobalOptions`](../core/types.md#globaloptions).[`json`](../core/types.md#json-1)

##### native?

```ts
optional native?: boolean;
```

Defined in: venpm/src/cli/create.ts:12

##### tsx?

```ts
optional tsx?: boolean;
```

Defined in: venpm/src/cli/create.ts:10

##### verbose?

```ts
optional verbose?: boolean;
```

Defined in: venpm/src/core/types.ts:192

###### Inherited from

[`GlobalOptions`](../core/types.md#globaloptions).[`verbose`](../core/types.md#verbose-1)

## Functions

### detectCreateMode()

```ts
function detectCreateMode(fs, targetPath): Promise<"repo" | "plugin">;
```

Defined in: venpm/src/cli/create.ts:52

Walk up ancestor directories from targetPath looking for a venpm plugins.json.
Returns "plugin" if found, "repo" otherwise.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](../core/types.md#filesystem) |
| `targetPath` | `string` |

#### Returns

`Promise`\<`"repo"` \| `"plugin"`\>

***

### executeCreate()

```ts
function executeCreate(
   ctx, 
   targetPath, 
options): Promise<void>;
```

Defined in: venpm/src/cli/create.ts:242

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ctx` | [`IOContext`](../core/types.md#iocontext) |
| `targetPath` | `string` |
| `options` | [`CreateOptions`](#createoptions) |

#### Returns

`Promise`\<`void`\>

***

### findAncestorIndex()

```ts
function findAncestorIndex(fs, startPath): Promise<
  | {
  data: Record<string, unknown>;
  path: string;
}
| null>;
```

Defined in: venpm/src/cli/create.ts:21

Walk up ancestor directories from startPath looking for a plugins.json whose
$schema contains "venpm". Returns { path, data } if found, null otherwise.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](../core/types.md#filesystem) |
| `startPath` | `string` |

#### Returns

`Promise`\<
  \| \{
  `data`: `Record`\<`string`, `unknown`\>;
  `path`: `string`;
\}
  \| `null`\>

***

### registerCreateCommand()

```ts
function registerCreateCommand(program): void;
```

Defined in: venpm/src/cli/create.ts:266

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `program` | `Command` |

#### Returns

`void`
