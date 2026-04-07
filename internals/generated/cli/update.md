# cli/update

## Functions

### executeUpdate()

```ts
function executeUpdate(
   ctx, 
   pluginName, 
options): Promise<void>;
```

Defined in: venpm/src/cli/update.ts:15

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ctx` | [`IOContext`](../core/types.md#iocontext) |
| `pluginName` | `string` \| `undefined` |
| `options` | [`GlobalOptions`](../core/types.md#globaloptions) |

#### Returns

`Promise`\<`void`\>

***

### registerUpdateCommand()

```ts
function registerUpdateCommand(program): void;
```

Defined in: venpm/src/cli/update.ts:165

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `program` | `Command` |

#### Returns

`void`
