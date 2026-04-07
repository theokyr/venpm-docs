# cli/search

## Functions

### executeSearch()

```ts
function executeSearch(
   ctx, 
   query, 
options?): Promise<void>;
```

Defined in: venpm/src/cli/search.ts:10

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ctx` | [`IOContext`](../core/types.md#iocontext) |
| `query` | `string` |
| `options` | [`GlobalOptions`](../core/types.md#globaloptions) |

#### Returns

`Promise`\<`void`\>

***

### registerSearchCommand()

```ts
function registerSearchCommand(program): void;
```

Defined in: venpm/src/cli/search.ts:49

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `program` | `Command` |

#### Returns

`void`
