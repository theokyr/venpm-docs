# DESIGN.md — venpm

## 1. Visual Theme & Atmosphere

**Mood:** Utilitarian developer tool with crafted edges and occasional boldness. Think Linear's engineering precision crossed with Cursor's warm attention to detail.

**Color Story:** "Carbon Forest Amber" — dark-mode native. Forest-tinted blacks provide organic depth. Amber (#f97316) is the singular brand accent, used for commands, links, CTAs, and the logo. Emerald (#34d399) is reserved strictly for success/positive states. No gradients on interface surfaces.

**Typography Character:** Bold monospace headlines (JetBrains Mono 700-800) command attention with tight tracking. Clean geometric sans (DM Sans) handles body text for comfortable reading. Monospace labels in uppercase amber serve as breadcrumbs and section markers. The split creates two distinct voices: the commanding headline and the quiet reader.

**Overall Aesthetic:** Dark, precise, amber-lit. Not cold — the forest-tinted darks and amber warmth prevent clinical sterility. Not playful — the monospace headlines and utilitarian spacing keep it serious. The emerald arrow in the logo is the one moment of personality.

## 2. Color Palette & Roles

### Primary
| Role | Hex | Usage |
|------|-----|-------|
| Background | `#0b0f0e` | Page background, hero sections |
| Surface | `#141c1a` | Cards, panels, elevated containers, code blocks |
| Border | `#1c2b26` | Dividers, card edges, input borders |
| Elevated Border | `#2a4038` | Brighter border for hover/elevated states |
| Muted Text | `#4a5c56` | Timestamps, placeholders, secondary labels |
| Body Text | `#94a3b8` | Paragraphs, descriptions |
| Heading Text | `#e8e8e8` | Headlines, strong labels |
| Bright Text | `#f0f0f0` | Maximum emphasis, wordmark |

### Accents
| Role | Hex | Usage |
|------|-----|-------|
| Amber (Brand) | `#f97316` | Links, CTAs, brand name, buttons, active states |
| Amber Dim | `#b45309` | Hover states, pressed buttons |
| Amber Soft | `rgba(249,115,22,0.12)` | Soft backgrounds, focus glow |
| Emerald (Success) | `#34d399` | Success messages, install confirmations |
| Emerald Dim | `#059669` | Success hover |
| Red (Error) | `#ef4444` | Error messages, destructive actions |
| Yellow (Warning) | `#fbbf24` | Warnings, deprecation notices |

### Principles
- Amber is the ONLY chromatic brand color. Emerald, red, yellow are semantic only.
- All dark surfaces have a green tint — never pure or cool black.
- No gradients on interface. Amber→emerald gradient only for marketing hero moments.

## 3. Typography Rules

**Font Families:**
- Display/Headlines: `JetBrains Mono` (weight 700-800)
- Body: `DM Sans` (weight 400-500)
- Code: `JetBrains Mono` (weight 400)
- Labels: `JetBrains Mono` (weight 400, uppercase, 2px letter-spacing, amber)

| Level | Font | Size | Weight | Tracking | Line Height | Notes |
|-------|------|------|--------|----------|-------------|-------|
| Hero | JetBrains Mono | 48px | 800 | -2px | 1.05 | Landing page only |
| H1 | JetBrains Mono | 36px | 800 | -1.5px | 1.1 | Page titles |
| H2 | JetBrains Mono | 28px | 700 | -1px | 1.15 | Section heads |
| H3 | JetBrains Mono | 22px | 700 | -0.5px | 1.2 | Subsections |
| H4 | JetBrains Mono | 18px | 700 | 0 | 1.3 | Minor heads |
| Body | DM Sans | 15px | 400 | 0 | 1.75 | Reading text |
| Small | DM Sans | 13px | 400 | 0 | 1.6 | Captions |
| Label | JetBrains Mono | 11px | 400 | 2px | 1.4 | Uppercase, amber |
| Code | JetBrains Mono | 13px | 400 | 0 | 1.6 | In code blocks |

**Responsive:** Hero 48→40→32px, H1 36→30→26px, H2 28→24→22px at desktop→tablet→mobile.

## 4. Component Stylings

### Buttons
**Primary:** `#f97316` bg, `#0b0f0e` text, 6px radius, JetBrains Mono 500 14px, hover `#b45309`
**Secondary:** transparent bg, 1px `#1c2b26` border, `#e8e8e8` text, hover bg `rgba(249,115,22,0.08)`
**Danger:** `#ef4444` bg, white text, hover `#dc2626`

### Cards
`#141c1a` bg, 1px `#1c2b26` border, 8px radius, 24px padding. No shadows — depth via border only.

### Code Blocks
`#141c1a` bg, 1px `#1c2b26` border, 4px radius, JetBrains Mono 400 13px, 12px 16px padding. Terminal output in `#34d399`, code examples in `#e8e8e8`.

### Inputs
`#141c1a` bg, 1px `#1c2b26` border, 4px radius, `#e8e8e8` text, `#4a5c56` placeholder. Focus: `#f97316` border + `0 0 0 2px rgba(249,115,22,0.2)` glow.

## 5. Layout Principles

**Spacing:** 4px base. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.
**Container:** 1200px max, 24px horizontal padding (16px mobile). Docs content 800px max.
**Breakpoints:** Mobile <640px, Tablet 640–1023px, Desktop ≥1024px.

## 6. Depth & Elevation

Border-based depth (like Linear/Supabase). Dark mode makes shadows invisible.

| Level | Treatment |
|-------|-----------|
| Flat | No border |
| Card | 1px solid `#1c2b26` |
| Elevated | 1px solid `#2a4038` |
| Overlay | 1px solid `#2a4038` + `#141c1a` bg |
| Focus | `0 0 0 2px rgba(249,115,22,0.3)` amber glow |

## 7. Do's and Don'ts

**Do:**
- Use amber exclusively for brand/interactive elements
- Keep dark surfaces forest-tinted (green undertone)
- Use JetBrains Mono for all headings and labels
- Use border-based depth, not shadows
- Provide hardcoded fallbacks for CSS variables

**Don't:**
- Use blurple, Discord purple, or Vencord purple
- Apply gradients to UI surfaces
- Use emerald decoratively (it's semantic: success only)
- Mix in cool/pure blacks (#000, #111)
- Add shadows for elevation

## 8. Responsive Behavior

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | <640px | Single column, stacked, 16px padding |
| Tablet | 640–1023px | Two columns where appropriate |
| Desktop | ≥1024px | Full layout, sidebar visible |

Touch targets: 44x44px minimum. Typography scales per the responsive table in Section 3.

## 9. Agent Prompt Guide

**Quick color reference:**
- Background: `#0b0f0e`, Surface: `#141c1a`, Border: `#1c2b26`
- Brand: `#f97316`, Success: `#34d399`, Error: `#ef4444`, Warning: `#fbbf24`
- Heading: `#e8e8e8`, Body: `#94a3b8`, Muted: `#4a5c56`

**Example: venpm card component**
> Build a card showing plugin info. Use `#141c1a` bg, 1px `#1c2b26` border, 8px radius. Plugin name in JetBrains Mono 700 `#e8e8e8`. Description in DM Sans 400 `#94a3b8`. Version badge in JetBrains Mono 400 11px uppercase `#f97316`. Install button: `#f97316` bg, `#0b0f0e` text, 6px radius.

**Example: terminal output**
> Show a venpm install command. Use `#141c1a` bg, 1px `#1c2b26` border, 4px radius. Command prompt `$` in `#4a5c56`. Command text in `#e8e8e8`. Plugin name in `#f97316`. Success output lines with `#34d399` `+` prefix. Timing in `#4a5c56`.

## 10. CLI Terminal Output

The CLI maps the Carbon Forest Amber palette to 24-bit ANSI true color. These colors are used by the `TtyRenderer` when stdout is a TTY and `NO_COLOR` is not set.

### ANSI Color Mapping

| Role | Hex | ANSI Code | CLI Usage |
|------|-----|-----------|-----------|
| Amber (Brand) | `#f97316` | `38;2;249;115;22` | Commands, plugin names, `?` prompt prefix, `⟩` sigil |
| Emerald (Success) | `#34d399` | `38;2;52;211;153` | `✔` success checkmark |
| Red (Error) | `#ef4444` | `38;2;239;68;68` | `✖` error prefix |
| Yellow (Warning) | `#fbbf24` | `38;2;251;191;36` | `⚠` warning prefix |
| Dim (Muted) | `#4a5c56` | `38;2;74;92;86` | Hints, timestamps, secondary labels, error codes |
| Bright (Heading) | `#e8e8e8` | `38;2;232;232;232` | Section headers, emphasis |

### Brand Sigil

The `⟩` (right-pointing angle bracket, U+27E9) is venpm's progress sigil. It appears in:
- Spinner animations during long operations (amber)
- Error suggestions (`⟩ Did you mean: BetterVolume`)
- The three-frame spinner pulse: `⟩`, `⟫`, `⟩`

### Output Patterns

**Install flow:**
```
  ⟩ Fetching indexes...                     (amber ⟩, spinner)
  ✔ 2 repos, 47 plugins                     (emerald ✔)
  ✔ Install plan:
    BetterVolume@1.2.0 via git               (amber name, dim version/method)
    _libAnimationKit@0.3.1 via git (dep)

  ? Proceed? [Y/n]                           (amber ?)

  ⟩ Cloning BetterVolume...
  ✔ Successfully installed BetterVolume
```

**Error with fuzzy match:**
```
  ✖ Plugin "BeterVolume" not found           (red ✖)
  ⟩ Did you mean: BetterVolume               (amber ⟩)
                              [PLUGIN_NOT_FOUND]  (dim code)
```

**Doctor output:**
```
  ✔ git          available                   (emerald ✔)
  ✔ pnpm         available
  ~ Vencord      ~/src/Vencord (auto)        (~ for warnings)
  ✗ Discord      not found                   (red ✗)
```

### Environment Signals

| Signal | Effect |
|--------|--------|
| `NO_COLOR` set | All color disabled |
| `FORCE_COLOR` set | Color enabled even without TTY |
| `CI=true` | PlainRenderer selected (no color) |
| `--no-color` flag | Equivalent to `NO_COLOR=1` |

### Output Modes

| Mode | When | Behavior |
|------|------|----------|
| **TTY** | stdout is a terminal | Colored, animated spinners |
| **Plain** | Piped / `NO_COLOR` / CI | No ANSI, discrete lines |
| **JSON** | `--json` flag | Single envelope at end |
| **NDJSON** | `--json-stream` flag | One JSON object per line |
