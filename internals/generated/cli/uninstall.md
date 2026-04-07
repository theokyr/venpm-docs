# cli/uninstall

## Functions

### executeUninstall()

```ts
function executeUninstall(
   ctx, 
   pluginName, 
options): Promise<void>;
```

Defined in: venpm/src/cli/uninstall.ts:13

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ctx` | [`IOContext`](../core/types.md#iocontext) |
| `pluginName` | `string` |
| `options` | [`GlobalOptions`](../core/types.md#globaloptions) |

#### Returns

`Promise`\<`void`\>

***

### registerUninstallCommand()

```ts
function registerUninstallCommand(program): void;
```

Defined in: venpm/src/cli/uninstall.ts:62

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `program` | `Command` |

#### Returns

`void`
