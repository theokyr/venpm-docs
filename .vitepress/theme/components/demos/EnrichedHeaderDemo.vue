<template>
    <div class="eh-demo">
        <div class="eh-titlebar">
            <div class="eh-window-title">Discord</div>
            <div class="eh-header">
                <button type="button" class="eh-icon">back</button>
                <button type="button" class="eh-icon">next</button>
                <button
                    v-if="togglesLeft"
                    type="button"
                    class="eh-icon"
                    :aria-expanded="showChannels"
                    aria-controls="enriched-header-channels"
                    @click="showChannels = !showChannels"
                >chan</button>
                <button
                    v-if="togglesLeft"
                    type="button"
                    class="eh-icon"
                    :aria-expanded="showMembers"
                    aria-controls="enriched-header-members"
                    @click="showMembers = !showMembers"
                >mem</button>
                <span class="eh-breadcrumb">{{ breadcrumb ? "Server / # general" : "# general" }}</span>
                <span class="eh-spacer"></span>
                <button
                    v-if="!togglesLeft"
                    type="button"
                    class="eh-icon"
                    :aria-expanded="showChannels"
                    aria-controls="enriched-header-channels"
                    @click="showChannels = !showChannels"
                >chan</button>
                <button
                    v-if="!togglesLeft"
                    type="button"
                    class="eh-icon"
                    :aria-expanded="showMembers"
                    aria-controls="enriched-header-members"
                    @click="showMembers = !showMembers"
                >mem</button>
                <button type="button" class="eh-icon">pin</button>
                <button type="button" class="eh-icon">search</button>
            </div>
        </div>

        <div class="eh-body">
            <aside v-show="showChannels" id="enriched-header-channels" class="eh-sidebar">
                <strong>Channels</strong>
                <span># general</span>
                <span># development</span>
                <span># screenshots</span>
            </aside>
            <main class="eh-chat">
                <p>Header controls live in the title bar, leaving the chat header out of the way.</p>
                <div class="eh-controls">
                    <label><input type="checkbox" v-model="breadcrumb" /> breadcrumb</label>
                    <label><input type="checkbox" v-model="togglesLeft" /> toggles left</label>
                </div>
            </main>
            <aside v-show="showMembers" id="enriched-header-members" class="eh-members">
                <strong>Members</strong>
                <span>kamaras</span>
                <span>user1</span>
                <span>user2</span>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showChannels = ref(true);
const showMembers = ref(true);
const breadcrumb = ref(true);
const togglesLeft = ref(false);
</script>

<style scoped>
.eh-demo {
    display: flex;
    flex-direction: column;
    height: 320px;
    background: #313338;
    color: #dbdee1;
    font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
    overflow: hidden;
}

.eh-titlebar {
    background: #1e1f22;
    border-bottom: 1px solid #3f4147;
    padding: 8px 10px;
}

.eh-window-title {
    color: #949ba4;
    font-size: 11px;
    margin-bottom: 6px;
}

.eh-header {
    min-height: 34px;
    display: flex;
    align-items: center;
    gap: 5px;
    background: #2b2d31;
    border-radius: 6px;
    padding: 5px 8px;
}

.eh-icon {
    border: 0;
    border-radius: 4px;
    background: #1e1f22;
    color: #b5bac1;
    font: inherit;
    font-size: 11px;
    padding: 5px 7px;
    cursor: pointer;
}

.eh-icon:hover {
    color: #fff;
    background: #3f4147;
}

.eh-breadcrumb {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
    font-size: 13px;
}

.eh-spacer {
    flex: 1;
}

.eh-body {
    flex: 1;
    display: flex;
    min-height: 0;
}

.eh-sidebar,
.eh-members {
    width: 150px;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    background: #2b2d31;
    color: #949ba4;
    font-size: 12px;
}

.eh-members {
    width: 130px;
    background: #232428;
}

.eh-sidebar strong,
.eh-members strong {
    color: #f2f3f5;
}

.eh-chat {
    flex: 1;
    min-width: 0;
    padding: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
}

.eh-chat p {
    margin: 0;
    color: #b5bac1;
    line-height: 1.5;
    max-width: 420px;
}

.eh-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    color: #949ba4;
    font-size: 12px;
}

.eh-controls label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

@media (max-width: 640px) {
    .eh-sidebar {
        width: 104px;
        padding: 10px;
    }

    .eh-members {
        width: 96px;
        padding: 10px;
    }

    .eh-chat {
        padding: 12px;
    }
}
</style>
