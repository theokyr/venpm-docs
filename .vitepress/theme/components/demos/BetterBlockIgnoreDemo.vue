<template>
    <div class="bbi-demo">
        <div class="bbi-topbar">
            <span>privacy filter</span>
            <button
                type="button"
                class="bbi-toggle"
                :class="{ active: filtered }"
                :aria-pressed="filtered"
                @click="filtered = !filtered"
            >
                {{ filtered ? "filtered" : "raw" }}
            </button>
        </div>

        <div class="bbi-messages">
            <template v-for="message in messages" :key="message.id">
                <div v-if="!filtered || !message.hidden" class="bbi-message" :class="{ blocked: message.hidden }">
                    <div class="bbi-avatar" :class="{ blocked: message.hidden }">{{ message.initials }}</div>
                    <div class="bbi-body">
                        <div class="bbi-author">{{ message.author }}</div>
                        <div class="bbi-text">{{ message.text }}</div>
                        <div v-if="message.reaction" class="bbi-reaction">{{ message.reaction }}</div>
                    </div>
                </div>
            </template>

            <div v-if="filtered" class="bbi-summary">
                4 blocked or ignored events removed: placeholder, reply, mention, and reaction.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const filtered = ref(true);

const messages = [
    { id: 1, author: "user1", initials: "u1", text: "Can someone review the CSS patch?", hidden: false },
    { id: 2, author: "Blocked User", initials: "bu", text: "1 blocked message", hidden: true },
    { id: 3, author: "user2", initials: "u2", text: "Replying to a blocked message", hidden: true },
    { id: 4, author: "user3", initials: "u3", text: "Normal message stays visible.", hidden: false },
    { id: 5, author: "Ignored User", initials: "iu", text: "Mentioned a blocked account", hidden: true },
    { id: 6, author: "Blocked User", initials: "bu", text: "Reaction event", reaction: "reaction removed", hidden: true },
];
</script>

<style scoped>
.bbi-demo {
    display: flex;
    flex-direction: column;
    height: 320px;
    background: #313338;
    color: #dbdee1;
    font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
    overflow: hidden;
}

.bbi-topbar {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    background: #2b2d31;
    border-bottom: 1px solid #3f4147;
    color: #949ba4;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.bbi-toggle {
    border: 0;
    border-radius: 4px;
    padding: 5px 10px;
    background: #4f545c;
    color: #fff;
    cursor: pointer;
    font: inherit;
    font-size: 12px;
    text-transform: none;
    letter-spacing: 0;
}

.bbi-toggle.active {
    background: #23a55a;
}

.bbi-messages {
    flex: 1;
    padding: 12px;
    overflow: hidden;
}

.bbi-message {
    display: flex;
    gap: 10px;
    padding: 7px 4px;
    border-radius: 5px;
}

.bbi-message.blocked {
    opacity: 0.45;
    background: rgba(237, 66, 69, 0.08);
}

.bbi-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #5865f2;
    color: #fff;
    display: grid;
    place-items: center;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    flex: 0 0 auto;
}

.bbi-avatar.blocked {
    background: #4f545c;
}

.bbi-author {
    color: #f2f3f5;
    font-size: 13px;
    font-weight: 700;
}

.bbi-text {
    color: #b5bac1;
    font-size: 12px;
}

.bbi-reaction {
    margin-top: 5px;
    display: inline-block;
    border-radius: 10px;
    background: #1e1f22;
    color: #949ba4;
    padding: 2px 8px;
    font-size: 11px;
}

.bbi-summary {
    margin: 10px 4px 0;
    padding: 10px 12px;
    border: 1px solid rgba(35, 165, 90, 0.35);
    border-radius: 6px;
    background: rgba(35, 165, 90, 0.08);
    color: #b5bac1;
    font-size: 12px;
}
</style>
