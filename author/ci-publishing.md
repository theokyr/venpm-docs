# CI & Publishing

## Validation in CI

Add a validation step to your CI pipeline. venpm exits with code 0 on success, 1 on failure:

```yaml
# .github/workflows/validate.yml
name: Validate
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"

      - name: Validate plugin index
        run: npx @kamaras/venpm validate plugins.json

      - name: Validate (strict)
        run: npx @kamaras/venpm validate plugins.json --strict
```

The `--strict` flag checks that:
- All `dependencies` and `optionalDependencies` reference plugins that exist in the same index
- Tarball URLs are accessible (HTTP HEAD request)

## Publishing via GitHub Releases

To make your plugins installable, host `plugins.json` at a stable URL. The recommended approach is GitHub Releases.

### Workflow

```yaml
# .github/workflows/publish.yml
name: Publish
on:
  push:
    branches: [main]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"

      - name: Validate
        run: npx @kamaras/venpm validate plugins.json --strict

      - name: Publish release
        uses: softprops/action-gh-release@v2
        with:
          tag_name: latest
          files: plugins.json
          body: "Latest plugin index"
```

This creates (or updates) a `latest` release with `plugins.json` as an asset. Users add the stable URL:

```bash
venpm repo add https://github.com/you/my-plugins/releases/latest/download/plugins.json
```

### Scaffolded Workflow

`venpm create` generates a validation workflow at `.github/workflows/validate.yml`. You can extend it with the publish job above, or keep them as separate workflows.

## Alternative Hosting

venpm doesn't care where the JSON is hosted. Any HTTP endpoint that returns the file works:

| Host | URL Pattern |
|------|------------|
| GitHub Releases | `https://github.com/user/repo/releases/latest/download/plugins.json` |
| GitHub Raw | `https://raw.githubusercontent.com/user/repo/main/plugins.json` |
| Gitea Raw | `https://gitea.example/user/repo/raw/branch/master/plugins.json` |
| Static site | `https://your-domain.com/plugins.json` |
| CDN (S3, R2, etc.) | `https://cdn.example.com/plugins.json` |

venpm caches the index locally and uses `ETag` / `Last-Modified` headers for conditional fetches, so serving from a CDN with cache headers is efficient.

## Versioned Releases

If you want to publish versioned releases (so users can pin `--version`), add a `versions` map to each plugin entry and create git tags:

```json
{
  "quickNotes": {
    "version": "1.1.0",
    "versions": {
      "1.1.0": { "git_tag": "v1.1.0" },
      "1.0.0": { "git_tag": "v1.0.0" }
    }
  }
}
```

Users can then install a specific version:

```bash
venpm install quickNotes --version 1.0.0
```
