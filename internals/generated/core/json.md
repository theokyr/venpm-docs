# core/json

## Interfaces

### JsonEnvelope

Defined in: venpm/src/core/json.ts:1

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Properties

##### data?

```ts
optional data?: T;
```

Defined in: venpm/src/core/json.ts:4

##### error?

```ts
optional error?: string;
```

Defined in: venpm/src/core/json.ts:3

##### success

```ts
success: boolean;
```

Defined in: venpm/src/core/json.ts:2

## Functions

### jsonError()

```ts
function jsonError(message): JsonEnvelope<never>;
```

Defined in: venpm/src/core/json.ts:11

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |

#### Returns

[`JsonEnvelope`](#jsonenvelope)\<`never`\>

***

### jsonSuccess()

```ts
function jsonSuccess<T>(data): JsonEnvelope<T>;
```

Defined in: venpm/src/core/json.ts:7

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `T` |

#### Returns

[`JsonEnvelope`](#jsonenvelope)\<`T`\>

***

### writeJson()

```ts
function writeJson(envelope, write?): void;
```

Defined in: venpm/src/core/json.ts:15

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `envelope` | [`JsonEnvelope`](#jsonenvelope) |
| `write` | (`s`) => `void` |

#### Returns

`void`
