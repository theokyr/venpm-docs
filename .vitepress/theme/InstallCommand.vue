<script setup>
import { ref } from 'vue'

const copied = ref(false)
const command = 'npm install -g @kamaras/venpm'

function copy() {
    navigator.clipboard.writeText(command)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
    <section class="install-section">
        <div class="install-container">
            <p class="install-label">Get started in seconds</p>
            <div class="install-command" @click="copy" role="button" tabindex="0" @keydown.enter="copy">
                <span class="install-prompt">$</span>
                <code class="install-code">{{ command }}</code>
                <span class="install-copy" :class="{ copied }">
                    <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </span>
            </div>
            <p class="install-hint">Then run <code>venpm install &lt;plugin&gt;</code> to add your first plugin.</p>
        </div>
    </section>
</template>

<style scoped>
.install-section {
    padding: 32px 24px 64px;
    display: flex;
    justify-content: center;
}

.install-container {
    text-align: center;
    max-width: 600px;
    width: 100%;
}

.install-label {
    font-family: var(--vp-font-family-mono);
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.5px;
    color: var(--vp-c-text-1);
    margin-bottom: 16px;
}

.install-command {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: #141c1a;
    border: 1px solid #1c2b26;
    border-radius: 12px;
    cursor: pointer;
    transition: border-color 0.2s, background-color 0.2s;
    user-select: none;
}

.install-command:hover {
    border-color: var(--vp-amber);
    background: #1a2420;
}

.install-command:focus-visible {
    outline: 2px solid var(--vp-amber);
    outline-offset: 2px;
}

.install-prompt {
    font-family: var(--vp-font-family-mono);
    font-weight: 700;
    font-size: 16px;
    color: var(--vp-amber);
    flex-shrink: 0;
}

.install-code {
    font-family: var(--vp-font-family-mono);
    font-weight: 500;
    font-size: 16px;
    color: var(--vp-c-text-1);
    flex: 1;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.install-copy {
    flex-shrink: 0;
    color: var(--vp-c-text-3);
    transition: color 0.2s;
    display: flex;
    align-items: center;
}

.install-command:hover .install-copy {
    color: var(--vp-c-text-2);
}

.install-copy.copied {
    color: var(--vp-emerald);
}

.install-hint {
    margin-top: 14px;
    font-size: 14px;
    color: var(--vp-c-text-3);
}

.install-hint code {
    font-family: var(--vp-font-family-mono);
    font-size: 13px;
    color: var(--vp-c-text-2);
    background: #141c1a;
    padding: 2px 6px;
    border-radius: 4px;
}

@media (max-width: 640px) {
    .install-code {
        font-size: 14px;
    }

    .install-prompt {
        font-size: 14px;
    }
}
</style>
