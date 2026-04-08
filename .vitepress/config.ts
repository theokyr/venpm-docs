import { defineConfig } from "vitepress";

export default defineConfig({
    title: "venpm",
    titleTemplate: ":title | venpm",
    description: "The package manager for Vencord plugins. Install, update, and manage userplugins from the command line.",
    appearance: 'dark',
    lastUpdated: true,
    ignoreDeadLinks: [/\/LICENSE/],

    sitemap: {
        hostname: "https://venpm.dev",
    },

    head: [
        ["link", { rel: "icon", href: "/favicon.svg" }],

        // Basic SEO
        ["meta", { name: "author", content: "kamaras" }],
        ["meta", { name: "keywords", content: "venpm, vencord, discord, plugin manager, userplugins, cli, package manager" }],

        // Open Graph
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:site_name", content: "venpm" }],
        ["meta", { property: "og:title", content: "venpm — Vencord Plugin Manager" }],
        ["meta", { property: "og:description", content: "Install, update, and manage Vencord userplugins from the command line." }],
        ["meta", { property: "og:url", content: "https://venpm.dev/" }],
        ["meta", { property: "og:image", content: "https://venpm.dev/og-image.png" }],
        ["meta", { property: "og:image:width", content: "1200" }],
        ["meta", { property: "og:image:height", content: "630" }],
        ["meta", { property: "og:image:alt", content: "venpm — Vencord Plugin Manager" }],
        ["meta", { property: "og:locale", content: "en_US" }],

        // Twitter Card
        ["meta", { name: "twitter:card", content: "summary_large_image" }],
        ["meta", { name: "twitter:title", content: "venpm — Vencord Plugin Manager" }],
        ["meta", { name: "twitter:description", content: "Install, update, and manage Vencord userplugins from the command line." }],
        ["meta", { name: "twitter:image", content: "https://venpm.dev/og-image.png" }],

        // Theme color
        ["meta", { name: "theme-color", content: "#f97316" }],

        // Structured data
        ["script", { type: "application/ld+json" }, JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "name": "venpm",
                    "url": "https://venpm.dev",
                    "description": "Documentation for venpm, the Vencord Plugin Manager CLI.",
                },
                {
                    "@type": "SoftwareApplication",
                    "name": "venpm",
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Linux, macOS, Windows",
                    "description": "CLI package manager for Vencord userplugins. Install, update, search, and manage Discord plugins.",
                    "url": "https://venpm.dev",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD",
                    },
                    "author": {
                        "@type": "Person",
                        "name": "kamaras",
                    },
                },
            ],
        })],
    ],

    transformHead({ pageData }) {
        const head: [string, Record<string, string>][] = [];
        const canonicalUrl = `https://venpm.dev/${pageData.relativePath}`
            .replace(/index\.md$/, "")
            .replace(/\.md$/, "");

        head.push(["link", { rel: "canonical", href: canonicalUrl }]);
        head.push(["meta", { property: "og:url", content: canonicalUrl }]);

        if (pageData.frontmatter.description) {
            head.push(["meta", { property: "og:description", content: pageData.frontmatter.description }]);
        }

        return head;
    },

    themeConfig: {
        logo: "/logo-dark.svg",
        siteTitle: "venpm",

        nav: [
            { text: "Guide", link: "/guide/getting-started" },
            { text: "Plugins", link: "/plugins/kamaras" },
            { text: "Author Guide", link: "/author/your-first-plugin" },
            { text: "API Reference", link: "/api/cli" },
            { text: "Internals", link: "/internals/architecture" },
        ],

        sidebar: {
            "/guide/": [
                {
                    text: "User Guide",
                    items: [
                        { text: "Getting Started", link: "/guide/getting-started" },
                        { text: "Installing Plugins", link: "/guide/installing-plugins" },
                        { text: "Configuration", link: "/guide/configuration" },
                        { text: "Troubleshooting", link: "/guide/troubleshooting" },
                    ],
                },
            ],
            "/author/": [
                {
                    text: "Author Guide",
                    items: [
                        { text: "Your First Plugin", link: "/author/your-first-plugin" },
                        { text: "Plugin Index Format", link: "/author/plugin-index" },
                        { text: "Scaffolding", link: "/author/scaffolding" },
                        { text: "CI & Publishing", link: "/author/ci-publishing" },
                    ],
                },
            ],
            "/api/": [
                {
                    text: "API Reference",
                    items: [
                        { text: "CLI Commands", link: "/api/cli" },
                        { text: "JSON Output", link: "/api/json-output" },
                        { text: "Error Codes", link: "/api/error-codes" },
                    ],
                },
                {
                    text: "Schemas",
                    items: [
                        { text: "Plugin Index", link: "/api/schemas/plugins" },
                        { text: "Config", link: "/api/schemas/config" },
                        { text: "Lockfile", link: "/api/schemas/lockfile" },
                    ],
                },
            ],
            "/internals/": [
                {
                    text: "Internals",
                    items: [
                        { text: "Architecture", link: "/internals/architecture" },
                        { text: "Testing", link: "/internals/testing" },
                        { text: "Contributing", link: "/internals/contributing" },
                    ],
                },
                {
                    text: "Module Reference",
                    items: [
                        { text: "Overview", link: "/internals/generated/README" },
                        {
                            text: "Core",
                            items: [
                                { text: "ansi", link: "/internals/generated/core/ansi" },
                                { text: "builder", link: "/internals/generated/core/builder" },
                                { text: "cache", link: "/internals/generated/core/cache" },
                                { text: "config", link: "/internals/generated/core/config" },
                                { text: "detect", link: "/internals/generated/core/detect" },
                                { text: "errors", link: "/internals/generated/core/errors" },
                                { text: "fetcher", link: "/internals/generated/core/fetcher" },
                                { text: "fuzzy", link: "/internals/generated/core/fuzzy" },
                                { text: "json", link: "/internals/generated/core/json" },
                                { text: "json-renderer", link: "/internals/generated/core/json-renderer" },
                                { text: "lockfile", link: "/internals/generated/core/lockfile" },
                                { text: "paths", link: "/internals/generated/core/paths" },
                                { text: "progress", link: "/internals/generated/core/progress" },
                                { text: "prompt", link: "/internals/generated/core/prompt" },
                                { text: "registry", link: "/internals/generated/core/registry" },
                                { text: "renderer", link: "/internals/generated/core/renderer" },
                                { text: "resolver", link: "/internals/generated/core/resolver" },
                                { text: "schema", link: "/internals/generated/core/schema" },
                                { text: "stream-renderer", link: "/internals/generated/core/stream-renderer" },
                                { text: "types", link: "/internals/generated/core/types" },
                            ],
                        },
                        {
                            text: "CLI",
                            items: [
                                { text: "completions", link: "/internals/generated/cli/completions" },
                                { text: "config-cmd", link: "/internals/generated/cli/config-cmd" },
                                { text: "context", link: "/internals/generated/cli/context" },
                                { text: "create", link: "/internals/generated/cli/create" },
                                { text: "doctor", link: "/internals/generated/cli/doctor" },
                                { text: "first-run", link: "/internals/generated/cli/first-run" },
                                { text: "help", link: "/internals/generated/cli/help" },
                                { text: "info", link: "/internals/generated/cli/info" },
                                { text: "install", link: "/internals/generated/cli/install" },
                                { text: "list", link: "/internals/generated/cli/list" },
                                { text: "rebuild", link: "/internals/generated/cli/rebuild" },
                                { text: "repo", link: "/internals/generated/cli/repo" },
                                { text: "search", link: "/internals/generated/cli/search" },
                                { text: "uninstall", link: "/internals/generated/cli/uninstall" },
                                { text: "update", link: "/internals/generated/cli/update" },
                                { text: "validate", link: "/internals/generated/cli/validate" },
                            ],
                        },
                    ],
                },
            ],
        },

        socialLinks: [
            { icon: "github", link: "https://github.com/theokyr/venpm" },
        ],

        search: {
            provider: "local",
        },

        editLink: {
            pattern: "https://github.com/theokyr/venpm-docs/edit/main/:path",
            text: "Edit this page",
        },

        footer: {
            message: '<a href="/disclaimer">Disclaimer</a> — Not affiliated with Discord Inc. or Vencord. Client mods are against Discord\'s ToS. Use at your own risk.',
        },
    },
});
