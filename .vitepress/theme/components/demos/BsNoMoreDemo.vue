<template>
    <DiscordFrame title="bsNoMore — clutter removal">
        <div class="bsn-demo">
            <!-- Left: DM Sidebar -->
            <div class="bsn-sidebar">
                <div class="sidebar-label">Direct Messages</div>

                <!-- Clutter items (Nitro, Shop) -->
                <div
                    class="clutter-item clutter-nitro"
                    :class="{ 'clutter-hidden': clean }"
                >
                    <span class="clutter-icon">✦</span>
                    <span class="clutter-name">Nitro</span>
                </div>
                <div
                    class="clutter-item clutter-shop"
                    :class="{ 'clutter-hidden': clean }"
                >
                    <span class="clutter-icon">🛒</span>
                    <span class="clutter-name">Shop</span>
                </div>

                <!-- DM list -->
                <div class="dm-list">
                    <div
                        v-for="dm in dms"
                        :key="dm.name"
                        class="dm-item"
                    >
                        <div class="dm-avatar" :style="{ background: dm.color }">
                            {{ dm.initials }}
                        </div>
                        <span class="dm-name">{{ dm.name }}</span>
                        <span
                            class="clan-tag"
                            :class="{ 'clan-tag--hidden': clean }"
                        >CLAN</span>
                    </div>
                </div>
            </div>

            <!-- Right: Content area -->
            <div class="bsn-content">
                <!-- Toggle -->
                <div class="toggle-row">
                    <button
                        class="toggle-switch"
                        :class="{ 'toggle-switch--on': clean }"
                        @click="clean = !clean"
                        :aria-pressed="clean"
                        role="switch"
                        aria-label="Toggle clean mode"
                    >
                        <span class="toggle-knob"></span>
                    </button>
                    <span class="toggle-label">{{ clean ? "Clean" : "Cluttered" }}</span>
                </div>

                <!-- Messages area -->
                <div class="messages-area">
                    <div
                        v-for="msg in messages"
                        :key="msg.id"
                        class="msg-row"
                    >
                        <div class="msg-avatar-wrap">
                            <div class="msg-avatar" :style="{ background: msg.color }"></div>
                            <span
                                class="avatar-deco"
                                :class="{ 'avatar-deco--hidden': clean }"
                                aria-hidden="true"
                            >❖</span>
                        </div>
                        <div class="msg-body">
                            <span class="msg-user">{{ msg.user }}</span>
                            <span class="msg-text">{{ msg.text }}</span>
                        </div>
                    </div>
                </div>

                <!-- Quest popup -->
                <div
                    class="quest-popup"
                    :class="{ 'quest-popup--hidden': clean }"
                    aria-hidden="true"
                >
                    <span class="quest-icon">🎮</span>
                    <div class="quest-text">
                        <div class="quest-title">New Quest Available!</div>
                        <div class="quest-sub">Complete 3 actions today</div>
                    </div>
                </div>
            </div>
        </div>
    </DiscordFrame>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DiscordFrame from "../showcase/DiscordFrame.vue";

const clean = ref(false);

const dms = [
    { name: "theo",       initials: "TH", color: "#5865f2" },
    { name: "alex",       initials: "AL", color: "#ed4245" },
    { name: "stream-bot", initials: "SB", color: "#57f287" },
    { name: "sam",        initials: "SA", color: "#fee75c" },
];

const messages = [
    { id: 1, user: "theo",       color: "#5865f2", text: "hey, you free for a call?" },
    { id: 2, user: "alex",       color: "#ed4245", text: "yeah gimme 5 mins" },
    { id: 3, user: "stream-bot", color: "#57f287", text: "stream goes live in 10 minutes" },
];
</script>

<style scoped>
.bsn-demo {
    display: flex;
    height: 320px;
    background: #313338;
    font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
    overflow: hidden;
    position: relative;
}

/* ── DM Sidebar ── */
.bsn-sidebar {
    width: 180px;
    background: #2b2d31;
    flex-shrink: 0;
    padding: 10px 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow: hidden;
}

.sidebar-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #949ba4;
    letter-spacing: 1px;
    padding: 0 4px 6px;
}

/* ── Clutter items ── */
.clutter-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 13px;
    cursor: default;
    max-height: 80px;
    overflow: hidden;
    opacity: 1;
    transition: max-height 150ms ease, opacity 150ms ease, padding 150ms ease, margin 150ms ease;
}

.clutter-item.clutter-hidden {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin: 0;
}

.clutter-nitro {
    color: #f47fff;
}

.clutter-shop {
    color: #5865f2;
}

.clutter-icon {
    font-size: 14px;
    flex-shrink: 0;
}

.clutter-name {
    font-size: 13px;
    font-weight: 500;
}

/* ── DM list ── */
.dm-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 4px;
}

.dm-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 6px;
    border-radius: 4px;
}

.dm-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    font-weight: 700;
    color: #fff;
}

.dm-name {
    font-size: 13px;
    color: #949ba4;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.clan-tag {
    font-size: 9px;
    font-weight: 700;
    background: #5865f2;
    color: #fff;
    padding: 1px 4px;
    border-radius: 2px;
    flex-shrink: 0;
    opacity: 1;
    transition: opacity 150ms ease;
}

.clan-tag--hidden {
    opacity: 0;
}

/* ── Content area ── */
.bsn-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 14px 16px 12px;
    position: relative;
    overflow: hidden;
}

/* ── Toggle ── */
.toggle-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
}

.toggle-switch {
    width: 40px;
    height: 24px;
    border-radius: 12px;
    background: #72767d;
    border: none;
    cursor: pointer;
    padding: 3px;
    position: relative;
    display: flex;
    align-items: center;
    transition: background 150ms ease;
    flex-shrink: 0;
}

.toggle-switch--on {
    background: #23a55a;
}

.toggle-knob {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    display: block;
    transform: translateX(0);
    transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
    flex-shrink: 0;
}

.toggle-switch--on .toggle-knob {
    transform: translateX(16px);
}

.toggle-label {
    font-size: 13px;
    font-weight: 500;
    color: #b5bac1;
}

/* ── Messages ── */
.messages-area {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
}

.msg-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.msg-avatar-wrap {
    position: relative;
    flex-shrink: 0;
}

.msg-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
}

.avatar-deco {
    position: absolute;
    bottom: -3px;
    right: -4px;
    font-size: 10px;
    color: #f47fff;
    line-height: 1;
    opacity: 1;
    transition: opacity 150ms ease;
}

.avatar-deco--hidden {
    opacity: 0;
}

.msg-body {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.msg-user {
    font-size: 13px;
    font-weight: 600;
    color: #c9cdfb;
}

.msg-text {
    font-size: 13px;
    color: #dbdee1;
    line-height: 1.4;
}

/* ── Quest popup ── */
.quest-popup {
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #2b2d31;
    border: 1px solid #3f4147;
    border-radius: 6px;
    padding: 8px 12px;
    opacity: 1;
    transform: translateY(0);
    transition: opacity 150ms ease, transform 150ms ease;
}

.quest-popup--hidden {
    opacity: 0;
    transform: translateY(8px);
    pointer-events: none;
}

.quest-icon {
    font-size: 16px;
    flex-shrink: 0;
}

.quest-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
}

.quest-title {
    font-size: 12px;
    font-weight: 600;
    color: #f2f3f5;
    white-space: nowrap;
}

.quest-sub {
    font-size: 10px;
    color: #949ba4;
}
</style>
