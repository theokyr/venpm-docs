<template>
    <div class="br-demo">
        <div class="br-preview">
            <div class="br-screen">
                <div class="br-live">LIVE</div>
                <div class="br-grid"></div>
            </div>
            <div class="br-selected">
                <strong>{{ selected.resolution }}</strong>
                <span>{{ selected.fps }} fps</span>
            </div>
        </div>

        <div class="br-panel">
            <div class="br-inputs">
                <label>
                    extra resolutions
                    <input v-model="resolutionText" />
                </label>
                <label>
                    extra FPS
                    <input v-model="fpsText" />
                </label>
            </div>

            <div class="br-options">
                <button
                    v-for="preset in presets"
                    :key="preset.resolution + preset.fps"
                    type="button"
                    class="br-option"
                    :class="{ active: selected === preset, custom: preset.custom }"
                    :aria-pressed="selected === preset"
                    @click="selected = preset"
                >
                    <span>{{ preset.resolution }}</span>
                    <small>{{ preset.fps }} fps</small>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

interface Preset {
    resolution: string;
    fps: number;
    custom?: boolean;
}

const resolutionText = ref("144,240,360");
const fpsText = ref("5,10,24,48");

const basePresets: Preset[] = [
    { resolution: "Source", fps: 60 },
    { resolution: "1080p", fps: 60 },
    { resolution: "720p", fps: 30 },
    { resolution: "480p", fps: 15 },
];

function parseNumbers(value: string): number[] {
    return value
        .split(",")
        .map(part => Number(part.trim()))
        .filter(part => Number.isFinite(part) && part > 0)
        .slice(0, 4);
}

const presets = computed<Preset[]>(() => {
    const resolutions = parseNumbers(resolutionText.value);
    const fpsValues = parseNumbers(fpsText.value);
    const custom = resolutions.flatMap(resolution =>
        fpsValues.slice(0, 2).map(fps => ({ resolution: `${resolution}p`, fps, custom: true }))
    );

    return [...basePresets, ...custom].slice(0, 10);
});

const selected = ref<Preset>(basePresets[1]);

watchEffect(() => {
    if (!presets.value.includes(selected.value)) {
        selected.value = presets.value[0];
    }
});
</script>

<style scoped>
.br-demo {
    display: grid;
    grid-template-columns: 1fr 260px;
    height: 320px;
    background: #313338;
    color: #dbdee1;
    font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
    overflow: hidden;
}

.br-preview {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 14px;
    padding: 18px;
    background: #232428;
}

.br-screen {
    position: relative;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    overflow: hidden;
    background: linear-gradient(135deg, #5865f2, #23a55a);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
}

.br-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
    background-size: 24px 24px;
}

.br-live {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    border-radius: 4px;
    background: #ed4245;
    color: #fff;
    font-weight: 700;
    font-size: 11px;
    padding: 3px 7px;
}

.br-selected {
    display: flex;
    align-items: baseline;
    gap: 8px;
}

.br-selected strong {
    font-size: 26px;
    color: #f2f3f5;
}

.br-selected span {
    color: #949ba4;
}

.br-panel {
    padding: 12px;
    background: #2b2d31;
    border-left: 1px solid #3f4147;
    overflow: hidden;
}

.br-inputs {
    display: grid;
    gap: 8px;
    margin-bottom: 10px;
}

.br-inputs label {
    display: grid;
    gap: 4px;
    color: #949ba4;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.br-inputs input {
    border: 1px solid #3f4147;
    border-radius: 4px;
    background: #1e1f22;
    color: #dbdee1;
    padding: 6px 8px;
    font: inherit;
    font-size: 12px;
}

.br-options {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
}

.br-option {
    min-width: 0;
    border: 1px solid #3f4147;
    border-radius: 5px;
    background: #1e1f22;
    color: #dbdee1;
    padding: 8px;
    text-align: left;
    cursor: pointer;
    font: inherit;
}

.br-option span,
.br-option small {
    display: block;
}

.br-option span {
    font-weight: 700;
    font-size: 13px;
}

.br-option small {
    color: #949ba4;
    font-size: 11px;
}

.br-option.custom {
    border-color: rgba(87, 242, 135, 0.25);
}

.br-option.active {
    border-color: #5865f2;
    background: rgba(88, 101, 242, 0.22);
}

@media (max-width: 680px) {
    .br-demo {
        grid-template-columns: 1fr;
        height: auto;
    }

    .br-panel {
        border-left: 0;
        border-top: 1px solid #3f4147;
    }
}
</style>
