# core/renderer

## Functions

### createPlainRenderer()

```ts
function createPlainRenderer(options, write?): Renderer;
```

Defined in: venpm/src/core/renderer.ts:42

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | \{ `quiet`: `boolean`; `verbose`: `boolean`; \} |
| `options.quiet` | `boolean` |
| `options.verbose` | `boolean` |
| `write` | `WriteFn` |

#### Returns

[`Renderer`](types.md#renderer-1)

***

### createTtyRenderer()

```ts
function createTtyRenderer(
   options, 
   write?, 
   colors?): Renderer;
```

Defined in: venpm/src/core/renderer.ts:123

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | \{ `quiet`: `boolean`; `verbose`: `boolean`; \} |
| `options.quiet` | `boolean` |
| `options.verbose` | `boolean` |
| `write` | `WriteFn` |
| `colors` | [`Colors`](ansi.md#colors) |

#### Returns

[`Renderer`](types.md#renderer-1)
