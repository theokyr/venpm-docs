<template>
    <div class="install-row">
        <button
            class="install-btn"
            :class="{ copied }"
            @click="copyInstall"
            :title="`Copy: venpm install ${name}`"
        >
            <span class="install-prompt">$</span>
            <code class="install-code">venpm install {{ name }}</code>
            <span class="install-status">{{ copied ? "✓" : "" }}</span>
        </button>
        <a
            v-if="source"
            :href="source"
            target="_blank"
            rel="noopener noreferrer"
            class="install-source-link"
        >Source ↗</a>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(defineProps<{ name: string; source?: string }>(), {
    source: "",
});

const copied = ref(false);
let copyTimer: ReturnType<typeof setTimeout> | null = null;

async function copyInstall() {
    await navigator.clipboard.writeText(`venpm install ${props.name}`);
    copied.value = true;
    if (copyTimer) clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
        copied.value = false;
    }, 2000);
}
</script>

<style scoped>
.install-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
}

.install-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--vp-surface, #141c1a);
    border: 1px solid var(--vp-border, #1c2b26);
    border-radius: 6px;
    padding: 6px 12px;
    cursor: pointer;
    transition: border-color 0.15s;
    color: inherit;
    font-family: inherit;
}

.install-btn:hover {
    border-color: var(--vp-amber, #f97316);
}

.install-btn.copied {
    border-color: var(--vp-emerald, #34d399);
}

.install-prompt {
    color: var(--vp-amber, #f97316);
    font-weight: 700;
    font-family: var(--vp-font-family-mono);
    font-size: 13px;
}

.install-code {
    font-family: var(--vp-font-family-mono);
    font-size: 13px;
    color: var(--vp-heading, #e8e8e8);
    background: none;
    border: none;
    padding: 0;
}

.install-status {
    min-width: 12px;
    font-size: 12px;
    color: var(--vp-emerald, #34d399);
}

.install-source-link {
    font-family: var(--vp-font-family-mono);
    font-size: 12px;
    color: var(--vp-muted, #4a5c56);
    text-decoration: none;
    transition: color 0.15s;
}

.install-source-link:hover {
    color: var(--vp-body, #94a3b8);
}
</style>
