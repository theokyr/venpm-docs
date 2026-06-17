<template>
    <section :id="`plugin-${plugin.name}`" class="plugin-section">
        <h2 class="plugin-name">{{ plugin.label }}</h2>
        <p class="plugin-desc">{{ plugin.description }}</p>
        <FeaturePills :features="plugin.features ?? []" />
        <DiscordFrame v-if="hasDemo" :title="plugin.label">
            <slot />
        </DiscordFrame>
        <div v-if="plugin.attribution" class="plugin-attribution">
            <strong>Attribution:</strong>
            <span>{{ plugin.attribution.text }}</span>
            <a v-if="plugin.attribution.href" :href="plugin.attribution.href" target="_blank" rel="noreferrer">
                {{ plugin.attribution.label ?? "Upstream source" }}
            </a>
        </div>
        <p v-if="plugin.note" class="plugin-note">{{ plugin.note }}</p>
        <InstallButton :name="plugin.install" :source="plugin.source" />
    </section>
</template>

<script setup lang="ts">
import FeaturePills from "./FeaturePills.vue";
import DiscordFrame from "./DiscordFrame.vue";
import InstallButton from "./InstallButton.vue";

defineProps<{
    plugin: {
        name: string;
        label: string;
        description: string;
        features?: string[];
        install: string;
        source?: string;
        note?: string;
        attribution?: {
            text: string;
            href?: string;
            label?: string;
        };
    };
    hasDemo?: boolean;
}>();
</script>

<style scoped>
.plugin-section {
    padding: 64px 0;
    border-bottom: 1px solid var(--vp-border, #1c2b26);
}

.plugin-section:last-child {
    border-bottom: none;
}

.plugin-name {
    font-family: var(--vp-font-family-mono);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -1px;
    color: var(--vp-heading, #e8e8e8);
    margin: 0 0 8px;
    line-height: 1.15;
}

.plugin-desc {
    font-family: var(--vp-font-family-base);
    font-size: 15px;
    color: var(--vp-body, #94a3b8);
    margin: 0;
}

.plugin-note {
    font-size: 13px;
    color: var(--vp-muted, #4a5c56);
    margin-top: 12px;
    margin-bottom: 0;
}

.plugin-attribution {
    margin-top: 18px;
    padding: 12px 14px;
    border: 1px solid rgba(249, 115, 22, 0.34);
    border-radius: 8px;
    background: rgba(249, 115, 22, 0.08);
    color: var(--vp-body, #cbd5e1);
    font-size: 13px;
    line-height: 1.5;
}

.plugin-attribution strong {
    color: var(--vp-heading, #f8fafc);
    margin-right: 4px;
}

.plugin-attribution a {
    display: inline-block;
    margin-left: 8px;
    color: var(--vp-c-brand-1, #f97316);
    font-weight: 600;
}

/* Mobile: reduced section spacing */
@media (max-width: 767px) {
    .plugin-section {
        padding: 40px 0;
    }
}
</style>
