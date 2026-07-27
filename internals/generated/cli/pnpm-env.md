# cli/pnpm-env

## Functions

### createPnpmEnvForNonInteractiveYes()

```ts
function createPnpmEnvForNonInteractiveYes(options): Record<string, string> | undefined;
```

Defined in: venpm/src/cli/pnpm-env.ts:7

pnpm prompts before recreating node_modules unless it knows the caller is
intentionally non-interactive. Apply that only for explicit yes-like modes.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | `Pick`\<[`GlobalOptions`](../core/types.md#globaloptions), `"yes"` \| `"json"` \| `"jsonStream"`\> |

#### Returns

`Record`\<`string`, `string`\> \| `undefined`
