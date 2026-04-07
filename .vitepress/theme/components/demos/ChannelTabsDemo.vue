<template>
    <DiscordFrame title="channelTabs — tab bar">
        <div class="ct-demo">
            <!-- Tab bar -->
            <div class="ct-tabbar">
                <div
                    v-for="(tab, i) in tabs"
                    :key="tab.id"
                    class="ct-tab"
                    :class="{
                        'ct-tab--active': activeId === tab.id,
                        'ct-tab--closing': closingId === tab.id,
                        'ct-tab--hovered': hoveredId === tab.id && activeId !== tab.id,
                    }"
                    :style="tab.id === closingId ? closingStyle : {}"
                    @click="activateTab(tab.id)"
                    @mouseenter="hoveredId = tab.id"
                    @mouseleave="hoveredId = null"
                    @mousedown.prevent
                >
                    <span v-if="tab.type === 'dm'" class="ct-avatar">{{ tab.initials }}</span>
                    <span v-else class="ct-hash">#</span>
                    <span class="ct-tab-label">{{ tab.name }}</span>
                    <button
                        class="ct-close"
                        :class="{ 'ct-close--visible': hoveredId === tab.id || activeId === tab.id }"
                        @click.stop="closeTab(tab.id, i)"
                        @mouseenter="closeHoverId = tab.id"
                        @mouseleave="closeHoverId = null"
                        :style="closeHoverId === tab.id ? { opacity: '1', background: 'rgba(255,255,255,0.1)' } : {}"
                        title="Close tab"
                    >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
                <button
                    class="ct-add"
                    title="New tab"
                    @click="addTab"
                    @mouseenter="addHovered = true"
                    @mouseleave="addHovered = false"
                    :style="addHovered ? { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' } : {}"
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1V9M1 5H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>

            <!-- Message content -->
            <div class="ct-content">
                <div v-for="msg in currentMessages" :key="msg.id" class="ct-message">
                    <div class="ct-msg-avatar" :style="{ background: msg.avatarColor }"></div>
                    <div class="ct-msg-body">
                        <span class="ct-msg-user">{{ msg.user }}</span>
                        <span class="ct-msg-text">{{ msg.text }}</span>
                    </div>
                </div>
            </div>
        </div>
    </DiscordFrame>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import DiscordFrame from "../showcase/DiscordFrame.vue";

interface Tab {
    id: number;
    name: string;
    type: "channel" | "dm";
    initials?: string;
}

interface Message {
    id: number;
    user: string;
    text: string;
    avatarColor: string;
}

const allMessages: Record<string, Message[]> = {
    general: [
        { id: 1, user: "theo", text: "anyone tried the new update yet?", avatarColor: "#5865f2" },
        { id: 2, user: "nyx", text: "yeah it's pretty solid, the tab animations feel snappy", avatarColor: "#eb459e" },
        { id: 3, user: "vale", text: "channelTabs is genuinely one of the best plugins", avatarColor: "#ed4245" },
    ],
    dev: [
        { id: 1, user: "theo", text: "pushed the context menu patch, needs review", avatarColor: "#5865f2" },
        { id: 2, user: "nyx", text: "on it, give me 10 mins", avatarColor: "#eb459e" },
        { id: 3, user: "vale", text: "the CSS order trick for positioning is clever", avatarColor: "#ed4245" },
    ],
    theo: [
        { id: 1, user: "theo", text: "hey, free this weekend?", avatarColor: "#5865f2" },
        { id: 2, user: "nyx", text: "yeah should be, what's up?", avatarColor: "#eb459e" },
        { id: 3, user: "theo", text: "thinking of doing a build stream", avatarColor: "#5865f2" },
    ],
    announcements: [
        { id: 1, user: "system", text: "venpm v0.1.0 is out — install any plugin with one command", avatarColor: "#57f287" },
        { id: 2, user: "system", text: "channelTabs now supports native context menus", avatarColor: "#57f287" },
        { id: 3, user: "system", text: "settingsHub unified settings are live", avatarColor: "#57f287" },
    ],
    stream: [
        { id: 1, user: "viewer1", text: "love the vibes tonight", avatarColor: "#fee75c" },
        { id: 2, user: "theo", text: "thanks! going to tackle the physics engine today", avatarColor: "#5865f2" },
        { id: 3, user: "viewer2", text: "WorldGame-Engine lets gooo", avatarColor: "#eb459e" },
    ],
};

const nextId = ref(10);
let tabCounter = 0;

const tabs = ref<Tab[]>([
    { id: 1, name: "general", type: "channel" },
    { id: 2, name: "dev", type: "channel" },
    { id: 3, name: "theo", type: "dm", initials: "TH" },
    { id: 4, name: "announcements", type: "channel" },
    { id: 5, name: "stream", type: "dm", initials: "ST" },
]);

const activeId = ref<number>(1);
const hoveredId = ref<number | null>(null);
const closeHoverId = ref<number | null>(null);
const closingId = ref<number | null>(null);
const addHovered = ref(false);

const closingStyle = {
    maxWidth: "0",
    opacity: "0",
    paddingLeft: "0",
    paddingRight: "0",
    overflow: "hidden",
    transition: "max-width 150ms ease, opacity 150ms ease, padding 150ms ease",
};

const currentMessages = computed(() => {
    const active = tabs.value.find(t => t.id === activeId.value);
    if (!active) return [];
    return allMessages[active.name] ?? allMessages["general"];
});

function activateTab(id: number) {
    activeId.value = id;
}

function closeTab(id: number, index: number) {
    if (tabs.value.length <= 1) return;

    closingId.value = id;

    // If closing the active tab, activate an adjacent one immediately
    if (activeId.value === id) {
        const newIndex = index > 0 ? index - 1 : 1;
        const next = tabs.value[newIndex];
        if (next) activeId.value = next.id;
    }

    // Wait for the 150ms animation then remove
    setTimeout(() => {
        tabs.value = tabs.value.filter(t => t.id !== id);
        closingId.value = null;
    }, 150);
}

const newTabNames = ["random", "gaming", "music", "memes", "off-topic"];
function addTab() {
    const name = newTabNames[tabCounter % newTabNames.length];
    tabCounter++;
    const id = nextId.value++;
    tabs.value.push({ id, name, type: "channel" });
    activeId.value = id;
}
</script>

<style scoped>
.ct-demo {
    display: flex;
    flex-direction: column;
    background: #313338;
    min-height: 220px;
    font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
}

/* ── Tab bar ── */
.ct-tabbar {
    display: flex;
    align-items: center;
    height: 32px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    background: #1e1f22;
    padding: 0 4px;
    gap: 2px;
    overflow: hidden;
}

.ct-tab {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 26px;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    max-width: 160px;
    background: transparent;
    transition: background 150ms ease, color 150ms ease, max-width 150ms ease, opacity 150ms ease, padding 150ms ease;
    flex-shrink: 0;
}

.ct-tab--active {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
}

.ct-tab--hovered {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.8);
}

.ct-tab:active {
    transform: scale(0.97);
}

.ct-hash {
    font-size: 13px;
    opacity: 0.7;
    flex-shrink: 0;
}

.ct-avatar {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #5865f2;
    font-size: 8px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-shrink: 0;
}

.ct-tab-label {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
}

.ct-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border: none;
    background: transparent;
    border-radius: 3px;
    color: currentColor;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 100ms ease, background 100ms ease;
    margin-left: 2px;
}

.ct-close--visible {
    opacity: 0.6;
}

.ct-close:hover {
    opacity: 1 !important;
}

.ct-add {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: none;
    background: transparent;
    border-radius: 4px;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    margin-left: 2px;
    transition: background 150ms ease, color 150ms ease;
}

/* ── Message content ── */
.ct-content {
    display: flex;
    flex-direction: column;
    padding: 12px 16px;
    gap: 12px;
}

.ct-message {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.ct-msg-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
}

.ct-msg-body {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.ct-msg-user {
    font-size: 13px;
    font-weight: 500;
    color: #f2f3f5;
}

.ct-msg-text {
    font-size: 14px;
    color: #dbdee1;
    line-height: 1.4;
}
</style>
