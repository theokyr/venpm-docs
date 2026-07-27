# core/launch

## Interfaces

### LaunchOptions

Defined in: venpm/src/core/launch.ts:165

#### Properties

##### env?

```ts
optional env?: Record<string, string | undefined>;
```

Defined in: venpm/src/core/launch.ts:167

##### logFile?

```ts
optional logFile?: string;
```

Defined in: venpm/src/core/launch.ts:173

Where the child's output is appended, for diagnosing a failed start.

##### platform?

```ts
optional platform?: Platform;
```

Defined in: venpm/src/core/launch.ts:166

##### settleMs?

```ts
optional settleMs?: number;
```

Defined in: venpm/src/core/launch.ts:171

How long it must then stay alive to count as a real start.

##### startupTimeoutMs?

```ts
optional startupTimeoutMs?: number;
```

Defined in: venpm/src/core/launch.ts:169

How long to wait for the process to appear.

***

### LaunchPlan

Defined in: venpm/src/core/launch.ts:8

#### Properties

##### args

```ts
args: string[];
```

Defined in: venpm/src/core/launch.ts:10

##### command

```ts
command: string;
```

Defined in: venpm/src/core/launch.ts:9

##### env

```ts
env: Record<string, string>;
```

Defined in: venpm/src/core/launch.ts:14

Variables to add, borrowed from the desktop session when ours has no display.

##### note

```ts
note: string | null;
```

Defined in: venpm/src/core/launch.ts:18

Human-readable note about display handling, for verbose output.

##### problem

```ts
problem: string | null;
```

Defined in: venpm/src/core/launch.ts:16

Non-null when the environment cannot start a GUI app at all.

##### unsetEnv

```ts
unsetEnv: string[];
```

Defined in: venpm/src/core/launch.ts:12

Variables to strip from the child environment (see SpawnOptions.unsetEnv).

***

### LaunchVerification

Defined in: venpm/src/core/launch.ts:157

#### Properties

##### pids

```ts
pids: number[];
```

Defined in: venpm/src/core/launch.ts:160

##### skippedReason?

```ts
optional skippedReason?: string;
```

Defined in: venpm/src/core/launch.ts:162

Set when verification could not be performed (never used to mask a failure).

##### verified

```ts
verified: boolean;
```

Defined in: venpm/src/core/launch.ts:159

Discord was observed alive and still alive after the settle window.

## Type Aliases

### Platform

```ts
type Platform = "linux" | "darwin" | "win32";
```

Defined in: venpm/src/core/launch.ts:6

## Variables

### SESSION\_ENV\_KEYS

```ts
const SESSION_ENV_KEYS: readonly ["DISPLAY", "WAYLAND_DISPLAY", "XAUTHORITY", "XDG_RUNTIME_DIR", "XDG_SESSION_TYPE", "DBUS_SESSION_BUS_ADDRESS"];
```

Defined in: venpm/src/core/launch.ts:22

Variables that decide which display server a GUI app talks to.

## Functions

### launchDiscordVerified()

```ts
function launchDiscordVerified(
   fs, 
   shell, 
   binary, 
options?): Promise<LaunchVerification>;
```

Defined in: venpm/src/core/launch.ts:192

Spawn Discord and prove it actually started.

"Started" means: a Discord process appeared within `startupTimeoutMs` **and**
was still alive `settleMs` later. The settle window is what catches the
common failure — Electron exiting seconds after spawn over a bad display,
a missing library, or a corrupt install.

Throws with the tail of the launch log when the process never appears or
dies during the settle window.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fs` | [`FileSystem`](types.md#filesystem) |
| `shell` | [`ShellRunner`](types.md#shellrunner) |
| `binary` | `string` |
| `options` | [`LaunchOptions`](#launchoptions) |

#### Returns

`Promise`\<[`LaunchVerification`](#launchverification)\>

***

### readSessionEnv()

```ts
function readSessionEnv(shell): Promise<Record<string, string>>;
```

Defined in: venpm/src/core/launch.ts:126

Read the desktop session's environment from the systemd user manager.

This is where a graphical session publishes DISPLAY/WAYLAND_DISPLAY (the
desktop calls `systemctl --user import-environment` at login), so it is the
one place a detached shell can learn how to reach the user's screen.
Returns an empty object when systemd is unavailable — e.g. non-systemd
Linux, macOS, or Windows — leaving the caller to report a clear failure.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `shell` | [`ShellRunner`](types.md#shellrunner) |

#### Returns

`Promise`\<`Record`\<`string`, `string`\>\>

***

### resolveLaunchPlan()

```ts
function resolveLaunchPlan(
   platform, 
   env, 
   binary, 
   sessionEnv?): LaunchPlan;
```

Defined in: venpm/src/core/launch.ts:51

Decide how to launch Discord for the current platform and environment.

Pure so it can be unit-tested for every platform without spawning anything.

The Linux branch exists because agents and CI shells frequently inherit a
*broken* display environment rather than none at all — most commonly
`DISPLAY=""`, which Electron reads as "use X11" and then aborts with
"Missing X server or $DISPLAY" about a second after spawn. The old code
spawned regardless and reported success, so the caller believed Discord had
restarted when it had already exited.

The fix is to *borrow the desktop session's own environment* (see
`readSessionEnv`) rather than to guess backend flags. Forcing
`--ozone-platform=wayland` on a session whose Electron apps run under
Xwayland produces a GPU-process crash loop: the window appears, the renderer
dies with SIGSEGV, and Discord hangs on "Starting...". Passing the session's
real DISPLAY/WAYLAND_DISPLAY/XAUTHORITY makes the launch identical to one
started from the desktop, which is the only reliably correct behaviour.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `platform` | [`Platform`](#platform-1) |
| `env` | `Record`\<`string`, `string` \| `undefined`\> |
| `binary` | `string` |
| `sessionEnv?` | `Record`\<`string`, `string`\> |

#### Returns

[`LaunchPlan`](#launchplan)
