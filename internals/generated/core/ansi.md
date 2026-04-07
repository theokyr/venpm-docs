# core/ansi

## Interfaces

### Colors

Defined in: venpm/src/core/ansi.ts:9

#### Methods

##### amber()

```ts
amber(text): string;
```

Defined in: venpm/src/core/ansi.ts:10

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

###### Returns

`string`

##### bold()

```ts
bold(text): string;
```

Defined in: venpm/src/core/ansi.ts:16

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

###### Returns

`string`

##### bright()

```ts
bright(text): string;
```

Defined in: venpm/src/core/ansi.ts:15

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

###### Returns

`string`

##### dim()

```ts
dim(text): string;
```

Defined in: venpm/src/core/ansi.ts:14

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

###### Returns

`string`

##### emerald()

```ts
emerald(text): string;
```

Defined in: venpm/src/core/ansi.ts:11

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

###### Returns

`string`

##### red()

```ts
red(text): string;
```

Defined in: venpm/src/core/ansi.ts:12

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

###### Returns

`string`

##### yellow()

```ts
yellow(text): string;
```

Defined in: venpm/src/core/ansi.ts:13

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

###### Returns

`string`

## Functions

### createColors()

```ts
function createColors(enabled): Colors;
```

Defined in: venpm/src/core/ansi.ts:19

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `enabled` | `boolean` |

#### Returns

[`Colors`](#colors)

***

### shouldColorize()

```ts
function shouldColorize(stream): boolean;
```

Defined in: venpm/src/core/ansi.ts:42

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `stream` | \{ `isTTY?`: `boolean`; \} |
| `stream.isTTY?` | `boolean` |

#### Returns

`boolean`
