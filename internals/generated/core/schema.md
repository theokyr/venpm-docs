# core/schema

## Interfaces

### ValidationResult

Defined in: venpm/src/core/schema.ts:15

#### Properties

##### errors

```ts
errors: string[];
```

Defined in: venpm/src/core/schema.ts:17

##### valid

```ts
valid: boolean;
```

Defined in: venpm/src/core/schema.ts:16

## Functions

### validateConfig()

```ts
function validateConfig(data): ValidationResult;
```

Defined in: venpm/src/core/schema.ts:52

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `unknown` |

#### Returns

[`ValidationResult`](#validationresult)

***

### validateIndex()

```ts
function validateIndex(data): ValidationResult;
```

Defined in: venpm/src/core/schema.ts:48

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `unknown` |

#### Returns

[`ValidationResult`](#validationresult)

***

### validateLockfile()

```ts
function validateLockfile(data): ValidationResult;
```

Defined in: venpm/src/core/schema.ts:56

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `unknown` |

#### Returns

[`ValidationResult`](#validationresult)
