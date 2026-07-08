<template>
    <div class="ef-demo">
        <div class="ef-toolbar">
            <button
                v-for="platform in platforms"
                :key="platform.id"
                type="button"
                class="ef-platform"
                :class="{ active: selectedId === platform.id }"
                :aria-pressed="selectedId === platform.id"
                @click="selectedId = platform.id"
            >
                {{ platform.label }}
            </button>
            <button
                type="button"
                class="ef-mode"
                :aria-pressed="rewriteIncoming"
                @click="rewriteIncoming = !rewriteIncoming"
            >
                {{ rewriteIncoming ? "incoming on" : "incoming off" }}
            </button>
        </div>

        <div class="ef-chat">
            <div class="ef-message">
                <div class="ef-avatar">u1</div>
                <div class="ef-body">
                    <div class="ef-author">user1</div>
                    <div class="ef-text">{{ selected.original }}</div>
                    <div class="ef-embed ef-embed-muted">
                        Discord preview is inconsistent for this link.
                    </div>
                </div>
            </div>

            <div class="ef-arrow">rewrite</div>

            <div class="ef-message ef-message-result">
                <div class="ef-avatar ef-avatar-bot">ef</div>
                <div class="ef-body">
                    <div class="ef-author">EmbedFix</div>
                    <div class="ef-text">{{ selected.rewritten }}</div>
                    <div class="ef-embed">
                        <strong>{{ selected.provider }}</strong>
                        <span>{{ selected.preview }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="ef-footer">
            <div>
                <span class="ef-label">provider order</span>
                <span class="ef-provider">{{ selected.provider }}</span>
                <span class="ef-provider">cache hit</span>
            </div>
            <span>{{ rewriteIncoming ? "incoming messages are visually replaced" : "outgoing messages rewrite before send" }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const platforms = [
    {
        id: "twitter",
        label: "X",
        original: "https://x.com/kamaras/status/123",
        rewritten: "https://fixvx.com/kamaras/status/123",
        provider: "fixvx",
        preview: "Stable video, image, and card metadata.",
    },
    {
        id: "reddit",
        label: "Reddit",
        original: "https://www.reddit.com/r/vencord/comments/abc/demo/",
        rewritten: "https://rxddit.com/r/vencord/comments/abc/demo/",
        provider: "rxddit",
        preview: "Embeds without opening the native Reddit page.",
    },
    {
        id: "bluesky",
        label: "Bluesky",
        original: "https://bsky.app/profile/kamaras.dev/post/3l2",
        rewritten: "https://fxbsky.app/profile/kamaras.dev/post/3l2",
        provider: "fxbsky",
        preview: "Readable post cards inside Discord.",
    },
];

const selectedId = ref(platforms[0].id);
const rewriteIncoming = ref(true);
const selected = computed(() => platforms.find(platform => platform.id === selectedId.value) ?? platforms[0]);
</script>

<style scoped>
.ef-demo {
    display: flex;
    flex-direction: column;
    height: 320px;
    background: #313338;
    color: #dbdee1;
    font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
    overflow: hidden;
}

.ef-toolbar {
    display: flex;
    gap: 6px;
    align-items: center;
    padding: 10px 12px;
    background: #2b2d31;
    border-bottom: 1px solid #3f4147;
}

.ef-platform,
.ef-mode {
    border: 0;
    border-radius: 4px;
    background: #1e1f22;
    color: #b5bac1;
    font: inherit;
    font-size: 12px;
    padding: 5px 9px;
    cursor: pointer;
}

.ef-platform.active,
.ef-mode {
    background: #5865f2;
    color: #fff;
}

.ef-mode {
    margin-left: auto;
}

.ef-chat {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
}

.ef-message {
    display: flex;
    gap: 10px;
}

.ef-message-result {
    margin-left: 28px;
}

.ef-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #5865f2;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    flex: 0 0 auto;
}

.ef-avatar-bot {
    background: #23a55a;
}

.ef-body {
    min-width: 0;
    flex: 1;
}

.ef-author {
    font-size: 13px;
    font-weight: 700;
    color: #f2f3f5;
}

.ef-text {
    font-size: 12px;
    color: #b5bac1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.ef-embed {
    margin-top: 6px;
    border-left: 3px solid #5865f2;
    background: #2b2d31;
    border-radius: 4px;
    padding: 8px 10px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.ef-embed-muted {
    border-left-color: #4f545c;
    color: #949ba4;
}

.ef-arrow {
    align-self: center;
    color: #949ba4;
    font-family: var(--vp-font-family-mono);
    font-size: 11px;
    text-transform: uppercase;
}

.ef-footer {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 9px 12px;
    background: #2b2d31;
    border-top: 1px solid #3f4147;
    color: #949ba4;
    font-size: 11px;
}

.ef-label {
    color: #dbdee1;
    margin-right: 6px;
}

.ef-provider {
    margin-right: 6px;
    color: #57f287;
}

@media (max-width: 620px) {
    .ef-footer {
        flex-direction: column;
    }

    .ef-message-result {
        margin-left: 0;
    }
}
</style>
