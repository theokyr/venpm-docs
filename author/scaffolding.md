# Scaffolding

The `venpm create` command scaffolds plugin repos and individual plugins with the right structure for venpm publishing.

## Create a Plugin Repo

```bash
venpm create ~/src/my-plugins
```

This creates:

```
my-plugins/
  plugins.json                   # Empty venpm plugin index
  plugins/                       # Directory for your plugins
  README.md                      # Basic readme
  .github/
    workflows/
      validate.yml               # CI: validate plugins.json on push
```

The `plugins.json` starts with the schema reference and your repo name (derived from the directory name):

```json
{
  "$schema": "https://venpm.dev/schemas/v1/plugins.json",
  "name": "my-plugins",
  "description": "",
  "plugins": {}
}
```

## Create a Plugin

Inside an existing repo (one that has a `plugins.json` ancestor), `create` scaffolds a plugin instead:

```bash
venpm create plugins/myPlugin             # plain TypeScript
venpm create plugins/myPlugin --tsx       # React support (.tsx entry)
venpm create plugins/myPlugin --css       # include style.css
venpm create plugins/myPlugin --native    # include native.ts (Node.js)
```

Flags can be combined:

```bash
venpm create plugins/myPlugin --tsx --css --native
```

### Generated Files

**Plain TypeScript** (`venpm create plugins/myPlugin`):

```
plugins/myPlugin/
  index.ts
```

```typescript
import definePlugin from "@utils/types";

export default definePlugin({
    name: "MyPlugin",
    description: "",
    authors: [{ name: "YourName", id: 0n }],

    start() {},
    stop() {},
});
```

**With React** (`--tsx`): Creates `index.tsx` instead of `index.ts`.

**With styles** (`--css`): Adds `style.css` and an import in the entry file.

**With native** (`--native`): Adds `native.ts` for Node.js code (filesystem, child process, etc.) that runs in Electron's main process.

## How venpm Detects Mode

`venpm create <path>` walks up the directory tree from `<path>` looking for a `plugins.json` with the venpm schema (`$schema` containing `venpm`). If found, it scaffolds a plugin. If not found, it scaffolds a repo.

This means you can create plugins from anywhere inside the repo:

```bash
cd ~/src/my-plugins
venpm create plugins/newPlugin          # works — finds plugins.json in parent
```

## After Scaffolding

1. Edit the generated `index.ts` / `index.tsx` with your plugin logic
2. Add an entry to `plugins.json` (see [Plugin Index Format](/author/plugin-index))
3. Install locally for development: `venpm install myPlugin --local plugins/myPlugin --no-build`
4. Build and test: `venpm rebuild`
5. Validate: `venpm validate plugins.json`
