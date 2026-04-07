# Plugin Index Format

A venpm plugin index is a JSON file (`plugins.json`) hosted at a stable URL. Users point venpm at the URL with [`venpm repo add`](/api/cli#venpm-repo), and venpm fetches and caches the index to resolve installs.

## Full Example

```json
{
  "$schema": "https://venpm.dev/schemas/v1/plugins.json",
  "name": "my-plugins",
  "description": "My custom Vencord plugins",
  "plugins": {
    "BetterFolders": {
      "version": "1.2.0",
      "description": "Enhanced server folder UI",
      "authors": [{ "name": "kamaras", "id": "123456789012345678" }],
      "license": "MIT",
      "source": {
        "git": "https://github.com/example/my-plugins.git",
        "path": "plugins/BetterFolders"
      },
      "versions": {
        "1.2.0": { "git_tag": "v1.2.0" },
        "1.1.0": {
          "git_tag": "v1.1.0",
          "tarball": "https://github.com/example/my-plugins/releases/download/v1.1.0/BetterFolders.tar.gz"
        }
      }
    },
    "QuickSearch": {
      "version": "0.3.1",
      "description": "Fuzzy search for channels and DMs",
      "authors": [{ "name": "kamaras", "id": "123456789012345678" }],
      "dependencies": ["BetterFolders"],
      "optionalDependencies": ["settingsHub"],
      "source": {
        "tarball": "https://github.com/example/my-plugins/releases/latest/download/QuickSearch.tar.gz"
      }
    }
  }
}
```

## Top-Level Fields

**`name`** (string, required)
Repository identifier. Must match `^[a-zA-Z0-9_-]+$`. This is how users reference your repo in `--from` flags.

**`description`** (string, required)
Human-readable description of this plugin repository.

**`$schema`** (string, optional)
Set to `"https://venpm.dev/schemas/v1/plugins.json"` to enable IDE validation and autocomplete.

**`plugins`** (object, required)
Map of plugin name to plugin entry. Keys are the names users pass to `venpm install`.

## Plugin Entry

**`version`** (string, required)
Current/latest semver version. Must match `^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$`.

**`description`** (string, required)
What the plugin does. Shown in `venpm search` and `venpm info` output.

**`authors`** (array, required)
At least one author object with `name` (string) and `id` (string — Discord user ID).

**`source`** (object, required)
Where to fetch the plugin. At least one of `git`, `tarball`, or `local` must be present.

- **`git`** — Git clone URL. venpm prefers this when git is available.
- **`path`** — Subdirectory within the git repo. Required for monorepos where each plugin lives in a subfolder.
- **`tarball`** — Direct `.tar.gz` download URL. Used as fallback when git is unavailable, or when `--tarball` is passed.
- **`local`** — Local filesystem path. For development workflows only — not published indexes.

**`license`** (string, optional)
SPDX license identifier (e.g., `"MIT"`, `"GPL-3.0"`).

**`dependencies`** (array of strings, optional)
Plugin names that must be installed first. venpm installs these automatically as part of the install plan.

**`optionalDependencies`** (array of strings, optional)
Plugin names that enhance this plugin but aren't required. venpm warns about missing optional deps but does not auto-install them.

**`discord`** / **`vencord`** (string, optional)
Informational version ranges. Displayed by `venpm info` but never used to block installs.

**`versions`** (object, optional)
Map of version string to version entry. Enables `venpm install <plugin> --version <ver>`.

Each version entry can have:
- **`git_tag`** — git tag for this version
- **`tarball`** — tarball URL for this specific version

## Monorepo Support

For repos with multiple plugins, use `source.path`:

```json
{
  "source": {
    "git": "https://github.com/you/my-plugins.git",
    "path": "plugins/BetterFolders"
  }
}
```

venpm performs a sparse checkout of only the specified subdirectory, keeping clones fast even for large repos.

## Hosting

### GitHub Releases (recommended)

Publish `plugins.json` as a release asset. The `venpm create` scaffold includes a GitHub Actions workflow that does this automatically on push to main.

Stable URL for users:
```
https://github.com/<user>/<repo>/releases/latest/download/plugins.json
```

### Raw Git Hosting

Point directly at the file in the repo:
```
https://raw.githubusercontent.com/<user>/<repo>/main/plugins.json
```

Or for Gitea:
```
https://your-gitea.example/user/repo/raw/branch/master/plugins.json
```

### Any Static Host

venpm fetches the URL with a plain HTTP GET. Any server that returns valid JSON works — CDN, S3, self-hosted static site, etc.

## Validation

Always validate before publishing:

```bash
venpm validate plugins.json           # schema check
venpm validate plugins.json --strict  # also checks dep refs and tarball URLs
```

Exit code 0 = valid, 1 = errors found.

## JSON Schema

The canonical schema is at:
```
https://venpm.dev/schemas/v1/plugins.json
```

See the [Plugin Index Schema Reference](/api/schemas/plugins) for the full annotated schema.
