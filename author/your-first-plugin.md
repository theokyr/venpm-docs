# Your First Plugin

This walkthrough builds a real Vencord plugin from scratch — **Quick Notes**, a per-channel note-taking popover. By the end, you'll have a working plugin published to a venpm index that anyone can install.

## Prerequisites

Before starting, make sure you have:

- **venpm** installed globally (`npm install -g @kamaras/venpm`)
- **Vencord** source checkout (we'll use `~/src/Vencord`)
- **Discord** running with Vencord injected
- **Node.js 18+** and **pnpm** installed

Run `venpm doctor` to verify everything is set up.

## Step 1: Scaffold a Plugin Repo

Create a new plugin repository:

```bash
venpm create ~/src/my-plugins
```

This creates:

```
my-plugins/
  plugins.json         # venpm plugin index (empty)
  plugins/             # your plugins go here
  README.md
  .github/workflows/   # CI validation
```

Enter the directory:

```bash
cd ~/src/my-plugins
```

## Step 2: Scaffold the Plugin

```bash
venpm create plugins/quickNotes --tsx --css
```

The `--tsx` flag creates an `.tsx` entry point (for React UI) and `--css` adds a `style.css`. You now have:

```
plugins/quickNotes/
  index.tsx            # Plugin entry point
  style.css            # Plugin styles
```

## Step 3: The Basics

Open `plugins/quickNotes/index.tsx`. The scaffold gives you a minimal plugin. Replace its contents with:

```tsx
import definePlugin from "@utils/types";

export default definePlugin({
    name: "QuickNotes",
    description: "Per-channel note-taking popover",
    authors: [{ name: "YourName", id: 0n }],

    start() {
        console.log("QuickNotes started!");
    },

    stop() {
        console.log("QuickNotes stopped!");
    },
});
```

::: tip Author ID
Replace `0n` with your Discord user ID as a BigInt literal (e.g., `123456789012345678n`). You can find your ID by enabling Developer Mode in Discord settings, then right-clicking your profile.
:::

### Install and Test

Register the plugin locally:

```bash
venpm install quickNotes --local plugins/quickNotes --no-build
```

Build and deploy:

```bash
venpm rebuild
```

After Discord restarts, open Vencord settings. You should see **QuickNotes** in the plugin list. Enable it and check the DevTools console (Ctrl+Shift+I) — you should see "QuickNotes started!".

## Step 4: Settings

Add user-configurable settings. Update `index.tsx`:

```tsx
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";

const settings = definePluginSettings({
    defaultText: {
        type: OptionType.STRING,
        description: "Default text for new notes",
        default: "",
    },
    showTimestamp: {
        type: OptionType.BOOLEAN,
        description: "Show last-edited timestamp on notes",
        default: true,
    },
});

export default definePlugin({
    name: "QuickNotes",
    description: "Per-channel note-taking popover",
    authors: [{ name: "YourName", id: 0n }],
    settings,

    start() {},
    stop() {},
});
```

Rebuild with `venpm rebuild`. In Vencord settings, click the gear icon next to QuickNotes — you'll see your two settings.

## Step 5: React UI

Now build the note-taking popover. Add a `NotesPopover` component to `index.tsx`:

```tsx
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { React, useState, useEffect } from "@webpack/common";

const settings = definePluginSettings({
    defaultText: {
        type: OptionType.STRING,
        description: "Default text for new notes",
        default: "",
    },
    showTimestamp: {
        type: OptionType.BOOLEAN,
        description: "Show last-edited timestamp on notes",
        default: true,
    },
});

// Store notes per channel in localStorage
function getNote(channelId: string): string {
    return localStorage.getItem(`quickNotes-${channelId}`) ?? settings.store.defaultText;
}

function setNote(channelId: string, text: string) {
    localStorage.setItem(`quickNotes-${channelId}`, text);
    localStorage.setItem(`quickNotes-${channelId}-ts`, new Date().toISOString());
}

function getNoteTimestamp(channelId: string): string | null {
    return localStorage.getItem(`quickNotes-${channelId}-ts`);
}

function NotesPopover({ channelId }: { channelId: string; }) {
    const [text, setText] = useState(() => getNote(channelId));
    const [timestamp, setTimestamp] = useState(() => getNoteTimestamp(channelId));

    useEffect(() => {
        const timer = setTimeout(() => {
            setNote(channelId, text);
            setTimestamp(new Date().toISOString());
        }, 500); // auto-save after 500ms of inactivity
        return () => clearTimeout(timer);
    }, [text, channelId]);

    return (
        <div className="vc-quickNotes-popover">
            <textarea
                className="vc-quickNotes-textarea"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Write a note for this channel..."
                rows={6}
            />
            {settings.store.showTimestamp && timestamp && (
                <div className="vc-quickNotes-timestamp">
                    Last edited: {new Date(timestamp).toLocaleString()}
                </div>
            )}
        </div>
    );
}

export default definePlugin({
    name: "QuickNotes",
    description: "Per-channel note-taking popover",
    authors: [{ name: "YourName", id: 0n }],
    settings,

    start() {},
    stop() {},
});
```

The component isn't injected into Discord yet — that comes in the next step with patches.

## Step 6: Patches

Patches let you modify Discord's bundled code before it loads. We'll inject a "Notes" button into the channel header toolbar.

::: warning Patches are fragile
Discord's internal module code changes frequently. The `find` string and `match` pattern below target a specific build. If a Discord update changes the module, the patch will silently fail. This is normal — you'll need to update the patch when it breaks.
:::

Add the `patches` array and a button component to your plugin:

```tsx
// Add to imports at the top:
import { findByPropsLazy } from "@webpack";
import { Tooltip } from "@webpack/common";

// Webpack module for channel header classes
const headerClasses = findByPropsLazy("title", "iconWrapper");

// Notes button component for the toolbar
function NotesButton({ channelId }: { channelId: string; }) {
    const [open, setOpen] = useState(false);

    return (
        <Tooltip text="Quick Notes">
            {(tooltipProps: any) => (
                <div style={{ position: "relative" }}>
                    <button
                        {...tooltipProps}
                        className={`vc-quickNotes-button ${headerClasses.iconWrapper}`}
                        onClick={() => setOpen(!open)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                    </button>
                    {open && <NotesPopover channelId={channelId} />}
                </div>
            )}
        </Tooltip>
    );
}
```

Then add the patch to your `definePlugin`:

```tsx
export default definePlugin({
    name: "QuickNotes",
    description: "Per-channel note-taking popover",
    authors: [{ name: "YourName", id: 0n }],
    settings,

    patches: [
        {
            find: ".toolbar,children:",
            replacement: {
                match: /(?<=\.toolbar,children:)(\[)/,
                replace: "$1,$self.NotesButton(arguments[0]),",
            },
        },
    ],

    NotesButton(props: { channel: { id: string; }; }) {
        return <NotesButton channelId={props.channel.id} />;
    },

    start() {},
    stop() {},
});
```

Rebuild with `venpm rebuild`. You should see a notes icon in the channel header toolbar. Click it to open the popover.

## Step 7: Styling

Open `style.css` and add styles using Discord's CSS variables:

```css
.vc-quickNotes-button {
    cursor: pointer;
    background: none;
    border: none;
    color: var(--interactive-normal);
    display: flex;
    align-items: center;
    padding: 4px;
    border-radius: 4px;
}

.vc-quickNotes-button:hover {
    color: var(--interactive-hover);
    background: var(--background-modifier-hover);
}

.vc-quickNotes-popover {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    width: 300px;
    padding: 12px;
    margin-top: 8px;
    background: var(--background-floating, #2b2d31);
    border-radius: 8px;
    box-shadow: var(--elevation-high);
}

.vc-quickNotes-textarea {
    width: 100%;
    min-height: 100px;
    padding: 8px;
    background: var(--input-background, #1e1f22);
    border: none;
    border-radius: 4px;
    color: var(--text-normal);
    font-family: inherit;
    font-size: 14px;
    resize: vertical;
}

.vc-quickNotes-textarea:focus {
    outline: 2px solid var(--brand-500);
}

.vc-quickNotes-textarea::placeholder {
    color: var(--text-muted);
}

.vc-quickNotes-timestamp {
    margin-top: 8px;
    font-size: 12px;
    color: var(--text-muted);
}
```

Import the stylesheet in your plugin by adding to `index.tsx`:

```tsx
import "./style.css";
```

::: tip CSS Variable Fallbacks
Always provide hardcoded fallbacks for CSS variables (e.g., `var(--background-floating, #2b2d31)`). Discord's CSS variables aren't available in every injection context.
:::

Rebuild with `venpm rebuild` to see the styled popover.

## Step 8: Dev Workflow

For faster iteration, use Vencord's watch mode instead of rebuilding each time:

```bash
cd ~/src/Vencord && pnpm build --watch
```

Changes to your plugin source are picked up automatically. You may still need to restart Discord for patch changes.

## Step 9: Publish

### Write the Plugin Index

Open `plugins.json` in your repo root and add your plugin:

```json
{
  "$schema": "https://venpm.dev/schemas/v1/plugins.json",
  "name": "my-plugins",
  "description": "My custom Vencord plugins",
  "plugins": {
    "quickNotes": {
      "version": "0.1.0",
      "description": "Per-channel note-taking popover",
      "authors": [{ "name": "YourName", "id": "123456789012345678" }],
      "license": "MIT",
      "source": {
        "git": "https://github.com/you/my-plugins.git",
        "path": "plugins/quickNotes"
      }
    }
  }
}
```

::: warning Author ID format
In `definePlugin`, the author ID is a BigInt (`0n`). In `plugins.json`, it's a string (`"0"`). These are different formats — the index schema requires strings.
:::

### Validate

```bash
venpm validate plugins.json
```

For thorough checks including dependency cross-references:

```bash
venpm validate plugins.json --strict
```

### Host It

The simplest approach is GitHub Releases. Push your repo to GitHub, and venpm's scaffolded CI workflow (`.github/workflows/`) validates your index on every push and publishes it as a release asset.

Users install from the stable release URL:

```
https://github.com/you/my-plugins/releases/latest/download/plugins.json
```

## Step 10: Install It

Another user can now install your plugin:

```bash
venpm repo add https://github.com/you/my-plugins/releases/latest/download/plugins.json --name your-plugins
venpm install quickNotes
```

That's it — the full cycle from scaffolding to published plugin.

## What's Next

- [Plugin Index Format](/author/plugin-index) — all fields, dependencies, version history
- [Scaffolding](/author/scaffolding) — `venpm create` options in detail
- [CI & Publishing](/author/ci-publishing) — GitHub Actions workflow, validation, release automation
- [CLI Reference](/api/cli) — all 12 commands documented
