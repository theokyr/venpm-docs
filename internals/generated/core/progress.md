# core/progress

## Interfaces

### ProgressHandle

Defined in: venpm/src/core/progress.ts:3

#### Methods

##### fail()

```ts
fail(message?): void;
```

Defined in: venpm/src/core/progress.ts:6

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message?` | `string` |

###### Returns

`void`

##### succeed()

```ts
succeed(message?): void;
```

Defined in: venpm/src/core/progress.ts:5

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message?` | `string` |

###### Returns

`void`

##### update()

```ts
update(message): void;
```

Defined in: venpm/src/core/progress.ts:4

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |

###### Returns

`void`

## Functions

### createPlainProgress()

```ts
function createPlainProgress(
   _id, 
   initialMessage, 
   write): ProgressHandle;
```

Defined in: venpm/src/core/progress.ts:13

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_id` | `string` |
| `initialMessage` | `string` |
| `write` | `WriteFn` |

#### Returns

[`ProgressHandle`](#progresshandle)

***

### createTtyProgress()

```ts
function createTtyProgress(
   _id, 
   initialMessage, 
   write, 
   colors): ProgressHandle;
```

Defined in: venpm/src/core/progress.ts:38

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_id` | `string` |
| `initialMessage` | `string` |
| `write` | `WriteFn` |
| `colors` | [`Colors`](ansi.md#colors) |

#### Returns

[`ProgressHandle`](#progresshandle)
