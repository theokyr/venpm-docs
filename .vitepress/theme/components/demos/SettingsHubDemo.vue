<template>
    <DiscordFrame title="settingsHub — unified settings">
        <div class="sh-demo">
            <!-- Sidebar -->
            <div class="sh-sidebar">
                <div class="sh-category-label">PLUGINS</div>
                <button
                    v-for="plugin in pluginList"
                    :key="plugin.id"
                    class="sh-sidebar-item"
                    :class="{ 'sh-sidebar-item--active': activePlugin === plugin.id }"
                    @click="activePlugin = plugin.id"
                    @mouseenter="sidebarHover = plugin.id"
                    @mouseleave="sidebarHover = null"
                    :style="sidebarItemStyle(plugin.id)"
                >{{ plugin.label }}</button>
            </div>

            <!-- Content -->
            <div class="sh-content">
                <div class="sh-plugin-header">{{ activePluginData.label }}</div>
                <div class="sh-settings-list">
                    <div
                        v-for="(setting, i) in activePluginData.settings"
                        :key="setting.key"
                        class="sh-row"
                        :style="i < activePluginData.settings.length - 1 ? { borderBottom: '1px solid #3f4147' } : {}"
                    >
                        <div class="sh-row-left">
                            <div class="sh-row-label">{{ setting.label }}</div>
                            <div v-if="setting.description" class="sh-row-desc">{{ setting.description }}</div>
                        </div>
                        <div class="sh-row-control">
                            <!-- Toggle -->
                            <button
                                v-if="setting.type === 'toggle'"
                                class="sh-toggle"
                                :class="{ 'sh-toggle--on': settingsState[activePlugin][setting.key] }"
                                @click="toggleSetting(setting.key)"
                                :aria-checked="settingsState[activePlugin][setting.key]"
                                role="switch"
                            >
                                <span class="sh-toggle-knob"></span>
                            </button>

                            <!-- Slider -->
                            <div v-else-if="setting.type === 'slider'" class="sh-slider-wrap">
                                <span class="sh-slider-value">{{ settingsState[activePlugin][setting.key] }}</span>
                                <input
                                    type="range"
                                    class="sh-slider"
                                    :min="setting.min"
                                    :max="setting.max"
                                    :value="settingsState[activePlugin][setting.key]"
                                    @input="(e) => sliderInput(setting.key, e)"
                                />
                            </div>

                            <!-- Select -->
                            <select
                                v-else-if="setting.type === 'select'"
                                class="sh-select"
                                :value="settingsState[activePlugin][setting.key]"
                                @change="(e) => selectChange(setting.key, e)"
                            >
                                <option v-for="opt in setting.options" :key="opt" :value="opt">{{ opt }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DiscordFrame>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import DiscordFrame from "../showcase/DiscordFrame.vue";

type SettingType = "toggle" | "slider" | "select";

interface Setting {
    key: string;
    label: string;
    description?: string;
    type: SettingType;
    min?: number;
    max?: number;
    options?: string[];
}

interface PluginDef {
    id: string;
    label: string;
    settings: Setting[];
}

const pluginList: PluginDef[] = [
    {
        id: "channelTabs",
        label: "channelTabs",
        settings: [
            { key: "tabPosition", label: "Tab position", description: "Show tab bar at top or bottom", type: "toggle" },
            { key: "hideGuilds", label: "Hide guilds sidebar", description: "More space for the tab bar", type: "toggle" },
            { key: "tabHeight", label: "Tab height", description: "Height of each tab (px)", type: "slider", min: 24, max: 40 },
        ],
    },
    {
        id: "bsNoMore",
        label: "bsNoMore",
        settings: [
            { key: "hideNitro", label: "Hide Nitro button", description: "Remove from channel input bar", type: "toggle" },
            { key: "hideClanTags", label: "Hide clan tags", description: "Remove decorative clan badges", type: "toggle" },
            { key: "suppressQuests", label: "Suppress quests", description: "Block quest popups entirely", type: "toggle" },
        ],
    },
    {
        id: "hotkeyNav",
        label: "hotkeyNav",
        settings: [
            { key: "showKeycaps", label: "Show keycap hints", description: "Overlay hints in channel list", type: "toggle" },
            { key: "modifier", label: "Navigation modifier", description: "Modifier key for nav chords", type: "select", options: ["Ctrl", "Alt", "Shift"] },
        ],
    },
];

const activePlugin = ref("channelTabs");
const sidebarHover = ref<string | null>(null);

const settingsState = reactive<Record<string, Record<string, any>>>({
    channelTabs: { tabPosition: true, hideGuilds: false, tabHeight: 32 },
    bsNoMore: { hideNitro: true, hideClanTags: true, suppressQuests: true },
    hotkeyNav: { showKeycaps: true, modifier: "Ctrl" },
});

const activePluginData = computed(() => pluginList.find(p => p.id === activePlugin.value)!);

function sidebarItemStyle(id: string) {
    if (id === activePlugin.value) return {};
    if (id === sidebarHover.value) return { background: "#35373c" };
    return {};
}

function toggleSetting(key: string) {
    settingsState[activePlugin.value][key] = !settingsState[activePlugin.value][key];
}

function sliderInput(key: string, e: Event) {
    settingsState[activePlugin.value][key] = parseInt((e.target as HTMLInputElement).value);
}

function selectChange(key: string, e: Event) {
    settingsState[activePlugin.value][key] = (e.target as HTMLSelectElement).value;
}
</script>

<style scoped>
.sh-demo {
    display: flex;
    min-height: 220px;
    font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
}

/* ── Sidebar ── */
.sh-sidebar {
    width: 160px;
    flex-shrink: 0;
    background: #2b2d31;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.sh-category-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #949ba4;
    padding: 4px 8px 8px;
}

.sh-sidebar-item {
    display: block;
    width: 100%;
    text-align: left;
    font-size: 13px;
    padding: 6px 8px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    color: #b5bac1;
    background: transparent;
    transition: background 150ms ease, color 150ms ease;
    font-family: inherit;
}

.sh-sidebar-item--active {
    background: #404249;
    color: #fff;
}

/* ── Content ── */
.sh-content {
    flex: 1;
    background: #313338;
    padding: 16px;
    overflow-y: auto;
}

.sh-plugin-header {
    font-size: 16px;
    font-weight: 600;
    color: #f2f3f5;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #3f4147;
}

.sh-settings-list {
    display: flex;
    flex-direction: column;
}

.sh-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    gap: 16px;
}

.sh-row-left {
    flex: 1;
    min-width: 0;
}

.sh-row-label {
    font-size: 14px;
    font-weight: 500;
    color: #f2f3f5;
}

.sh-row-desc {
    font-size: 12px;
    color: #949ba4;
    margin-top: 2px;
}

.sh-row-control {
    flex-shrink: 0;
}

/* ── Toggle ── */
.sh-toggle {
    width: 40px;
    height: 24px;
    border-radius: 12px;
    background: #72767d;
    border: none;
    cursor: pointer;
    padding: 0;
    position: relative;
    transition: background 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
    flex-shrink: 0;
}

.sh-toggle--on {
    background: #23a55a;
}

.sh-toggle-knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sh-toggle--on .sh-toggle-knob {
    transform: translateX(16px);
}

/* ── Slider ── */
.sh-slider-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
}

.sh-slider-value {
    font-size: 12px;
    color: #949ba4;
    min-width: 24px;
    text-align: right;
}

.sh-slider {
    width: 100px;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: #3f4147;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
}

.sh-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #5865f2;
    cursor: pointer;
    transition: background 100ms ease;
}

.sh-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #5865f2;
    border: none;
    cursor: pointer;
}

/* ── Select ── */
.sh-select {
    background: #1e1f22;
    border: 1px solid #3f4147;
    border-radius: 4px;
    color: #dbdee1;
    font-size: 13px;
    font-family: inherit;
    padding: 4px 8px;
    cursor: pointer;
    outline: none;
    transition: border-color 150ms ease;
}

.sh-select:focus {
    border-color: #5865f2;
}
</style>
