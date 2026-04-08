# core/log

## Functions

### createLogger()

```ts
function createLogger(options, write?): Logger;
```

Defined in: venpm/src/core/log.ts:11

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `options` | \{ `quiet`: `boolean`; `verbose`: `boolean`; \} | `undefined` |
| `options.quiet` | `boolean` | `undefined` |
| `options.verbose` | `boolean` | `undefined` |
| `write` | `WriteFn` | `console.log` |

#### Returns

`Logger`
