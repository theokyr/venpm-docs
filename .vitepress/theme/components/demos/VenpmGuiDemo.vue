<template>
    <DiscordFrame title="venpmGui — plugin browser">
        <div class="vg-demo">
            <!-- Search bar -->
            <div class="vg-search">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="vg-search-icon">
                    <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <input
                    type="text"
                    class="vg-search-input"
                    v-model="query"
                    placeholder="Search plugins..."
                />
            </div>

            <!-- Plugin grid -->
            <div class="vg-grid">
                <div
                    v-for="plugin in filteredPlugins"
                    :key="plugin.name"
                    class="vg-card"
                >
                    <span class="vg-card-name">{{ plugin.name }}</span>
                    <span class="vg-card-desc">{{ plugin.desc }}</span>
                    <button
                        class="vg-btn"
                        :class="{
                            'vg-btn--installing': plugin.state === 'installing',
                            'vg-btn--installed': plugin.state === 'installed',
                        }"
                        :disabled="plugin.state !== 'default'"
                        @click="install(plugin)"
                    >
                        <span v-if="plugin.state === 'installing'" class="vg-spinner"></span>
                        <span v-else-if="plugin.state === 'installed'">&#10003; Installed</span>
                        <span v-else>Install</span>
                    </button>
                </div>
            </div>
        </div>
    </DiscordFrame>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import DiscordFrame from "../showcase/DiscordFrame.vue";

type PluginState = "default" | "installing" | "installed";

interface Plugin {
    name: string;
    desc: string;
    state: PluginState;
}

const query = ref("");

const plugins = ref<Plugin[]>([
    { name: "channelTabs",    desc: "Tab bar for channels",   state: "default"   },
    { name: "settingsHub",    desc: "Unified settings",       state: "installed" },
    { name: "hotkeyNav",      desc: "Keyboard navigation",    state: "default"   },
    { name: "bsNoMore",       desc: "Remove clutter",         state: "default"   },
    { name: "minimalCallBar", desc: "Compact call bar",       state: "installed" },
    { name: "discordMcp",     desc: "AI bridge",              state: "default"   },
]);

const filteredPlugins = computed(() =>
    query.value.trim() === ""
        ? plugins.value
        : plugins.value.filter(p =>
              p.name.toLowerCase().includes(query.value.toLowerCase())
          )
);

function install(plugin: Plugin) {
    if (plugin.state !== "default") return;
    plugin.state = "installing";
    setTimeout(() => {
        plugin.state = "installed";
    }, 1200);
}
</script>

<style scoped>
.vg-demo {
    display: flex;
    flex-direction: column;
    background: #313338;
    height: 280px;
    font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
    padding: 12px;
    gap: 10px;
    overflow: hidden;
}

/* ── Search ── */
.vg-search {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #1e1f22;
    border-radius: 4px;
    padding: 6px 10px;
    flex-shrink: 0;
    color: #949ba4;
}

.vg-search-icon {
    flex-shrink: 0;
}

.vg-search-input {
    background: transparent;
    border: none;
    outline: none;
    font-size: 13px;
    color: #dbdee1;
    font-family: inherit;
    width: 100%;
}

.vg-search-input::placeholder {
    color: #949ba4;
}

/* ── Grid ── */
.vg-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    overflow: hidden;
}

/* ── Card ── */
.vg-card {
    background: #2b2d31;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.vg-card-name {
    font-size: 13px;
    font-weight: 600;
    color: #f2f3f5;
}

.vg-card-desc {
    font-size: 11px;
    color: #949ba4;
    flex: 1;
}

/* ── Button ── */
.vg-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 3px;
    border: none;
    font-size: 11px;
    font-weight: 600;
    font-family: inherit;
    min-height: 24px;
    cursor: pointer;
    background: #5865f2;
    color: #fff;
    transition: background 100ms ease;
}

.vg-btn:hover:not(:disabled) {
    background: #4752c4;
}

.vg-btn--installing {
    background: #3f4147;
    cursor: wait;
    color: #949ba4;
}

.vg-btn--installed {
    background: #23a55a;
    cursor: default;
    color: #fff;
}

/* ── Spinner ── */
.vg-spinner {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-top-color: #fff;
    animation: vg-spin 0.6s linear infinite;
    flex-shrink: 0;
}

@keyframes vg-spin {
    to { transform: rotate(360deg); }
}
</style>
