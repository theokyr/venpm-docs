# venpm-docs

VitePress documentation site for venpm (Vencord Plugin Manager).

## Layout

```
.vitepress/config.ts     # VitePress config — nav, sidebar, theme
guide/                   # User guide (getting started, installing, config, troubleshooting)
author/                  # Author guide (first plugin, index format, scaffolding, CI)
api/                     # API reference (CLI commands, JSON output, schemas)
internals/               # Architecture, testing, contributing
internals/generated/     # Auto-generated TypeDoc module reference (do not hand-edit)
typedoc.json             # TypeDoc config — points at ~/src/venpm/src/
tsconfig.typedoc.json    # TypeScript config for TypeDoc resolution
public/                  # Static assets (logo, favicon)
```

## Build

```bash
npm run dev              # Dev server with hot reload
npm run build            # TypeDoc + VitePress build (output: .vitepress/dist/)
npm run preview          # Preview production build
npm run typedoc          # Regenerate internals/generated/ from venpm source
```

TypeDoc reads from `~/src/venpm/src/` — the venpm repo must be present locally.

## Dependencies

- **VitePress** ^1.6.0
- **TypeDoc** ^0.28.0 (required by typedoc-plugin-markdown@4.x)
- **typedoc-plugin-markdown** ^4.4.0

## Conventions

- Hand-written pages in `guide/`, `author/`, `api/`, `internals/` (top-level .md files)
- Auto-generated pages in `internals/generated/` — regenerate with `npm run typedoc`, do not hand-edit
- Brand palette: Carbon Forest Amber (`--vp-c-brand-1: #f97316`), dark-mode native, distinct from Vencord's purple
- 49 pages total across all sections

## Deployment

Live at **https://venpm.dev** via GitHub Pages. Deploys on push to `main`.

## Brand Identity

"Carbon Forest Amber" — see `DESIGN.md` for full spec (awesome-design-md 9-section format).

| Element | Value |
|---------|-------|
| Primary accent | Amber `#f97316` |
| Semantic color | Emerald `#34d399` (success/positive only) |
| Backgrounds | Forest-tinted blacks (`#0b0f0e`, `#141c1a`, `#1c2b26`) |
| Headlines | JetBrains Mono 700-800, tight tracking |
| Body | DM Sans |

## Git

- **Origin:** `https://github.com/theokyr/venpm-docs.git`
- **Branch:** `master`
