# cli/first-run

## Functions

### needsFirstRun()

```ts
function needsFirstRun(commandName): boolean;
```

Defined in: venpm/src/cli/first-run.ts:11

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `commandName` | `string` |

#### Returns

`boolean`

***

### runFirstTimeSetup()

```ts
function runFirstTimeSetup(ctx, version): Promise<boolean>;
```

Defined in: venpm/src/cli/first-run.ts:15

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ctx` | [`IOContext`](../core/types.md#iocontext) |
| `version` | `string` |

#### Returns

`Promise`\<`boolean`\>
