# cli/install

## Functions

### executeInstall()

```ts
function executeInstall(
   ctx, 
   pluginName, 
options): Promise<void>;
```

Defined in: venpm/src/cli/install.ts:19

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ctx` | [`IOContext`](../core/types.md#iocontext) |
| `pluginName` | `string` |
| `options` | [`InstallOptions`](../core/types.md#installoptions) |

#### Returns

`Promise`\<`void`\>

***

### registerInstallCommand()

```ts
function registerInstallCommand(program): void;
```

Defined in: venpm/src/cli/install.ts:242

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `program` | `Command` |

#### Returns

`void`
