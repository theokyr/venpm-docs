# cli/inject

## Functions

### appManagementSuggestionForInjectError()

```ts
function appManagementSuggestionForInjectError(err): string | undefined;
```

Defined in: venpm/src/cli/inject.ts:42

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `Error` |

#### Returns

`string` \| `undefined`

***

### registerInjectCommand()

```ts
function registerInjectCommand(program): void;
```

Defined in: venpm/src/cli/inject.ts:115

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `program` | `Command` |

#### Returns

`void`

***

### registerUninjectCommand()

```ts
function registerUninjectCommand(program): void;
```

Defined in: venpm/src/cli/inject.ts:194

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `program` | `Command` |

#### Returns

`void`

***

### shouldRestartAfterInject()

```ts
function shouldRestartAfterInject(
   options, 
   restartMode, 
   discordBinary, 
confirm): Promise<boolean>;
```

Defined in: venpm/src/cli/inject.ts:99

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | `Pick`\<`InjectCmdOptions`, `"restart"`\> |
| `restartMode` | [`RestartMode`](../core/types.md#restartmode) |
| `discordBinary` | `string` \| `null` |
| `confirm` | (`message`, `defaultValue?`) => `Promise`\<`boolean`\> |

#### Returns

`Promise`\<`boolean`\>
