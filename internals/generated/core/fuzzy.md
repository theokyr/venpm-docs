# core/fuzzy

## Functions

### findCandidates()

```ts
function findCandidates(
   input, 
   candidates, 
   maxResults?): string[];
```

Defined in: venpm/src/core/fuzzy.ts:24

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `input` | `string` | `undefined` |
| `candidates` | `string`[] | `undefined` |
| `maxResults` | `number` | `3` |

#### Returns

`string`[]

***

### levenshtein()

```ts
function levenshtein(a, b): number;
```

Defined in: venpm/src/core/fuzzy.ts:1

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | `string` |
| `b` | `string` |

#### Returns

`number`
