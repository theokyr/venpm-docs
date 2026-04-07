# core/json

## Interfaces

### JsonEnvelope

Defined in: venpm/src/core/json.ts:3

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Properties

##### data?

```ts
optional data?: T;
```

Defined in: venpm/src/core/json.ts:6

##### error?

```ts
optional error?: ErrorInfo;
```

Defined in: venpm/src/core/json.ts:5

##### success

```ts
success: boolean;
```

Defined in: venpm/src/core/json.ts:4

##### warnings?

```ts
optional warnings?: string[];
```

Defined in: venpm/src/core/json.ts:7

## Functions

### jsonError()

```ts
function jsonError(error): JsonEnvelope<never>;
```

Defined in: venpm/src/core/json.ts:18

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | [`ErrorInfo`](errors.md#errorinfo) |

#### Returns

[`JsonEnvelope`](#jsonenvelope)\<`never`\>

***

### jsonSuccess()

```ts
function jsonSuccess<T>(data, warnings?): JsonEnvelope<T>;
```

Defined in: venpm/src/core/json.ts:10

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `T` |
| `warnings?` | `string`[] |

#### Returns

[`JsonEnvelope`](#jsonenvelope)\<`T`\>

***

### writeJson()

```ts
function writeJson(envelope, write?): void;
```

Defined in: venpm/src/core/json.ts:22

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `envelope` | [`JsonEnvelope`](#jsonenvelope) |
| `write` | (`s`) => `void` |

#### Returns

`void`
