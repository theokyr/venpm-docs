# core/config

## Variables

### DEFAULT\_CONFIG

```ts
const DEFAULT_CONFIG: Config;
```

Defined in: venpm/src/core/config.ts:6

***

### DEFAULT\_REPO\_URL

```ts
const DEFAULT_REPO_URL: "https://github.com/theokyr/vencord-plugins/releases/latest/download/plugins.json" = "https://github.com/theokyr/vencord-plugins/releases/latest/download/plugins.json";
```

Defined in: venpm/src/core/config.ts:4

## Functions

### loadConfig()

```ts
function loadConfig(fs, configPath): Promise<Config>;
```

Defined in: venpm/src/core/config.ts:25

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `configPath` | `string` |

#### Returns

`Promise`\<[`Config`](types.md#config)\>

***

### mergeConfig()

```ts
function mergeConfig(partial): Config;
```

Defined in: venpm/src/core/config.ts:13

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `partial` | `Partial`\<[`Config`](types.md#config)\> |

#### Returns

[`Config`](types.md#config)

***

### saveConfig()

```ts
function saveConfig(
   fs, 
   configPath, 
config): Promise<void>;
```

Defined in: venpm/src/core/config.ts:33

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `configPath` | `string` |
| `config` | [`Config`](types.md#config) |

#### Returns

`Promise`\<`void`\>
