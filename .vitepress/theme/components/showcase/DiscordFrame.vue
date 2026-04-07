<template>
    <div class="discord-frame">
        <div class="discord-frame-titlebar">
            <div class="discord-frame-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
            </div>
            <span class="discord-frame-title">{{ title }}</span>
            <div class="discord-frame-dots discord-frame-dots-mirror" aria-hidden="true">
                <span class="dot dot-invisible"></span>
                <span class="dot dot-invisible"></span>
                <span class="dot dot-invisible"></span>
            </div>
        </div>
        <div class="discord-frame-body">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), {
    title: "Discord",
});
</script>

<style scoped>
.discord-frame {
    background: #0b0f0e;
    border: 1px solid #2a4038;
    border-radius: 6px;
    overflow: hidden;
}

.discord-frame-titlebar {
    background: #141c1a;
    border-bottom: 1px solid #1c2b26;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.discord-frame-dots {
    display: flex;
    align-items: center;
    gap: 6px;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
}

.dot-red { background: #ef4444; }
.dot-yellow { background: #fbbf24; }
.dot-green { background: #34d399; }
.dot-invisible { background: transparent; }

.discord-frame-title {
    font-size: 11px;
    color: var(--vp-muted, #4a5c56);
    font-family: var(--vp-font-family-mono);
    letter-spacing: 0.5px;
}

.discord-frame-body {
    min-height: 200px;
}
</style>
