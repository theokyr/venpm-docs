---
layout: showcase
title: kamaras plugins
description: A collection of Vencord userplugins by kamaras — install any with venpm.
sharedModules:
  - _libAnimationKit
  - _libKeybindRegistry
plugins:
  - name: channelTabs
    label: channelTabs
    description: "Quick-access tab bar for channels and DMs"
    features: [tab bar, drag reorder, context menus, virtual tabs API, keybinds]
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/channelTabs
    install: channelTabs
  - name: settingsHub
    label: settingsHub
    description: "Unified settings page for custom plugins"
    features: [central registry, virtual tab overlay, search, keybind page]
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/settingsHub
    install: settingsHub
  - name: minimalCallBar
    label: minimalCallBar
    description: "Compact 32px call bar replacing the DM call overlay"
    features: [compact bar, expand/collapse, mute/deafen, voice timer, ping]
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/minimalCallBar
    install: minimalCallBar
  - name: hotkeyNav
    label: hotkeyNav
    description: "Keyboard-driven navigation with inline keycap hints"
    features: [notification jump, DM nav, server nav, modifier layers, keycap badges]
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/hotkeyNav
    install: hotkeyNav
  - name: embedFix
    label: embedFix
    description: "Replaces social media URLs with embed-friendly alternatives"
    features: [URL rewriting, provider probing, tracking cleanup, per-platform toggles, cache]
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/embedFix
    install: embedFix
  - name: betterBlockIgnore
    label: betterBlockIgnore
    description: "Hide blocked and ignored users more completely"
    features: [hide blocked groups, ignored users, replies, mentions, reactions]
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/betterBlockIgnore
    install: betterBlockIgnore
    attribution:
      text: "This plugin is a fork of Vencord's stock NoBlockedMessages plugin. The fork keeps that upstream foundation and adds ignored-user handling, reply and mention filtering, reaction filtering, and settingsHub integration."
      href: https://github.com/Vendicated/Vencord/tree/main/src/plugins/noBlockedMessages
      label: "Vencord NoBlockedMessages"
  - name: discordMcp
    label: discordMcp
    description: "MCP bridge — expose Discord to AI agents"
    features: [tool permissions, prompt UI, event subscriptions, plugin rebuild]
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/discordMcp
    install: discordMcp
  - name: bsNoMore
    label: bsNoMore
    description: "Remove upsell clutter from Discord"
    features: [compact DM nav, hide clan tags, hide decorations, suppress quests]
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/bsNoMore
    install: bsNoMore
  - name: enrichedHeader
    label: enrichedHeader
    description: "Moves Discord channel header controls into the title bar"
    features: [title bar controls, breadcrumb header, sidebar toggles, layout API, keybinds]
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/enrichedHeader
    install: enrichedHeader
  - name: messageHeaderAvatar
    label: messageHeaderAvatar
    description: "Inline user avatars in message headers"
    features: [configurable size, circle/square shape, hide consecutive]
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/messageHeaderAvatar
    install: messageHeaderAvatar
  - name: venpmGui
    label: venpmGui
    description: "Manage plugins from inside Discord"
    features: [plugin browser, install/update, update notifications, search]
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/venpmGui
    install: venpmGui
---
