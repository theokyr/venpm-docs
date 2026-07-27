<template>
        <div class="ct-demo">
            <!-- Tab bar -->
            <div
                ref="tabbar"
                class="ct-tabbar"
                @dragover.prevent="onDragOver"
                @drop.prevent="onDrop"
                @dragleave="onDragLeave"
            >
                <div v-if="caretX !== null" class="ct-caret" :style="{ left: `${caretX}px` }"></div>
                <TransitionGroup name="ct-move" tag="div" class="ct-taglist">
                <div
                    v-for="(tab, i) in tabs"
                    :key="tab.id"
                    class="ct-tab"
                    :class="{
                        'ct-tab--active': activeId === tab.id,
                        'ct-tab--closing': closingId === tab.id,
                        'ct-tab--hovered': hoveredId === tab.id && activeId !== tab.id,
                        'ct-tab--dragging': draggingId === tab.id,
                    }"
                    :style="tab.id === closingId ? closingStyle : {}"
                    :data-index="i"
                    draggable="true"
                    @dragstart="onDragStart($event, tab, i)"
                    @dragend="onDragEnd"
                    @click="activateTab(tab.id)"
                    @mouseenter="hoveredId = tab.id"
                    @mouseleave="hoveredId = null"
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
                </TransitionGroup>
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

            <p class="ct-hint">Drag a tab to reorder it.</p>

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
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

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
        { id: 1, user: "user1", text: "anyone tried the new update yet?", avatarColor: "#5865f2" },
        { id: 2, user: "user2", text: "yeah it's pretty solid, the tab animations feel snappy", avatarColor: "#eb459e" },
        { id: 3, user: "user3", text: "channelTabs is genuinely one of the best plugins", avatarColor: "#ed4245" },
    ],
    dev: [
        { id: 1, user: "user1", text: "pushed the context menu patch, needs review", avatarColor: "#5865f2" },
        { id: 2, user: "user2", text: "on it, give me 10 mins", avatarColor: "#eb459e" },
        { id: 3, user: "user3", text: "the CSS order trick for positioning is clever", avatarColor: "#ed4245" },
    ],
    user1: [
        { id: 1, user: "user1", text: "hey, free this weekend?", avatarColor: "#5865f2" },
        { id: 2, user: "user2", text: "yeah should be, what's up?", avatarColor: "#eb459e" },
        { id: 3, user: "user1", text: "thinking of doing a build stream", avatarColor: "#5865f2" },
    ],
    announcements: [
        { id: 1, user: "system", text: "venpm v0.5.0 is out — install any plugin with one command", avatarColor: "#57f287" },
        { id: 2, user: "system", text: "channelTabs tabs can now be dragged, grouped, and reordered", avatarColor: "#57f287" },
        { id: 3, user: "system", text: "settingsHub unified settings are live", avatarColor: "#57f287" },
    ],
    stream: [
        { id: 1, user: "viewer1", text: "love the vibes tonight", avatarColor: "#fee75c" },
        { id: 2, user: "user1", text: "thanks! going to tackle the physics engine today", avatarColor: "#5865f2" },
        { id: 3, user: "viewer2", text: "WorldGame-Engine lets gooo", avatarColor: "#eb459e" },
    ],
};

const nextId = ref(10);
let tabCounter = 0;

const tabs = ref<Tab[]>([
    { id: 1, name: "general", type: "channel" },
    { id: 2, name: "dev", type: "channel" },
    { id: 3, name: "user1", type: "dm", initials: "U1" },
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

/* ── Drag & drop ──
 * Mirrors the plugin: the payload is kept in module state because `dragover`
 * cannot read `dataTransfer`, the drop slot is the index before the first tab
 * whose midpoint the pointer has not passed, and the reorder itself is a FLIP
 * animation (here, Vue's TransitionGroup move class). */

const tabbar = ref<HTMLElement | null>(null);
const draggingId = ref<number | null>(null);
const dropIndex = ref<number | null>(null);
const caretX = ref<number | null>(null);
let dragFrom = -1;

function tabEls(): HTMLElement[] {
    if (!tabbar.value) return [];
    return Array.from(tabbar.value.querySelectorAll<HTMLElement>(".ct-tab"));
}

/** Insertion slot nearest to `clientX`, and where to paint the caret. */
function slotAt(clientX: number): { index: number; x: number } {
    const bar = tabbar.value;
    if (!bar) return { index: 0, x: 0 };
    const barLeft = bar.getBoundingClientRect().left;
    const els = tabEls();

    for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (clientX < rect.left + rect.width / 2) {
            return { index: Number(el.dataset.index), x: rect.left - barLeft - 1 };
        }
    }

    const last = els[els.length - 1];
    return {
        index: els.length,
        x: last ? last.getBoundingClientRect().right - barLeft - 1 : 0,
    };
}

function onDragStart(e: DragEvent, tab: Tab, index: number) {
    draggingId.value = tab.id;
    dragFrom = index;
    e.dataTransfer?.setData("text/plain", String(tab.id));
    if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";

    // Replace the browser's flat ghost with a tilted, shadowed clone.
    const el = e.currentTarget as HTMLElement;
    const mirror = el.cloneNode(true) as HTMLElement;
    mirror.classList.add("ct-mirror");
    mirror.style.width = `${el.offsetWidth}px`;
    document.body.appendChild(mirror);
    e.dataTransfer?.setDragImage(mirror, el.offsetWidth / 2, el.offsetHeight / 2);
    setTimeout(() => mirror.remove(), 0);
}

function onDragOver(e: DragEvent) {
    if (draggingId.value === null) return;
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    const slot = slotAt(e.clientX);
    dropIndex.value = slot.index;
    caretX.value = slot.x;
}

function onDragLeave(e: DragEvent) {
    // Only clear when the pointer actually left the bar, not a child tab.
    const related = e.relatedTarget as Node | null;
    if (!related || !tabbar.value?.contains(related)) caretX.value = null;
}

function onDrop() {
    const to = dropIndex.value;
    if (draggingId.value === null || to === null || dragFrom < 0) return resetDrag();

    const next = [...tabs.value];
    const [moved] = next.splice(dragFrom, 1);
    // Removing the source shifts every later slot left by one.
    next.splice(to > dragFrom ? to - 1 : to, 0, moved);
    tabs.value = next;

    resetDrag();
}

function onDragEnd() {
    resetDrag();
}

function resetDrag() {
    draggingId.value = null;
    dropIndex.value = null;
    caretX.value = null;
    dragFrom = -1;
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
    position: relative;
}

/* Lets the tabs stay direct flex children of the bar while TransitionGroup
   wraps them for the move (FLIP) animation. */
.ct-taglist {
    display: contents;
}

/* ── Drag & drop ── */
.ct-caret {
    position: absolute;
    top: 3px;
    bottom: 3px;
    width: 2px;
    border-radius: 1px;
    background: #f97316;
    box-shadow: 0 0 6px rgba(249, 115, 22, 0.8);
    transition: left 120ms cubic-bezier(0.2, 0, 0, 1);
    pointer-events: none;
    z-index: 2;
}

.ct-tab--dragging {
    opacity: 0.35;
}

/* FLIP: TransitionGroup transforms each tab from its old box to its new one. */
.ct-move-move {
    transition: transform 220ms cubic-bezier(0.2, 0, 0, 1);
}

/* The clone handed to setDragImage — tilted and lifted off the bar. */
.ct-mirror {
    position: fixed;
    top: -1000px;
    left: -1000px;
    display: flex;
    align-items: center;
    gap: 6px;
    height: 26px;
    padding: 4px 8px;
    border-radius: 4px;
    font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
    background: #3a3d44;
    transform: rotate(-3deg);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    pointer-events: none;
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

.ct-hint {
    margin: 0;
    padding: 6px 12px 0;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.35);
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
