<template>
    <div class="showcase-layout">
        <nav class="showcase-pills">
            <div
                v-for="plugin in plugins"
                :key="plugin.name"
                class="showcase-pill"
                :class="{ active: activePlugin === plugin.name }"
                @click="scrollToPlugin(plugin.name)"
            >
                {{ plugin.label }}
            </div>
        </nav>
        <div class="showcase-body">
            <aside class="showcase-sidebar">
                <div class="showcase-sidebar-label">PLUGINS</div>
                <nav>
                    <a
                        v-for="plugin in plugins"
                        :key="plugin.name"
                        :href="`#plugin-${plugin.name}`"
                        class="showcase-sidebar-item"
                        :class="{ active: activePlugin === plugin.name }"
                        @click.prevent="scrollToPlugin(plugin.name)"
                    >{{ plugin.label }}</a>
                </nav>
            </aside>
            <main class="showcase-content">
                <div class="showcase-hero">
                    <h1>kamaras plugins</h1>
                    <p class="showcase-hero-subtitle">A collection of Vencord userplugins — install any of them with venpm.</p>
                    <p class="showcase-hero-hint">
                        Install any plugin: <code>venpm install &lt;name&gt;</code>
                    </p>
                </div>
                <PluginSection
                    v-for="plugin in plugins"
                    :key="plugin.name"
                    :plugin="plugin"
                    :hasDemo="hasDemo(plugin.name)"
                >
                    <component :is="getDemo(plugin.name)" v-if="hasDemo(plugin.name)" />
                </PluginSection>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted, onUnmounted } from "vue";
import { useData } from "vitepress";
import PluginSection from "../components/showcase/PluginSection.vue";

const { frontmatter } = useData();
const plugins = frontmatter.value.plugins ?? [];

const activePlugin = ref<string>(plugins[0]?.name ?? "");

const demoComponents: Record<string, ReturnType<typeof defineAsyncComponent>> = {
    channelTabs: defineAsyncComponent(() => import("../components/demos/ChannelTabsDemo.vue")),
    settingsHub: defineAsyncComponent(() => import("../components/demos/SettingsHubDemo.vue")),
    minimalCallBar: defineAsyncComponent(() => import("../components/demos/MinimalCallBarDemo.vue")),
    hotkeyNav: defineAsyncComponent(() => import("../components/demos/HotkeyNavDemo.vue")),
    discordMcp: defineAsyncComponent(() => import("../components/demos/DiscordMcpDemo.vue")),
    bsNoMore: defineAsyncComponent(() => import("../components/demos/BsNoMoreDemo.vue")),
    messageHeaderAvatar: defineAsyncComponent(() => import("../components/demos/MsgHeaderAvatarDemo.vue")),
    venpmGui: defineAsyncComponent(() => import("../components/demos/VenpmGuiDemo.vue")),
};

function hasDemo(name: string): boolean {
    return name in demoComponents;
}

function getDemo(name: string) {
    return demoComponents[name] ?? null;
}

let observer: IntersectionObserver | null = null;

function scrollToPlugin(name: string) {
    const el = document.getElementById(`plugin-${name}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#plugin-${name}`);
}

onMounted(() => {
    // Handle initial hash
    const hash = location.hash;
    if (hash) {
        const name = hash.replace("#plugin-", "");
        if (plugins.find((p: any) => p.name === name)) {
            activePlugin.value = name;
        }
    }

    observer = new IntersectionObserver(
        (entries) => {
            // Pick the first intersecting entry sorted by top position (topmost wins)
            const intersecting = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
            if (intersecting.length > 0) {
                const name = intersecting[0].target.id.replace("plugin-", "");
                activePlugin.value = name;
                history.replaceState(null, "", `#plugin-${name}`);
            }
        },
        { rootMargin: "-20% 0px -60% 0px" }
    );

    plugins.forEach((plugin: any) => {
        const el = document.getElementById(`plugin-${plugin.name}`);
        if (el) observer!.observe(el);
    });
});

onUnmounted(() => {
    observer?.disconnect();
});
</script>

<style scoped>
.showcase-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--vp-bg);
}

.showcase-body {
    display: flex;
    flex: 1;
}

.showcase-sidebar {
    width: 180px;
    flex-shrink: 0;
    position: sticky;
    top: var(--vp-nav-height, 64px);
    height: calc(100vh - var(--vp-nav-height, 64px));
    border-right: 1px solid var(--vp-border);
    padding: 24px 12px;
    overflow-y: auto;
}

.showcase-sidebar-label {
    font-family: var(--vp-font-family-mono);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--vp-amber);
    margin-bottom: 12px;
    padding: 0 10px;
}

.showcase-sidebar-item {
    display: block;
    font-size: 13px;
    padding: 6px 10px;
    border-radius: 4px;
    border-left: 2px solid transparent;
    color: var(--vp-body);
    text-decoration: none;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    cursor: pointer;
    margin-bottom: 2px;
}

.showcase-sidebar-item:hover {
    background: rgba(42, 64, 56, 0.5);
    color: var(--vp-heading);
}

.showcase-sidebar-item.active {
    color: var(--vp-amber);
    background: var(--vp-amber-soft);
    border-left-color: var(--vp-amber);
}

.showcase-content {
    flex: 1;
    max-width: 900px;
    padding: 32px 40px;
}

.showcase-hero {
    margin-bottom: 64px;
    padding-bottom: 32px;
    border-bottom: 1px solid;
    border-image: linear-gradient(90deg, var(--vp-amber), transparent) 1;
}

.showcase-hero h1 {
    font-family: var(--vp-font-family-mono);
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -2px;
    color: var(--vp-amber);
    margin: 0 0 12px;
    line-height: 1.1;
}

.showcase-hero-subtitle {
    font-family: var(--vp-font-family-base);
    font-size: 15px;
    color: var(--vp-muted);
    margin: 0;
}

.showcase-hero-hint {
    font-family: var(--vp-font-family-mono);
    font-size: 13px;
    color: var(--vp-muted, #4a5c56);
    margin: 16px 0 0;
}

.showcase-hero-hint code {
    color: var(--vp-body, #94a3b8);
    background: var(--vp-surface, #141c1a);
    padding: 2px 6px;
    border-radius: 4px;
}

/* Mobile pill bar — hidden by default, shown on tablet/mobile */
.showcase-pills {
    display: none;
}

/* Tablet: hide sidebar, full-width content */
@media (max-width: 1023px) {
    .showcase-sidebar {
        display: none;
    }

    .showcase-content {
        max-width: 100%;
        padding: 24px 20px;
    }

    .showcase-pills {
        display: flex;
        gap: 6px;
        padding: 8px 16px;
        overflow-x: auto;
        scrollbar-width: none;
        position: sticky;
        top: var(--vp-nav-height, 64px);
        z-index: 20;
        background: var(--vp-bg, #0b0f0e);
        border-bottom: 1px solid var(--vp-border, #1c2b26);
    }

    .showcase-pills::-webkit-scrollbar {
        display: none;
    }

    .showcase-pill {
        font-family: var(--vp-font-family-mono);
        font-size: 12px;
        padding: 4px 12px;
        border-radius: 12px;
        border: 1px solid var(--vp-border, #1c2b26);
        color: var(--vp-body, #94a3b8);
        white-space: nowrap;
        cursor: pointer;
        transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
    }

    .showcase-pill:hover {
        background: rgba(42, 64, 56, 0.5);
    }

    .showcase-pill.active {
        color: var(--vp-amber, #f97316);
        background: rgba(249, 115, 22, 0.12);
        border-color: rgba(249, 115, 22, 0.3);
    }
}

/* Mobile: reduced spacing */
@media (max-width: 767px) {
    .showcase-hero h1 {
        font-size: 32px;
        letter-spacing: -1px;
    }

    .showcase-content {
        padding: 16px 16px;
    }
}
</style>
