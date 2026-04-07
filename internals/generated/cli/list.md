# cli/list

## Functions

### executeList()

```ts
function executeList(ctx, options?): Promise<void>;
```

Defined in: venpm/src/cli/list.ts:8

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ctx` | [`IOContext`](../core/types.md#iocontext) |
| `options` | [`GlobalOptions`](../core/types.md#globaloptions) |

#### Returns

`Promise`\<`void`\>

***

### registerListCommand()

```ts
function registerListCommand(program): void;
```

Defined in: venpm/src/cli/list.ts:37

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `program` | `Command` |

#### Returns

`void`
