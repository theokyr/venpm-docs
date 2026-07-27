# core/types

## Interfaces

### Config

Defined in: venpm/src/core/types.ts:61

#### Properties

##### discord

```ts
discord: {
  binary: string | null;
  restart: RestartMode;
};
```

Defined in: venpm/src/core/types.ts:68

###### binary

```ts
binary: string | null;
```

Path to the Discord binary, or null to auto-detect

###### restart

```ts
restart: RestartMode;
```

##### rebuild

```ts
rebuild: RebuildMode;
```

Defined in: venpm/src/core/types.ts:67

##### repos

```ts
repos: RepoEntry[];
```

Defined in: venpm/src/core/types.ts:62

##### vencord

```ts
vencord: {
  path: string | null;
};
```

Defined in: venpm/src/core/types.ts:63

###### path

```ts
path: string | null;
```

Absolute path to the Vencord source checkout, or null if not yet configured

***

### CreateOptions

Defined in: venpm/src/core/types.ts:216

#### Extends

- [`GlobalOptions`](#globaloptions)

#### Properties

##### config?

```ts
optional config?: string;
```

Defined in: venpm/src/core/types.ts:198

###### Inherited from

[`GlobalOptions`](#globaloptions).[`config`](#config-2)

##### force?

```ts
optional force?: boolean;
```

Defined in: venpm/src/core/types.ts:218

##### json?

```ts
optional json?: boolean;
```

Defined in: venpm/src/core/types.ts:202

###### Inherited from

[`GlobalOptions`](#globaloptions).[`json`](#json-1)

##### jsonStream?

```ts
optional jsonStream?: boolean;
```

Defined in: venpm/src/core/types.ts:203

###### Inherited from

[`GlobalOptions`](#globaloptions).[`jsonStream`](#jsonstream-1)

##### output?

```ts
optional output?: string;
```

Defined in: venpm/src/core/types.ts:217

##### quiet?

```ts
optional quiet?: boolean;
```

Defined in: venpm/src/core/types.ts:200

###### Inherited from

[`GlobalOptions`](#globaloptions).[`quiet`](#quiet-1)

##### verbose?

```ts
optional verbose?: boolean;
```

Defined in: venpm/src/core/types.ts:199

###### Inherited from

[`GlobalOptions`](#globaloptions).[`verbose`](#verbose-1)

##### yes?

```ts
optional yes?: boolean;
```

Defined in: venpm/src/core/types.ts:201

###### Inherited from

[`GlobalOptions`](#globaloptions).[`yes`](#yes-1)

***

### FileSystem

Defined in: venpm/src/core/types.ts:119

#### Methods

##### copyDir()

```ts
copyDir(src, dest): Promise<void>;
```

Defined in: venpm/src/core/types.ts:130

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `src` | `string` |
| `dest` | `string` |

###### Returns

`Promise`\<`void`\>

##### exists()

```ts
exists(path): Promise<boolean>;
```

Defined in: venpm/src/core/types.ts:122

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

###### Returns

`Promise`\<`boolean`\>

##### lstat()

```ts
lstat(path): Promise<{
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
}>;
```

Defined in: venpm/src/core/types.ts:129

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

###### Returns

`Promise`\<\{
  `isDirectory`: `boolean`;
  `isFile`: `boolean`;
  `isSymbolicLink`: `boolean`;
\}\>

##### mkdir()

```ts
mkdir(path, options?): Promise<void>;
```

Defined in: venpm/src/core/types.ts:123

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |
| `options?` | \{ `recursive?`: `boolean`; \} |
| `options.recursive?` | `boolean` |

###### Returns

`Promise`\<`void`\>

##### readdir()

```ts
readdir(path): Promise<string[]>;
```

Defined in: venpm/src/core/types.ts:127

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

###### Returns

`Promise`\<`string`[]\>

##### readFile()

```ts
readFile(path, encoding): Promise<string>;
```

Defined in: venpm/src/core/types.ts:120

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |
| `encoding` | `BufferEncoding` |

###### Returns

`Promise`\<`string`\>

##### readlink()

```ts
readlink(path): Promise<string>;
```

Defined in: venpm/src/core/types.ts:126

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

###### Returns

`Promise`\<`string`\>

##### rename()

```ts
rename(src, dest): Promise<void>;
```

Defined in: venpm/src/core/types.ts:131

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `src` | `string` |
| `dest` | `string` |

###### Returns

`Promise`\<`void`\>

##### rm()

```ts
rm(path, options?): Promise<void>;
```

Defined in: venpm/src/core/types.ts:124

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |
| `options?` | \{ `force?`: `boolean`; `recursive?`: `boolean`; \} |
| `options.force?` | `boolean` |
| `options.recursive?` | `boolean` |

###### Returns

`Promise`\<`void`\>

##### stat()

```ts
stat(path): Promise<{
  size: number;
  isDirectory: boolean;
  isFile: boolean;
}>;
```

Defined in: venpm/src/core/types.ts:128

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

###### Returns

`Promise`\<\{
  `size`: `number`;
  `isDirectory`: `boolean`;
  `isFile`: `boolean`;
\}\>

##### symlink()

```ts
symlink(target, path): Promise<void>;
```

Defined in: venpm/src/core/types.ts:125

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` |
| `path` | `string` |

###### Returns

`Promise`\<`void`\>

##### writeFile()

```ts
writeFile(
   path, 
   data, 
encoding?): Promise<void>;
```

Defined in: venpm/src/core/types.ts:121

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |
| `data` | `string` |
| `encoding?` | `BufferEncoding` |

###### Returns

`Promise`\<`void`\>

***

### GitClient

Defined in: venpm/src/core/types.ts:149

#### Methods

##### available()

```ts
available(): Promise<boolean>;
```

Defined in: venpm/src/core/types.ts:150

###### Returns

`Promise`\<`boolean`\>

##### checkout()

```ts
checkout(repoPath, ref): Promise<void>;
```

Defined in: venpm/src/core/types.ts:154

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `repoPath` | `string` |
| `ref` | `string` |

###### Returns

`Promise`\<`void`\>

##### clone()

```ts
clone(
   url, 
   dest, 
options?): Promise<void>;
```

Defined in: venpm/src/core/types.ts:151

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `dest` | `string` |
| `options?` | \{ `branch?`: `string`; `depth?`: `number`; `sparse?`: `string`[]; \} |
| `options.branch?` | `string` |
| `options.depth?` | `number` |
| `options.sparse?` | `string`[] |

###### Returns

`Promise`\<`void`\>

##### pull()

```ts
pull(repoPath): Promise<void>;
```

Defined in: venpm/src/core/types.ts:152

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `repoPath` | `string` |

###### Returns

`Promise`\<`void`\>

##### revParse()

```ts
revParse(repoPath, ref): Promise<string>;
```

Defined in: venpm/src/core/types.ts:153

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `repoPath` | `string` |
| `ref` | `string` |

###### Returns

`Promise`\<`string`\>

***

### GlobalOptions

Defined in: venpm/src/core/types.ts:197

#### Extended by

- [`InstallOptions`](#installoptions)
- [`CreateOptions`](#createoptions)
- [`ValidateOptions`](#validateoptions)
- [`CreateOptions`](../cli/create.md#createoptions)

#### Properties

##### config?

```ts
optional config?: string;
```

Defined in: venpm/src/core/types.ts:198

##### json?

```ts
optional json?: boolean;
```

Defined in: venpm/src/core/types.ts:202

##### jsonStream?

```ts
optional jsonStream?: boolean;
```

Defined in: venpm/src/core/types.ts:203

##### quiet?

```ts
optional quiet?: boolean;
```

Defined in: venpm/src/core/types.ts:200

##### verbose?

```ts
optional verbose?: boolean;
```

Defined in: venpm/src/core/types.ts:199

##### yes?

```ts
optional yes?: boolean;
```

Defined in: venpm/src/core/types.ts:201

***

### HttpClient

Defined in: venpm/src/core/types.ts:138

#### Methods

##### fetch()

```ts
fetch(url, options?): Promise<{
  headers?: HttpResponseHeaders;
  ok: boolean;
  status: number;
  arrayBuffer: Promise<ArrayBuffer>;
  json: Promise<unknown>;
  text: Promise<string>;
}>;
```

Defined in: venpm/src/core/types.ts:139

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `options?` | \{ `headers?`: `Record`\<`string`, `string`\>; \} |
| `options.headers?` | `Record`\<`string`, `string`\> |

###### Returns

`Promise`\<\{
  `headers?`: [`HttpResponseHeaders`](#httpresponseheaders);
  `ok`: `boolean`;
  `status`: `number`;
  `arrayBuffer`: `Promise`\<`ArrayBuffer`\>;
  `json`: `Promise`\<`unknown`\>;
  `text`: `Promise`\<`string`\>;
\}\>

***

### HttpResponseHeaders

Defined in: venpm/src/core/types.ts:134

#### Methods

##### get()

```ts
get(name): string | null;
```

Defined in: venpm/src/core/types.ts:135

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |

###### Returns

`string` \| `null`

***

### InstalledPlugin

Defined in: venpm/src/core/types.ts:79

#### Properties

##### git\_ref?

```ts
optional git_ref?: string;
```

Defined in: venpm/src/core/types.ts:85

Git commit hash (when method === "git")

##### installed\_at

```ts
installed_at: string;
```

Defined in: venpm/src/core/types.ts:86

##### method

```ts
method: FetchMethod;
```

Defined in: venpm/src/core/types.ts:82

##### path?

```ts
optional path?: string;
```

Defined in: venpm/src/core/types.ts:88

Override path relative to userplugins dir

##### pinned

```ts
pinned: boolean;
```

Defined in: venpm/src/core/types.ts:83

##### repo

```ts
repo: string;
```

Defined in: venpm/src/core/types.ts:81

##### version

```ts
version: string;
```

Defined in: venpm/src/core/types.ts:80

***

### InstallOptions

Defined in: venpm/src/core/types.ts:206

#### Extends

- [`GlobalOptions`](#globaloptions)

#### Properties

##### config?

```ts
optional config?: string;
```

Defined in: venpm/src/core/types.ts:198

###### Inherited from

[`GlobalOptions`](#globaloptions).[`config`](#config-2)

##### from?

```ts
optional from?: string;
```

Defined in: venpm/src/core/types.ts:208

##### git?

```ts
optional git?: boolean;
```

Defined in: venpm/src/core/types.ts:210

##### json?

```ts
optional json?: boolean;
```

Defined in: venpm/src/core/types.ts:202

###### Inherited from

[`GlobalOptions`](#globaloptions).[`json`](#json-1)

##### jsonStream?

```ts
optional jsonStream?: boolean;
```

Defined in: venpm/src/core/types.ts:203

###### Inherited from

[`GlobalOptions`](#globaloptions).[`jsonStream`](#jsonstream-1)

##### local?

```ts
optional local?: string;
```

Defined in: venpm/src/core/types.ts:209

##### noBuild?

```ts
optional noBuild?: boolean;
```

Defined in: venpm/src/core/types.ts:212

##### quiet?

```ts
optional quiet?: boolean;
```

Defined in: venpm/src/core/types.ts:200

###### Inherited from

[`GlobalOptions`](#globaloptions).[`quiet`](#quiet-1)

##### rebuild?

```ts
optional rebuild?: boolean;
```

Defined in: venpm/src/core/types.ts:213

##### tarball?

```ts
optional tarball?: boolean;
```

Defined in: venpm/src/core/types.ts:211

##### verbose?

```ts
optional verbose?: boolean;
```

Defined in: venpm/src/core/types.ts:199

###### Inherited from

[`GlobalOptions`](#globaloptions).[`verbose`](#verbose-1)

##### version?

```ts
optional version?: string;
```

Defined in: venpm/src/core/types.ts:207

##### yes?

```ts
optional yes?: boolean;
```

Defined in: venpm/src/core/types.ts:201

###### Inherited from

[`GlobalOptions`](#globaloptions).[`yes`](#yes-1)

***

### InstallPlan

Defined in: venpm/src/core/types.ts:111

#### Properties

##### entries

```ts
entries: InstallPlanEntry[];
```

Defined in: venpm/src/core/types.ts:112

##### missingOptional?

```ts
optional missingOptional?: string[];
```

Defined in: venpm/src/core/types.ts:114

Optional deps that aren't installed — surfaced as warnings

***

### InstallPlanEntry

Defined in: venpm/src/core/types.ts:97

#### Properties

##### currentVersion?

```ts
optional currentVersion?: string;
```

Defined in: venpm/src/core/types.ts:106

Current installed version, if upgrading

##### isDependency

```ts
isDependency: boolean;
```

Defined in: venpm/src/core/types.ts:104

True if this entry was added to satisfy a dependency

##### method

```ts
method: FetchMethod;
```

Defined in: venpm/src/core/types.ts:102

##### name

```ts
name: string;
```

Defined in: venpm/src/core/types.ts:98

##### repo

```ts
repo: string;
```

Defined in: venpm/src/core/types.ts:100

##### source

```ts
source: PluginSource;
```

Defined in: venpm/src/core/types.ts:101

##### version

```ts
version: string;
```

Defined in: venpm/src/core/types.ts:99

##### versionEntry?

```ts
optional versionEntry?: VersionEntry;
```

Defined in: venpm/src/core/types.ts:108

Version metadata from the index (git_tag, tarball URL)

***

### IOContext

Defined in: venpm/src/core/types.ts:186

#### Properties

##### fs

```ts
fs: FileSystem;
```

Defined in: venpm/src/core/types.ts:187

##### git

```ts
git: GitClient;
```

Defined in: venpm/src/core/types.ts:189

##### http

```ts
http: HttpClient;
```

Defined in: venpm/src/core/types.ts:188

##### prompter

```ts
prompter: Prompter;
```

Defined in: venpm/src/core/types.ts:191

##### renderer

```ts
renderer: Renderer;
```

Defined in: venpm/src/core/types.ts:192

##### shell

```ts
shell: ShellRunner;
```

Defined in: venpm/src/core/types.ts:190

***

### LockfileData

Defined in: venpm/src/core/types.ts:91

#### Properties

##### installed

```ts
installed: Record<string, InstalledPlugin>;
```

Defined in: venpm/src/core/types.ts:92

***

### PluginAuthor

Defined in: venpm/src/core/types.ts:3

#### Properties

##### id

```ts
id: string;
```

Defined in: venpm/src/core/types.ts:5

##### name

```ts
name: string;
```

Defined in: venpm/src/core/types.ts:4

***

### PluginEntry

Defined in: venpm/src/core/types.ts:25

#### Properties

##### authors

```ts
authors: PluginAuthor[];
```

Defined in: venpm/src/core/types.ts:28

##### dependencies?

```ts
optional dependencies?: string[];
```

Defined in: venpm/src/core/types.ts:30

##### description

```ts
description: string;
```

Defined in: venpm/src/core/types.ts:27

##### discord?

```ts
optional discord?: string;
```

Defined in: venpm/src/core/types.ts:33

Semver range for required Discord build

##### license?

```ts
optional license?: string;
```

Defined in: venpm/src/core/types.ts:29

##### optionalDependencies?

```ts
optional optionalDependencies?: string[];
```

Defined in: venpm/src/core/types.ts:31

##### source

```ts
source: PluginSource;
```

Defined in: venpm/src/core/types.ts:36

##### vencord?

```ts
optional vencord?: string;
```

Defined in: venpm/src/core/types.ts:35

Semver range for required Vencord version

##### version

```ts
version: string;
```

Defined in: venpm/src/core/types.ts:26

##### versions?

```ts
optional versions?: Record<string, VersionEntry>;
```

Defined in: venpm/src/core/types.ts:38

Named version history (version string → VersionEntry)

***

### PluginIndex

Defined in: venpm/src/core/types.ts:41

#### Properties

##### description?

```ts
optional description?: string;
```

Defined in: venpm/src/core/types.ts:43

##### name

```ts
name: string;
```

Defined in: venpm/src/core/types.ts:42

##### plugins

```ts
plugins: Record<string, PluginEntry>;
```

Defined in: venpm/src/core/types.ts:45

Plugin name → PluginEntry

***

### PluginSource

Defined in: venpm/src/core/types.ts:9

Source location for a plugin — at least one of git/tarball must be present.

#### Properties

##### git?

```ts
optional git?: string;
```

Defined in: venpm/src/core/types.ts:11

Git repository URL

##### local?

```ts
optional local?: string;
```

Defined in: venpm/src/core/types.ts:17

Local filesystem path (for development / local repos)

##### path?

```ts
optional path?: string;
```

Defined in: venpm/src/core/types.ts:13

Path within the git repo to the plugin folder

##### tarball?

```ts
optional tarball?: string;
```

Defined in: venpm/src/core/types.ts:15

Direct tarball download URL

***

### Prompter

Defined in: venpm/src/core/types.ts:180

#### Methods

##### confirm()

```ts
confirm(message, defaultValue?): Promise<boolean>;
```

Defined in: venpm/src/core/types.ts:181

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `defaultValue?` | `boolean` |

###### Returns

`Promise`\<`boolean`\>

##### input()

```ts
input(message, defaultValue?): Promise<string>;
```

Defined in: venpm/src/core/types.ts:182

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `defaultValue?` | `string` |

###### Returns

`Promise`\<`string`\>

##### select()

```ts
select<T>(message, choices): Promise<T>;
```

Defined in: venpm/src/core/types.ts:183

###### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `string` |

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `choices` | \{ `label`: `string`; `value`: `T`; \}[] |

###### Returns

`Promise`\<`T`\>

***

### Renderer

Defined in: venpm/src/core/types.ts:230

#### Methods

##### dim()

```ts
dim(message): void;
```

Defined in: venpm/src/core/types.ts:237

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |

###### Returns

`void`

##### error()

```ts
error(info): void;
```

Defined in: venpm/src/core/types.ts:235

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `info` | [`ErrorInfo`](errors.md#errorinfo) |

###### Returns

`void`

##### finish()

```ts
finish(
   success, 
   data?, 
   warnings?): void;
```

Defined in: venpm/src/core/types.ts:248

Called when the command is done — renderers that buffer (JsonRenderer) flush here.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `success` | `boolean` |
| `data?` | `unknown` |
| `warnings?` | `string`[] |

###### Returns

`void`

##### heading()

```ts
heading(message): void;
```

Defined in: venpm/src/core/types.ts:232

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |

###### Returns

`void`

##### keyValue()

```ts
keyValue(pairs): void;
```

Defined in: venpm/src/core/types.ts:240

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `pairs` | \[`string`, `string`\][] |

###### Returns

`void`

##### list()

```ts
list(items): void;
```

Defined in: venpm/src/core/types.ts:241

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `items` | `string`[] |

###### Returns

`void`

##### progress()

```ts
progress(id, message): ProgressHandle;
```

Defined in: venpm/src/core/types.ts:243

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |
| `message` | `string` |

###### Returns

[`ProgressHandle`](progress.md#progresshandle)

##### success()

```ts
success(message): void;
```

Defined in: venpm/src/core/types.ts:233

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |

###### Returns

`void`

##### table()

```ts
table(headers, rows): void;
```

Defined in: venpm/src/core/types.ts:239

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `headers` | `string`[] |
| `rows` | `string`[][] |

###### Returns

`void`

##### text()

```ts
text(message): void;
```

Defined in: venpm/src/core/types.ts:231

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |

###### Returns

`void`

##### verbose()

```ts
verbose(message): void;
```

Defined in: venpm/src/core/types.ts:236

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |

###### Returns

`void`

##### warn()

```ts
warn(message): void;
```

Defined in: venpm/src/core/types.ts:234

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |

###### Returns

`void`

##### write()

```ts
write(data): void;
```

Defined in: venpm/src/core/types.ts:245

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `string` |

###### Returns

`void`

***

### RepoEntry

Defined in: venpm/src/core/types.ts:56

#### Properties

##### name

```ts
name: string;
```

Defined in: venpm/src/core/types.ts:57

##### url

```ts
url: string;
```

Defined in: venpm/src/core/types.ts:58

***

### ShellRunner

Defined in: venpm/src/core/types.ts:171

#### Methods

##### exec()

```ts
exec(
   cmd, 
   args, 
   options?): Promise<{
  exitCode: number;
  stderr: string;
  stdout: string;
}>;
```

Defined in: venpm/src/core/types.ts:172

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `cmd` | `string` |
| `args` | `string`[] |
| `options?` | \{ `cwd?`: `string`; `env?`: `Record`\<`string`, `string`\>; \} |
| `options.cwd?` | `string` |
| `options.env?` | `Record`\<`string`, `string`\> |

###### Returns

`Promise`\<\{
  `exitCode`: `number`;
  `stderr`: `string`;
  `stdout`: `string`;
\}\>

##### spawn()

```ts
spawn(
   cmd, 
   args, 
options?): Promise<void>;
```

Defined in: venpm/src/core/types.ts:177

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `cmd` | `string` |
| `args` | `string`[] |
| `options?` | [`SpawnOptions`](#spawnoptions) |

###### Returns

`Promise`\<`void`\>

***

### SpawnOptions

Defined in: venpm/src/core/types.ts:157

#### Properties

##### cwd?

```ts
optional cwd?: string;
```

Defined in: venpm/src/core/types.ts:158

##### detached?

```ts
optional detached?: boolean;
```

Defined in: venpm/src/core/types.ts:159

##### env?

```ts
optional env?: Record<string, string>;
```

Defined in: venpm/src/core/types.ts:160

##### logFile?

```ts
optional logFile?: string;
```

Defined in: venpm/src/core/types.ts:168

Append the child's stdout/stderr here instead of discarding them.

##### unsetEnv?

```ts
optional unsetEnv?: string[];
```

Defined in: venpm/src/core/types.ts:166

Environment variables to remove from the child's environment.
Needed because an *empty* DISPLAY is not the same as an unset one:
Electron treats `DISPLAY=""` as "use X11" and exits immediately.

***

### ValidateOptions

Defined in: venpm/src/core/types.ts:221

#### Extends

- [`GlobalOptions`](#globaloptions)

#### Properties

##### config?

```ts
optional config?: string;
```

Defined in: venpm/src/core/types.ts:198

###### Inherited from

[`GlobalOptions`](#globaloptions).[`config`](#config-2)

##### json?

```ts
optional json?: boolean;
```

Defined in: venpm/src/core/types.ts:202

###### Inherited from

[`GlobalOptions`](#globaloptions).[`json`](#json-1)

##### jsonStream?

```ts
optional jsonStream?: boolean;
```

Defined in: venpm/src/core/types.ts:203

###### Inherited from

[`GlobalOptions`](#globaloptions).[`jsonStream`](#jsonstream-1)

##### quiet?

```ts
optional quiet?: boolean;
```

Defined in: venpm/src/core/types.ts:200

###### Inherited from

[`GlobalOptions`](#globaloptions).[`quiet`](#quiet-1)

##### strict?

```ts
optional strict?: boolean;
```

Defined in: venpm/src/core/types.ts:222

##### verbose?

```ts
optional verbose?: boolean;
```

Defined in: venpm/src/core/types.ts:199

###### Inherited from

[`GlobalOptions`](#globaloptions).[`verbose`](#verbose-1)

##### yes?

```ts
optional yes?: boolean;
```

Defined in: venpm/src/core/types.ts:201

###### Inherited from

[`GlobalOptions`](#globaloptions).[`yes`](#yes-1)

***

### VersionEntry

Defined in: venpm/src/core/types.ts:20

#### Properties

##### git\_tag?

```ts
optional git_tag?: string;
```

Defined in: venpm/src/core/types.ts:21

##### tarball?

```ts
optional tarball?: string;
```

Defined in: venpm/src/core/types.ts:22

## Type Aliases

### FetchMethod

```ts
type FetchMethod = "git" | "tarball" | "local";
```

Defined in: venpm/src/core/types.ts:77

***

### RebuildMode

```ts
type RebuildMode = "ask" | "always" | "never";
```

Defined in: venpm/src/core/types.ts:51

How venpm handles rebuilding Vencord after install/remove

***

### RestartMode

```ts
type RestartMode = "ask" | "always" | "never";
```

Defined in: venpm/src/core/types.ts:54

How venpm handles restarting Discord

***

### StreamEvent

```ts
type StreamEvent = 
  | {
  id: string;
  message: string;
  type: "progress";
}
  | {
  id: string;
  message: string;
  status: "done" | "fail";
  type: "progress";
}
  | {
  code?: string;
  message: string;
  type: "warning";
}
  | {
  message: string;
  type: "log";
}
  | {
  data: unknown;
  success: true;
  type: "result";
  warnings?: string[];
}
  | {
  error: ErrorInfo;
  success: false;
  type: "error";
};
```

Defined in: venpm/src/core/types.ts:253

## References

### ErrorInfo

Re-exports [ErrorInfo](errors.md#errorinfo)

***

### ProgressHandle

Re-exports [ProgressHandle](progress.md#progresshandle)
