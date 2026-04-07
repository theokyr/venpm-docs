<template>
    <div class="discord-mock" ref="rootEl">
        <!-- Server list -->
        <div class="server-list">
            <div
                v-for="(server, i) in servers"
                :key="server.id"
                class="server-wrap"
                :class="{ entered: iconsEntered }"
                :style="{ transitionDelay: iconsEntered ? `${i * 30}ms` : '0ms' }"
            >
                <div
                    class="server-icon"
                    :class="{
                        active: activeServer === server.id,
                        flash: flashServer === server.id,
                    }"
                    :style="{ background: server.color }"
                    @click="activateServer(server.id)"
                    :title="server.name"
                >
                    {{ server.initial }}
                    <span class="keycap">{{ i + 1 }}</span>
                </div>
            </div>
            <div class="server-divider"></div>
        </div>

        <!-- Channel list -->
        <div class="channel-list">
            <div class="guild-name">{{ activeServerData?.name }}</div>
            <div class="channel-section-label">TEXT CHANNELS</div>
            <div
                v-for="ch in activeChannels"
                :key="ch"
                class="channel-item"
                :class="{ active: ch === activeChannel }"
                @click="activeChannel = ch"
            >
                <span class="channel-hash">#</span>{{ ch }}
            </div>
        </div>

        <!-- Content area -->
        <div class="content-area">
            <div class="content-inner">
                <div class="try-it-label">TRY IT</div>
                <p class="try-it-desc">
                    Press
                    <span class="keycap-inline">1</span>–<span class="keycap-inline">5</span>
                    to jump between servers, or click any server icon.
                </p>
                <p class="try-it-desc">
                    In the real plugin, modifier layers (<span class="keycap-inline">Alt</span>,
                    <span class="keycap-inline">Ctrl</span>) give you channel, DM, and settings navigation.
                </p>
                <div class="active-indicator">
                    <span class="active-dot" :style="{ background: activeServerData?.color }"></span>
                    <span class="active-name" :style="{ color: activeServerData?.color }">
                        {{ activeServerData?.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const rootEl = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const iconsEntered = ref(false);
const activeServer = ref("gaming");
const flashServer = ref<string | null>(null);
const activeChannel = ref("general");

const servers = [
    { id: "gaming",  name: "Gaming",   initial: "G", color: "#ed4245" },
    { id: "dev",     name: "Dev Hub",  initial: "D", color: "#5865f2" },
    { id: "music",   name: "Music",    initial: "M", color: "#57f287" },
    { id: "design",  name: "Design",   initial: "D", color: "#fee75c" },
    { id: "stream",  name: "Stream",   initial: "S", color: "#eb459e" },
];

const channelMap: Record<string, string[]> = {
    gaming:  ["general", "lfg", "clips", "memes"],
    dev:     ["general", "help", "showcase", "off-topic"],
    music:   ["general", "recs", "listening", "bots"],
    design:  ["general", "resources", "feedback", "inspo"],
    stream:  ["general", "schedule", "clips", "vods"],
};

const activeServerData = computed(() => servers.find(s => s.id === activeServer.value) ?? null);
const activeChannels = computed(() => channelMap[activeServer.value] ?? []);

function activateServer(id: string) {
    if (flashServer.value) return; // debounce
    activeServer.value = id;
    activeChannel.value = channelMap[id]?.[0] ?? "general";
    flashServer.value = id;
    setTimeout(() => { flashServer.value = null; }, 1500);
}

function onKeyDown(e: KeyboardEvent) {
    if (!isVisible.value) return;
    // Don't fire inside input elements
    const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea" || (e.target as HTMLElement)?.isContentEditable) return;

    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= 5) {
        e.preventDefault();
        activateServer(servers[n - 1].id);
    }
}

let observer: IntersectionObserver | null = null;

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            isVisible.value = entry.isIntersecting;
            if (entry.isIntersecting && !iconsEntered.value) {
                iconsEntered.value = true;
            }
        },
        { threshold: 0.3 }
    );
    if (rootEl.value) observer.observe(rootEl.value);

    window.addEventListener("keydown", onKeyDown);
});

onUnmounted(() => {
    observer?.disconnect();
    window.removeEventListener("keydown", onKeyDown);
});
</script>

<style scoped>
.discord-mock {
    display: flex;
    height: 300px;
    background: #313338;
    overflow: hidden;
}

/* ── Server list ── */
.server-list {
    width: 72px;
    background: #1e1f22;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    gap: 8px;
    flex-shrink: 0;
}

.server-wrap {
    transform: scale(0);
    opacity: 0;
    transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 150ms ease-out;
}

.server-wrap.entered {
    transform: scale(1);
    opacity: 1;
}

.server-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    color: rgba(0,0,0,0.7);
    cursor: pointer;
    position: relative;
    transition: border-radius 150ms ease, box-shadow 150ms ease;
    user-select: none;
}

.server-icon.active {
    border-radius: 14px;
}

.server-icon.flash {
    animation: server-flash 1.5s ease-out forwards;
}

@keyframes server-flash {
    0%   { box-shadow: 0 0 0 2px #5865f2; background-blend-mode: normal; }
    20%  { box-shadow: 0 0 0 3px #5865f2, 0 0 12px rgba(88,101,242,0.4); }
    100% { box-shadow: 0 0 0 0px transparent; }
}

/* keycap badge on server icon */
.keycap {
    position: absolute;
    top: -4px;
    right: -4px;
    height: 16px;
    min-width: 16px;
    padding: 0 3px;
    background: #2b2d31;
    border: 1px solid #4f545c;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 600;
    font-family: 'gg mono', 'Source Code Pro', Consolas, monospace;
    color: #dbdee1;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.server-divider {
    width: 32px;
    height: 2px;
    border-radius: 1px;
    background: rgba(255,255,255,0.08);
    margin-top: 4px;
}

/* ── Channel list ── */
.channel-list {
    width: 200px;
    background: #2b2d31;
    padding: 12px 8px;
    flex-shrink: 0;
    overflow-y: auto;
}

.guild-name {
    font-size: 14px;
    font-weight: 700;
    color: #f2f3f5;
    padding: 0 8px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 10px;
    font-family: 'JetBrains Mono', monospace;
}

.channel-section-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #949ba4;
    text-transform: uppercase;
    padding: 0 8px;
    margin-bottom: 4px;
    font-family: 'JetBrains Mono', monospace;
}

.channel-item {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 13px;
    color: #949ba4;
    cursor: pointer;
    transition: background 100ms ease, color 100ms ease;
}

.channel-item:hover,
.channel-item.active {
    background: rgba(255,255,255,0.08);
    color: #dbdee1;
}

.channel-hash {
    font-size: 15px;
    color: #4f545c;
    font-weight: 700;
    flex-shrink: 0;
}

/* ── Content area ── */
.content-area {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}

.content-inner {
    max-width: 240px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.try-it-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #f97316;
}

.try-it-desc {
    font-size: 12px;
    color: #949ba4;
    line-height: 1.5;
    margin: 0;
}

.keycap-inline {
    display: inline-flex;
    align-items: center;
    height: 20px;
    padding: 0 5px;
    background: #2b2d31;
    border: 1px solid #4f545c;
    border-radius: 3px;
    font-size: 11px;
    font-weight: 600;
    font-family: 'gg mono', 'Source Code Pro', Consolas, monospace;
    color: #dbdee1;
    vertical-align: middle;
    line-height: 1;
}

.active-indicator {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 4px;
    padding: 6px 12px;
    background: rgba(255,255,255,0.04);
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.06);
}

.active-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    transition: background 150ms ease;
}

.active-name {
    font-size: 12px;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    transition: color 150ms ease;
}
</style>
