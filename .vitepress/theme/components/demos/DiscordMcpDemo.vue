<template>
    <DiscordFrame title="discordMcp — permission bridge">
        <div class="mcp-demo" ref="demoEl">
            <!-- Flow diagram -->
            <div class="flow-row">
                <!-- Claude box -->
                <div
                    class="flow-box"
                    :class="{
                        'flow-box--active': step === 2 || step === 4,
                        'flow-box--idle': step === 0 || step === 1,
                    }"
                >
                    <div class="flow-box-label">Claude</div>
                    <div class="flow-box-sub">MCP client</div>
                </div>

                <!-- Right arrow -->
                <div class="flow-arrow" :class="{ 'flow-arrow--active': step === 2 }">
                    <div class="arrow-line"></div>
                    <span class="arrow-head">→</span>
                    <div class="arrow-label">{{ step === 2 ? 'send_message' : 'tool call' }}</div>
                </div>

                <!-- Permission box -->
                <div
                    class="flow-box flow-box--permission"
                    :class="{
                        'flow-box--prompt': step === 3,
                        'flow-box--approved': step === 3 && approvedFlash,
                        'flow-box--idle': step === 0 || step === 1,
                    }"
                >
                    <div class="permission-inner">
                        <div v-if="step < 3 || (step === 3 && !approvedFlash)" class="permission-top">
                            <div class="flow-box-label">Permission</div>
                            <div class="flow-box-sub">prompt</div>
                        </div>
                        <div v-if="step === 3 && !approvedFlash" class="permission-buttons">
                            <button class="btn-deny">Deny</button>
                            <button class="btn-allow" :class="{ 'btn-allow--flash': step === 3 && !approvedFlash }">Allow</button>
                        </div>
                        <div v-if="step === 3 && approvedFlash" class="permission-approved">
                            <span class="approved-check">✓</span>
                            <span class="approved-label">Approved</span>
                        </div>
                    </div>
                </div>

                <!-- Left arrow -->
                <div class="flow-arrow flow-arrow--reverse" :class="{ 'flow-arrow--active': step === 4 }">
                    <span class="arrow-head">←</span>
                    <div class="arrow-line"></div>
                    <div class="arrow-label arrow-label--mono">{{ step === 4 ? '{ id: 1234... }' : 'result' }}</div>
                </div>
            </div>

            <!-- Status label -->
            <div class="flow-status">{{ statusLabels[step] }}</div>
        </div>
    </DiscordFrame>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import DiscordFrame from "../showcase/DiscordFrame.vue";

const demoEl = ref<HTMLElement | null>(null);
const step = ref(0);
const approvedFlash = ref(false);
let timeoutId: ReturnType<typeof setTimeout> | null = null;
let observer: IntersectionObserver | null = null;
let running = false;

const statusLabels = [
    "Waiting...",
    "Sending request...",
    "Permission prompt",
    "Approved!",
    "Result received",
];

// Durations per step before advancing
const durations = [1500, 800, 1200, 600, 1200];

function runStep(s: number) {
    if (!running) return;
    step.value = s;
    approvedFlash.value = false;

    if (s === 3) {
        // After 600ms show approved flash within the prompt step
        timeoutId = setTimeout(() => {
            if (!running) return;
            approvedFlash.value = true;
            timeoutId = setTimeout(() => {
                advanceFrom(s);
            }, durations[s]);
        }, 600);
    } else {
        timeoutId = setTimeout(() => {
            advanceFrom(s);
        }, durations[s]);
    }
}

function advanceFrom(s: number) {
    const next = (s + 1) % statusLabels.length;
    runStep(next);
}

function startLoop() {
    if (running) return;
    running = true;
    runStep(0);
}

function stopLoop() {
    running = false;
    if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
}

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            const visible = entries[0]?.isIntersecting;
            if (visible) {
                startLoop();
            } else {
                stopLoop();
            }
        },
        { threshold: 0.3 }
    );

    if (demoEl.value) {
        observer.observe(demoEl.value);
    }
});

onUnmounted(() => {
    stopLoop();
    observer?.disconnect();
});
</script>

<style scoped>
.mcp-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 280px;
    background: #313338;
    font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
    gap: 20px;
}

/* ── Flow row ── */
.flow-row {
    display: flex;
    align-items: center;
    gap: 0;
}

/* ── Flow boxes ── */
.flow-box {
    min-width: 80px;
    padding: 12px 16px;
    border-radius: 6px;
    border: 1px solid #3f4147;
    background: #2b2d31;
    text-align: center;
    transition: border-color 250ms ease, background 250ms ease;
}

.flow-box--idle {
    opacity: 0.5;
    transition: opacity 250ms ease, border-color 250ms ease, background 250ms ease;
}

.flow-box--active {
    opacity: 1;
    border-color: #5865f2;
    background: rgba(88, 101, 242, 0.1);
    transition: border-color 250ms ease, background 250ms ease, opacity 250ms ease;
}

.flow-box--permission {
    min-width: 100px;
}

.flow-box--prompt {
    opacity: 1;
    border-color: #fee75c;
    background: rgba(254, 231, 92, 0.06);
}

.flow-box--approved {
    border-color: #57f287 !important;
    background: rgba(87, 242, 135, 0.06) !important;
}

.flow-box-label {
    font-size: 13px;
    font-weight: 700;
    color: #f2f3f5;
    line-height: 1.3;
}

.flow-box-sub {
    font-size: 10px;
    color: #949ba4;
    margin-top: 2px;
}

/* ── Permission inner ── */
.permission-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.permission-top {
    text-align: center;
}

.permission-buttons {
    display: flex;
    gap: 6px;
    animation: prompt-enter 250ms ease-out both;
}

@keyframes prompt-enter {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.btn-deny,
.btn-allow {
    font-size: 10px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 3px;
    border: none;
    cursor: default;
    font-family: inherit;
}

.btn-deny {
    background: rgba(255, 255, 255, 0.08);
    color: #b5bac1;
}

.btn-allow {
    background: #5865f2;
    color: #fff;
}

.btn-allow--flash {
    animation: allow-flash 600ms ease infinite;
}

@keyframes allow-flash {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}

.permission-approved {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    animation: prompt-enter 250ms ease-out both;
}

.approved-check {
    font-size: 18px;
    color: #57f287;
    line-height: 1;
}

.approved-label {
    font-size: 10px;
    color: #57f287;
    font-weight: 600;
}

/* ── Arrows ── */
.flow-arrow {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 4px;
    opacity: 0.3;
    transition: opacity 250ms ease;
    position: relative;
    padding: 0 4px;
}

.flow-arrow--active {
    opacity: 1;
}

.flow-arrow--reverse {
    flex-direction: column;
}

.arrow-line {
    width: 40px;
    height: 2px;
    background: #5865f2;
}

.arrow-head {
    font-size: 14px;
    color: #5865f2;
    line-height: 1;
}

.arrow-label {
    font-size: 9px;
    color: #949ba4;
    white-space: nowrap;
}

.arrow-label--mono {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px;
}

/* ── Status label ── */
.flow-status {
    font-size: 11px;
    color: #949ba4;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.3px;
    height: 16px;
    text-align: center;
}
</style>
