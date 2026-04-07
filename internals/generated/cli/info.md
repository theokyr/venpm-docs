# cli/info

## Functions

### executeInfo()

```ts
function executeInfo(
   ctx, 
   pluginName, 
options?): Promise<void>;
```

Defined in: venpm/src/cli/info.ts:11

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

Defined in: venpm/src/cli/info.ts:105

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `program` | `Command` |

#### Returns

`void`
