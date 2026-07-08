<template>
    <div class="vip-demo">
        <aside class="vip-rules">
            <div class="vip-heading">rules</div>
            <button
                v-for="rule in rules"
                :key="rule.id"
                type="button"
                class="vip-rule"
                :class="{ active: selectedRuleId === rule.id }"
                :aria-pressed="selectedRuleId === rule.id"
                @click="selectedRuleId = rule.id"
            >
                <strong>{{ rule.name }}</strong>
                <span>{{ rule.summary }}</span>
            </button>
        </aside>

        <main class="vip-main">
            <div class="vip-profile">
                <div>
                    <strong>{{ selectedRule.profile }}</strong>
                    <span>{{ selectedRule.profileDetail }}</span>
                </div>
                <span class="vip-status">DND override allowed</span>
            </div>

            <div class="vip-chat">
                <button
                    v-for="message in messages"
                    :key="message.id"
                    type="button"
                    class="vip-message"
                    :class="{ active: selectedMessageId === message.id, match: matches(message) }"
                    :aria-pressed="selectedMessageId === message.id"
                    @click="selectedMessageId = message.id"
                >
                    <span class="vip-author">{{ message.author }}</span>
                    <span>{{ message.text }}</span>
                </button>
            </div>

            <div class="vip-result" :class="{ matched: currentMatch }" aria-live="polite">
                <strong>{{ currentMatch ? "Alert sent" : "No alert" }}</strong>
                <span>
                    {{ currentMatch ? `${selectedRule.name} matched ${selectedMessage.author}.` : "The selected message does not match the active rule." }}
                </span>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const rules = [
    {
        id: "stream",
        name: "Stream crew",
        summary: "authors + keyword",
        profile: "Built-in ping",
        profileDetail: "desktop and Vencord notification",
        authors: ["kamaras", "producer"],
        keyword: "live",
    },
    {
        id: "ops",
        name: "Ops escalation",
        summary: "channel + keyword",
        profile: "Loud alert",
        profileDetail: "60s channel cooldown",
        authors: ["monitor"],
        keyword: "down",
    },
];

const messages = [
    { id: "a", author: "kamaras", text: "going live in five minutes" },
    { id: "b", author: "user1", text: "does anyone want coffee?" },
    { id: "c", author: "monitor", text: "build runner is down" },
];

const selectedRuleId = ref(rules[0].id);
const selectedMessageId = ref(messages[0].id);
const selectedRule = computed(() => rules.find(rule => rule.id === selectedRuleId.value) ?? rules[0]);
const selectedMessage = computed(() => messages.find(message => message.id === selectedMessageId.value) ?? messages[0]);

function matches(message: typeof messages[number]): boolean {
    const rule = selectedRule.value;
    return rule.authors.includes(message.author) && message.text.toLowerCase().includes(rule.keyword);
}

const currentMatch = computed(() => matches(selectedMessage.value));
</script>

<style scoped>
.vip-demo {
    display: grid;
    grid-template-columns: 190px 1fr;
    height: 320px;
    background: #313338;
    color: #dbdee1;
    font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
    overflow: hidden;
}

.vip-rules {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    background: #2b2d31;
    border-right: 1px solid #3f4147;
}

.vip-heading {
    color: #949ba4;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
}

.vip-rule {
    border: 1px solid #3f4147;
    border-radius: 6px;
    background: #1e1f22;
    color: #b5bac1;
    padding: 9px;
    text-align: left;
    font: inherit;
    cursor: pointer;
}

.vip-rule strong,
.vip-rule span {
    display: block;
}

.vip-rule strong {
    color: #f2f3f5;
    font-size: 13px;
}

.vip-rule span {
    margin-top: 3px;
    color: #949ba4;
    font-size: 11px;
}

.vip-rule.active {
    border-color: #5865f2;
    background: rgba(88, 101, 242, 0.18);
}

.vip-main {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
}

.vip-profile {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    border-radius: 6px;
    background: #2b2d31;
    padding: 10px 12px;
}

.vip-profile strong,
.vip-profile span {
    display: block;
}

.vip-profile span,
.vip-status {
    color: #949ba4;
    font-size: 12px;
}

.vip-status {
    color: #57f287;
    white-space: nowrap;
}

.vip-chat {
    display: grid;
    gap: 7px;
}

.vip-message {
    border: 1px solid transparent;
    border-radius: 6px;
    background: #2b2d31;
    color: #b5bac1;
    padding: 9px 10px;
    text-align: left;
    font: inherit;
    cursor: pointer;
}

.vip-message.active {
    border-color: #5865f2;
}

.vip-message.match {
    box-shadow: inset 3px 0 0 #57f287;
}

.vip-author {
    display: block;
    color: #f2f3f5;
    font-size: 13px;
    font-weight: 700;
}

.vip-result {
    margin-top: auto;
    border: 1px solid #3f4147;
    border-radius: 6px;
    background: #232428;
    padding: 12px;
}

.vip-result strong,
.vip-result span {
    display: block;
}

.vip-result strong {
    color: #949ba4;
}

.vip-result span {
    margin-top: 3px;
    color: #b5bac1;
    font-size: 12px;
}

.vip-result.matched {
    border-color: rgba(87, 242, 135, 0.4);
    background: rgba(87, 242, 135, 0.08);
}

.vip-result.matched strong {
    color: #57f287;
}

@media (max-width: 680px) {
    .vip-demo {
        grid-template-columns: 1fr;
        height: auto;
    }

    .vip-rules {
        border-right: 0;
        border-bottom: 1px solid #3f4147;
    }
}
</style>
