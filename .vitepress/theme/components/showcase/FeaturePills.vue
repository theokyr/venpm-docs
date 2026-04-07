<template>
    <div class="feature-pills">
        <span
            v-for="feature in features"
            :key="feature"
            class="feature-pill"
        >{{ feature }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{ features: string[] }>();
</script>

<style scoped>
.feature-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 12px 0;
}

.feature-pill {
    font-family: var(--vp-font-family-mono);
    font-size: 11px;
    color: var(--vp-amber, #f97316);
    background: rgba(249, 115, 22, 0.08);
    border: 1px solid rgba(249, 115, 22, 0.15);
    padding: 2px 10px;
    border-radius: 12px;
    white-space: nowrap;
}
</style>
