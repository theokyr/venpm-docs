<template>
    <div class="discord-mock">
        <!-- Server list -->
        <div class="server-list">
            <div class="server-icon active">vc</div>
            <div class="server-icon">gc</div>
            <div class="server-icon">mg</div>
        </div>

        <!-- Main area -->
        <div class="discord-main">
            <!-- Compact call bar -->
            <div
                class="call-bar"
                :class="{ entered: barEntered, expanded: expanded }"
                @click="toggleExpanded"
            >
                <div class="call-bar-inner">
                    <div class="status-row">
                        <span class="status-dot"></span>
                        <span class="call-label">Voice Connected</span>
                        <div class="avatars">
                            <div
                                v-for="(av, i) in avatars"
                                :key="i"
                                class="avatar"
                                :style="{
                                    background: av.color,
                                    transitionDelay: barEntered ? `${i * 40}ms` : '0ms',
                                }"
                                :class="{ 'avatar-entered': barEntered }"
                            ></div>
                        </div>
                        <span class="timer">{{ timerText }}</span>
                        <span class="ping">24ms</span>

                        <button
                            class="ctrl-btn"
                            :class="{ active: muted }"
                            @click.stop="muted = !muted"
                            title="Mute"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path v-if="!muted" d="M12 2a5 5 0 0 1 5 5v5a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5zm-7 9a7 7 0 0 0 14 0h2a9 9 0 0 1-8 8.94V22h-2v-2.06A9 9 0 0 1 3 11h2z"/>
                                <path v-else d="M19 11a7 7 0 0 1-14 0h2a5 5 0 0 0 10 0h2zm-7 9a9 9 0 0 0 8-8.94V13h-2a7 7 0 0 1-14 0H2v-2a9 9 0 0 0 8 8.94V22h2v-2zM5.27 3.86L3.86 5.27 18.73 20.14l1.41-1.41L5.27 3.86zM12 2a5 5 0 0 1 5 5v.18L8.18 15A5 5 0 0 1 7 12V7a5 5 0 0 1 5-5z"/>
                            </svg>
                        </button>

                        <button
                            class="ctrl-btn"
                            :class="{ active: deafened }"
                            @click.stop="deafened = !deafened"
                            title="Deafen"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path v-if="!deafened" d="M12 2C6.48 2 2 6.48 2 12v4c0 1.1.9 2 2 2h1c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2h-1c0-3.87 3.13-7 7-7s7 3.13 7 7h-1c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h1c1.1 0 2-.9 2-2v-4c0-5.52-4.48-10-10-10z"/>
                                <path v-else d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                            </svg>
                        </button>

                        <svg class="expand-chevron" :class="{ rotated: expanded }" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10l5 5 5-5H7z"/>
                        </svg>
                    </div>

                    <!-- Expanded participant list -->
                    <div class="expanded-content" :class="{ visible: expanded }">
                        <div class="participant-list">
                            <div v-for="p in participants" :key="p.name" class="participant-row">
                                <div class="participant-avatar" :style="{ background: p.color }"></div>
                                <span class="participant-name">{{ p.name }}</span>
                                <svg v-if="p.speaking" width="12" height="12" viewBox="0 0 24 24" fill="#23a55a">
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Channel list + content -->
            <div class="lower-area">
                <div class="channel-list">
                    <div class="channel-section-label">TEXT CHANNELS</div>
                    <div class="channel-item active">
                        <span class="channel-hash">#</span> general
                    </div>
                    <div class="channel-item">
                        <span class="channel-hash">#</span> off-topic
                    </div>
                    <div class="channel-item">
                        <span class="channel-hash">#</span> media
                    </div>
                    <div class="channel-section-label" style="margin-top:12px">VOICE CHANNELS</div>
                    <div class="channel-item voice connected">
                        <span class="voice-icon">🔊</span> Lounge
                        <span class="in-vc-badge">3</span>
                    </div>
                </div>

                <div class="chat-area">
                    <div class="chat-header">
                        <span class="chat-header-hash">#</span>
                        <span class="chat-header-name">general</span>
                    </div>
                    <div class="messages">
                        <div class="message" v-for="msg in messages" :key="msg.id">
                            <div class="msg-avatar" :style="{ background: msg.color }"></div>
                            <div class="msg-body">
                                <div class="msg-header">
                                    <span class="msg-author">{{ msg.author }}</span>
                                    <span class="msg-time">Today at {{ msg.time }}</span>
                                </div>
                                <div class="msg-text">{{ msg.text }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="hint-text">Click the call bar to expand — try mute/deafen too</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const barEntered = ref(false);
const expanded = ref(false);
const muted = ref(false);
const deafened = ref(false);
const seconds = ref(0);

const avatars = [
    { color: "#5865f2" },
    { color: "#ed4245" },
    { color: "#57f287" },
];

const participants = [
    { name: "kamaras", color: "#5865f2", speaking: true },
    { name: "alice",   color: "#ed4245", speaking: false },
    { name: "dave",    color: "#57f287", speaking: false },
];

const messages = [
    { id: 1, author: "kamaras", color: "#5865f2", time: "2:14 PM", text: "gg everyone, that was a clean win" },
    { id: 2, author: "alice",   color: "#ed4245", time: "2:15 PM", text: "agreed! one more round?" },
    { id: 3, author: "dave",    color: "#57f287", time: "2:15 PM", text: "always 👀" },
];

const timerText = computed(() => {
    const m = Math.floor(seconds.value / 60);
    const s = seconds.value % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
});

function toggleExpanded() {
    expanded.value = !expanded.value;
}

let timer: ReturnType<typeof setInterval>;

onMounted(() => {
    // Trigger entrance animation on next tick
    requestAnimationFrame(() => {
        setTimeout(() => { barEntered.value = true; }, 50);
    });
    timer = setInterval(() => { seconds.value++; }, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<style scoped>
.discord-mock {
    display: flex;
    height: 340px;
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

.server-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #313338;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    color: #949ba4;
    cursor: pointer;
    transition: border-radius 150ms ease, background 150ms ease;
}

.server-icon.active {
    border-radius: 14px;
    background: #5865f2;
    color: #fff;
}

/* ── Main area (call bar + lower) ── */
.discord-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* ── Call bar ── */
.call-bar {
    flex-shrink: 0;
    transform: translateY(-8px);
    opacity: 0;
    transition: transform 250ms ease-out, opacity 250ms ease-out;
    cursor: pointer;
    user-select: none;
}

.call-bar.entered {
    transform: translateY(0);
    opacity: 1;
}

.call-bar-inner {
    background: rgba(35, 165, 90, 0.12);
    border-bottom: 1px solid rgba(35, 165, 90, 0.2);
    padding: 0 12px;
    min-height: 32px;
}

.status-row {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 32px;
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #23a55a;
    flex-shrink: 0;
    animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.call-label {
    font-size: 11px;
    font-weight: 600;
    color: #23a55a;
    font-family: 'JetBrains Mono', monospace;
    flex-shrink: 0;
}

.avatars {
    display: flex;
    align-items: center;
    margin-left: 4px;
}

.avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #313338;
    margin-left: -4px;
    flex-shrink: 0;
    transform: scale(0);
    opacity: 0;
    transition: transform 150ms ease-out, opacity 150ms ease-out;
}

.avatar:first-child {
    margin-left: 0;
}

.avatar.avatar-entered {
    transform: scale(1);
    opacity: 1;
}

.timer {
    font-size: 11px;
    color: #23a55a;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 500;
    margin-left: 4px;
}

.ping {
    font-size: 10px;
    color: #23a55a;
    font-family: 'JetBrains Mono', monospace;
    margin-left: 2px;
    opacity: 0.7;
}

.ctrl-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: none;
    background: transparent;
    color: #949ba4;
    cursor: pointer;
    padding: 0;
    transition: background 100ms ease, color 100ms ease;
    flex-shrink: 0;
}

.ctrl-btn:hover {
    background: rgba(255,255,255,0.08);
    color: #e0e0e0;
}

.ctrl-btn.active {
    color: #ed4245;
}

.expand-chevron {
    margin-left: auto;
    color: #949ba4;
    transition: transform 150ms ease;
    flex-shrink: 0;
}

.expand-chevron.rotated {
    transform: rotate(180deg);
}

/* ── Expanded content ── */
.expanded-content {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 250ms ease-out, opacity 250ms ease-out;
}

.expanded-content.visible {
    max-height: 60px;
    opacity: 1;
}

.participant-list {
    display: flex;
    gap: 16px;
    padding: 6px 0 8px;
}

.participant-row {
    display: flex;
    align-items: center;
    gap: 5px;
}

.participant-avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    flex-shrink: 0;
}

.participant-name {
    font-size: 11px;
    color: #dbdee1;
    font-family: 'JetBrains Mono', monospace;
}

/* ── Lower area (channel list + chat) ── */
.lower-area {
    flex: 1;
    display: flex;
    overflow: hidden;
}

.channel-list {
    width: 200px;
    background: #2b2d31;
    padding: 12px 8px;
    flex-shrink: 0;
    overflow-y: auto;
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

.channel-item.voice.connected {
    color: #23a55a;
}

.voice-icon {
    font-size: 12px;
    flex-shrink: 0;
}

.in-vc-badge {
    margin-left: auto;
    font-size: 10px;
    background: rgba(35,165,90,0.15);
    color: #23a55a;
    padding: 1px 5px;
    border-radius: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
}

/* ── Chat area ── */
.chat-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chat-header {
    height: 48px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 8px;
    flex-shrink: 0;
}

.chat-header-hash {
    font-size: 20px;
    font-weight: 700;
    color: #4f545c;
    line-height: 1;
}

.chat-header-name {
    font-size: 15px;
    font-weight: 600;
    color: #dbdee1;
}

.messages {
    flex: 1;
    padding: 12px 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.message {
    display: flex;
    gap: 12px;
    align-items: flex-start;
}

.msg-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    flex-shrink: 0;
}

.msg-body {
    flex: 1;
}

.msg-header {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 3px;
}

.msg-author {
    font-size: 13px;
    font-weight: 600;
    color: #c9cdfb;
}

.msg-time {
    font-size: 10px;
    color: #4f545c;
}

.msg-text {
    font-size: 13px;
    color: #dbdee1;
    line-height: 1.4;
}

.hint-text {
    padding: 6px 16px 8px;
    font-size: 10px;
    color: #4a5c56;
    font-family: 'JetBrains Mono', monospace;
    font-style: italic;
    flex-shrink: 0;
}
</style>
