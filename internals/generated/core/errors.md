# core/errors

## Interfaces

### ErrorInfo

Defined in: venpm/src/core/errors.ts:1

#### Properties

##### candidates?

```ts
optional candidates?: string[];
```

Defined in: venpm/src/core/errors.ts:5

##### code

```ts
code: string;
```

Defined in: venpm/src/core/errors.ts:2

##### docsUrl?

```ts
optional docsUrl?: string;
```

Defined in: venpm/src/core/errors.ts:6

##### message

```ts
message: string;
```

Defined in: venpm/src/core/errors.ts:3

##### suggestion?

```ts
optional suggestion?: string;
```

Defined in: venpm/src/core/errors.ts:4

## Type Aliases

### ErrorCodeValue

```ts
type ErrorCodeValue = typeof ErrorCode[keyof typeof ErrorCode];
```

Defined in: venpm/src/core/errors.ts:25

## Variables

### ErrorCode

```ts
const ErrorCode: {
  BUILD_FAILED: "BUILD_FAILED";
  CIRCULAR_DEPENDENCY: "CIRCULAR_DEPENDENCY";
  DISCORD_NOT_FOUND: "DISCORD_NOT_FOUND";
  GIT_NOT_AVAILABLE: "GIT_NOT_AVAILABLE";
  NON_INTERACTIVE: "NON_INTERACTIVE";
  PLUGIN_AMBIGUOUS: "PLUGIN_AMBIGUOUS";
  PLUGIN_NOT_FOUND: "PLUGIN_NOT_FOUND";
  PLUGIN_NOT_INSTALLED: "PLUGIN_NOT_INSTALLED";
  PNPM_NOT_AVAILABLE: "PNPM_NOT_AVAILABLE";
  REPO_FETCH_FAILED: "REPO_FETCH_FAILED";
  SCHEMA_INVALID: "SCHEMA_INVALID";
  VENCORD_NOT_FOUND: "VENCORD_NOT_FOUND";
  VERSION_NOT_FOUND: "VERSION_NOT_FOUND";
};
```

Defined in: venpm/src/core/errors.ts:9

#### Type Declaration

##### BUILD\_FAILED

```ts
readonly BUILD_FAILED: "BUILD_FAILED" = "BUILD_FAILED";
```

##### CIRCULAR\_DEPENDENCY

```ts
readonly CIRCULAR_DEPENDENCY: "CIRCULAR_DEPENDENCY" = "CIRCULAR_DEPENDENCY";
```

##### DISCORD\_NOT\_FOUND

```ts
readonly DISCORD_NOT_FOUND: "DISCORD_NOT_FOUND" = "DISCORD_NOT_FOUND";
```

##### GIT\_NOT\_AVAILABLE

```ts
readonly GIT_NOT_AVAILABLE: "GIT_NOT_AVAILABLE" = "GIT_NOT_AVAILABLE";
```

##### NON\_INTERACTIVE

```ts
readonly NON_INTERACTIVE: "NON_INTERACTIVE" = "NON_INTERACTIVE";
```

##### PLUGIN\_AMBIGUOUS

```ts
readonly PLUGIN_AMBIGUOUS: "PLUGIN_AMBIGUOUS" = "PLUGIN_AMBIGUOUS";
```

##### PLUGIN\_NOT\_FOUND

```ts
readonly PLUGIN_NOT_FOUND: "PLUGIN_NOT_FOUND" = "PLUGIN_NOT_FOUND";
```

##### PLUGIN\_NOT\_INSTALLED

```ts
readonly PLUGIN_NOT_INSTALLED: "PLUGIN_NOT_INSTALLED" = "PLUGIN_NOT_INSTALLED";
```

##### PNPM\_NOT\_AVAILABLE

```ts
readonly PNPM_NOT_AVAILABLE: "PNPM_NOT_AVAILABLE" = "PNPM_NOT_AVAILABLE";
```

##### REPO\_FETCH\_FAILED

```ts
readonly REPO_FETCH_FAILED: "REPO_FETCH_FAILED" = "REPO_FETCH_FAILED";
```

##### SCHEMA\_INVALID

```ts
readonly SCHEMA_INVALID: "SCHEMA_INVALID" = "SCHEMA_INVALID";
```

##### VENCORD\_NOT\_FOUND

```ts
readonly VENCORD_NOT_FOUND: "VENCORD_NOT_FOUND" = "VENCORD_NOT_FOUND";
```

##### VERSION\_NOT\_FOUND

```ts
readonly VERSION_NOT_FOUND: "VERSION_NOT_FOUND" = "VERSION_NOT_FOUND";
```

***

### ExitCode

```ts
const ExitCode: {
  COMMAND_ERROR: 1;
  ENV_ERROR: 3;
  SUCCESS: 0;
  USAGE_ERROR: 2;
};
```

Defined in: venpm/src/core/errors.ts:43

#### Type Declaration

##### COMMAND\_ERROR

```ts
readonly COMMAND_ERROR: 1 = 1;
```

##### ENV\_ERROR

```ts
readonly ENV_ERROR: 3 = 3;
```

##### SUCCESS

```ts
readonly SUCCESS: 0 = 0;
```

##### USAGE\_ERROR

```ts
readonly USAGE_ERROR: 2 = 2;
```

## Functions

### exitCodeForError()

```ts
function exitCodeForError(code): number;
```

Defined in: venpm/src/core/errors.ts:50

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `code` | [`ErrorCodeValue`](#errorcodevalue) |

#### Returns

`number`

***

### makeError()

```ts
function makeError(
   code, 
   message, 
   options?): ErrorInfo;
```

Defined in: venpm/src/core/errors.ts:63

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `code` | [`ErrorCodeValue`](#errorcodevalue) |
| `message` | `string` |
| `options?` | \{ `candidates?`: `string`[]; `docsUrl?`: `string`; `suggestion?`: `string`; \} |
| `options.candidates?` | `string`[] |
| `options.docsUrl?` | `string` |
| `options.suggestion?` | `string` |

#### Returns

[`ErrorInfo`](#errorinfo)
