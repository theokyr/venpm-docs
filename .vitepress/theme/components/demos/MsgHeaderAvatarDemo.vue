<template>
    <DiscordFrame title="messageHeaderAvatar — avatar in message header">
        <div class="mha-demo">
            <!-- Control bar -->
            <div class="mha-controls">
                <div class="mha-control">
                    <label class="mha-label">Size: {{ avatarSize }}px</label>
                    <input
                        type="range"
                        class="mha-slider"
                        v-model.number="avatarSize"
                        min="12"
                        max="32"
                        step="1"
                    />
                </div>
                <div class="mha-control">
                    <span class="mha-label">Shape</span>
                    <div class="mha-toggle">
                        <button
                            class="mha-toggle-btn"
                            :class="{ 'mha-toggle-btn--active': shape === 'circle' }"
                            @click="shape = 'circle'"
                        >Circle</button>
                        <button
                            class="mha-toggle-btn"
                            :class="{ 'mha-toggle-btn--active': shape === 'square' }"
                            @click="shape = 'square'"
                        >Square</button>
                    </div>
                </div>
                <div class="mha-control">
                    <label class="mha-checkbox-label">
                        <input
                            type="checkbox"
                            v-model="hideConsecutive"
                            class="mha-checkbox"
                        />
                        <span class="mha-label">Hide consecutive</span>
                    </label>
                </div>
            </div>

            <!-- Message list -->
            <div class="mha-messages">
                <div
                    v-for="(msg, i) in messages"
                    :key="msg.id"
                    class="mha-row"
                >
                    <!-- Avatar or spacer -->
                    <div
                        v-if="!hideConsecutive || !isConsecutive(i)"
                        class="mha-avatar"
                        :style="{
                            width: avatarSize + 'px',
                            height: avatarSize + 'px',
                            borderRadius: shape === 'circle' ? '50%' : '4px',
                            background: msg.color,
                            flexShrink: '0',
                        }"
                    ></div>
                    <div
                        v-else
                        :style="{
                            width: avatarSize + 'px',
                            height: avatarSize + 'px',
                            flexShrink: '0',
                        }"
                    ></div>

                    <!-- Message body -->
                    <div class="mha-body">
                        <span
                            v-if="!hideConsecutive || !isConsecutive(i)"
                            class="mha-username"
                            :style="{ color: msg.color }"
                        >{{ msg.user }}</span>
                        <span class="mha-text">{{ msg.text }}</span>
                    </div>
                </div>
            </div>
        </div>
    </DiscordFrame>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DiscordFrame from "../showcase/DiscordFrame.vue";

const avatarSize = ref(20);
const shape = ref<"circle" | "square">("circle");
const hideConsecutive = ref(false);

interface Message {
    id: number;
    user: string;
    color: string;
    text: string;
}

const messages: Message[] = [
    { id: 1, user: "theo",  color: "#5865f2", text: "Hey everyone, just pushed the new update" },
    { id: 2, user: "theo",  color: "#5865f2", text: "Let me know if you run into any issues" },
    { id: 3, user: "alex",  color: "#ed4245", text: "Looks great! Testing now" },
    { id: 4, user: "sam",   color: "#57f287", text: "The new settings panel is really nice" },
    { id: 5, user: "sam",   color: "#57f287", text: "One small thing though..." },
];

function isConsecutive(i: number): boolean {
    if (i === 0) return false;
    return messages[i].user === messages[i - 1].user;
}
</script>

<style scoped>
.mha-demo {
    display: flex;
    flex-direction: column;
    background: #313338;
    height: 280px;
    font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
    overflow: hidden;
}

/* ── Controls ── */
.mha-controls {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 10px 16px;
    border-bottom: 1px solid #3f4147;
    flex-shrink: 0;
    flex-wrap: wrap;
}

.mha-control {
    display: flex;
    align-items: center;
    gap: 8px;
}

.mha-label {
    font-size: 12px;
    color: #949ba4;
    white-space: nowrap;
}

.mha-slider {
    width: 80px;
    height: 4px;
    accent-color: #5865f2;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    background: #3f4147;
    border-radius: 2px;
    outline: none;
}

.mha-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #5865f2;
    cursor: pointer;
}

.mha-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #5865f2;
    cursor: pointer;
    border: none;
}

.mha-toggle {
    display: flex;
    border-radius: 4px;
    overflow: hidden;
}

.mha-toggle-btn {
    padding: 3px 8px;
    font-size: 11px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    background: #1e1f22;
    color: #949ba4;
    transition: background 100ms ease, color 100ms ease;
}

.mha-toggle-btn--active {
    background: #5865f2;
    color: #fff;
}

.mha-checkbox-label {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
}

.mha-checkbox {
    accent-color: #5865f2;
    cursor: pointer;
    width: 14px;
    height: 14px;
    margin: 0;
}

/* ── Messages ── */
.mha-messages {
    display: flex;
    flex-direction: column;
    padding: 12px 16px;
    gap: 6px;
    overflow-y: auto;
}

.mha-row {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 8px;
}

.mha-avatar {
    transition: width 100ms ease, height 100ms ease, border-radius 100ms ease;
}

.mha-body {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 6px;
    flex-wrap: wrap;
}

.mha-username {
    font-size: 13px;
    font-weight: 500;
    flex-shrink: 0;
}

.mha-text {
    font-size: 14px;
    color: #dbdee1;
    line-height: 1.4;
}
</style>
