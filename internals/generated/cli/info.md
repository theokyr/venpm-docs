# cli/info

## Functions

### executeInfo()

```ts
function executeInfo(
   ctx, 
   pluginName, 
options?): Promise<void>;
```

Defined in: venpm/src/cli/info.ts:12

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ctx` | [`IOContext`](../core/types.md#iocontext) |
| `pluginName` | `string` |
| `options` | [`GlobalOptions`](../core/types.md#globaloptions) |

#### Returns

`Promise`\<`void`\>

***

### registerInfoCommand()

```ts
function registerInfoCommand(program): void;
```

Defined in: venpm/src/cli/info.ts:96

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `program` | `Command` |

#### Returns

`void`
