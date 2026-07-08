---
layout: showcase
title: kamaras plugins
description: Vencord userplugins by kamaras for navigation, cleaner Discord UI, calls, streaming, notifications, and local agent tooling.
sharedModules:
  - _libAnimationKit
  - _libKeybindRegistry
plugins:
  - name: channelTabs
    label: channelTabs
    description: "IDE-style tabs for Discord channels and DMs."
    prose:
      - "channelTabs keeps the conversations you are actively using in a compact tab bar, so jumping between a server channel, a DM, and a reference thread does not require rewalking Discord's sidebars every time."
      - "Tabs can be opened, reordered, closed, and styled. The plugin also exposes a virtual tab API that other plugins can use, with optional settingsHub and keybind registry integration for deeper control."
    demoTitle: "channelTabs - tab bar"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/channelTabs
    install: channelTabs
  - name: settingsHub
    label: settingsHub
    description: "A unified settings surface for custom plugins."
    prose:
      - "settingsHub gives larger userplugins a real settings page: grouped controls, previews, search, consistent styling, and plugin-specific sections that are easier to scan than the default Vencord option list."
      - "It also owns the shared keybind registry lifecycle, which lets plugins expose editable keybinds without each one shipping its own dispatcher."
    demoTitle: "settingsHub - unified settings"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/settingsHub
    install: settingsHub
  - name: minimalCallBar
    label: minimalCallBar
    description: "A compact replacement for Discord's large DM and group call overlay."
    prose:
      - "minimalCallBar keeps call state visible without letting the call panel dominate the chat. The bar shows connection state, participants, call duration, ping, and common voice controls in a narrow strip."
      - "It is built for people who stay in calls while reading or working elsewhere in Discord, with optional display modes, hover detail, and keybind support."
    demoTitle: "minimalCallBar - compact call bar"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/minimalCallBar
    install: minimalCallBar
  - name: hotkeyNav
    label: hotkeyNav
    description: "Keyboard navigation for notifications, DMs, servers, and channels."
    prose:
      - "hotkeyNav adds modifier layers and inline keycap hints so Discord can be driven from the keyboard. Jump to notification targets, move through DM and server positions, and navigate channels without hunting through the UI."
      - "The hints can stay visible or appear only while a modifier is held, and settingsHub can expose the underlying keybinds in one place."
    demoTitle: "hotkeyNav - keycap navigation"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/hotkeyNav
    install: hotkeyNav
  - name: embedFix
    label: embedFix
    description: "Rewrite social links to providers that embed cleanly in Discord."
    prose:
      - "embedFix handles the daily annoyance of social links that preview poorly or not at all. It can rewrite your outgoing messages before send and visually replace supported incoming links from other users."
      - "Provider priority, probe caching, platform toggles, and custom provider overrides let you choose how aggressive the plugin should be."
    demoTitle: "embedFix - URL rewrite"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/embedFix
    install: embedFix
  - name: betterBlockIgnore
    label: betterBlockIgnore
    description: "A stricter block and ignore filter for chat, replies, mentions, and reactions."
    prose:
      - "betterBlockIgnore starts from Vencord's NoBlockedMessages behavior and extends it to Discord's ignored-user state, reply chains, mention references, and reaction events."
      - "Use it when the collapsed blocked-message placeholder is still too noisy or when ignored users should be filtered as completely as blocked users."
    demoTitle: "betterBlockIgnore - privacy filter"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/betterBlockIgnore
    install: betterBlockIgnore
    attribution:
      text: "This plugin is a fork of Vencord's stock NoBlockedMessages plugin by Vendicated and contributors, originally authored by rushii, Samu, and jamesbt365. This fork keeps that upstream foundation and adds ignored-user handling, reply and mention filtering, reaction filtering, and settingsHub integration."
      href: https://github.com/Vendicated/Vencord/tree/main/src/plugins/noBlockedMessages
      label: "Vencord NoBlockedMessages"
  - name: discordMcp
    label: discordMcp
    description: "A local MCP bridge between Discord and AI agents."
    prose:
      - "discordMcp exposes selected Discord client state and actions through a local Model Context Protocol proxy. It is meant for agent workflows that need to read Discord context, subscribe to events, or request controlled actions from the running client."
      - "Tool permissions are grouped by risk, dangerous operations can prompt in Discord, and plugin rebuild requests can be denied automatically while you are in a call."
    demoTitle: "discordMcp - permission bridge"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/discordMcp
    install: discordMcp
  - name: bsNoMore
    label: bsNoMore
    description: "Remove Discord upsells and visual clutter."
    prose:
      - "bsNoMore is a cleanup plugin for the parts of Discord that repeatedly compete for attention: Nitro and Shop entries, quest popups, store surfaces, clan tags, avatar decorations, and related UI noise."
      - "It also includes a compact DM navigation mode, so the left rail can stay focused on conversations rather than promotion."
    demoTitle: "bsNoMore - clutter removal"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/bsNoMore
    install: bsNoMore
  - name: enrichedHeader
    label: enrichedHeader
    description: "Move channel header controls into the title bar."
    prose:
      - "enrichedHeader reclaims vertical space by moving common channel-header controls into Discord's title bar and adding compact sidebar toggles, navigation buttons, and breadcrumb-style context."
      - "It also exposes a typed header layout API so other plugins can place controls consistently instead of fighting for header space."
    demoTitle: "enrichedHeader - title bar controls"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/enrichedHeader
    install: enrichedHeader
  - name: messageHeaderAvatar
    label: messageHeaderAvatar
    description: "Show avatars directly in message headers."
    prose:
      - "messageHeaderAvatar brings each author's avatar into the message header line, which makes dense channels easier to scan without increasing the left gutter."
      - "Avatar size, shape, reply avatar size, consecutive-message behavior, and optional cleanup for server identity badges can all be tuned."
    demoTitle: "messageHeaderAvatar - inline avatars"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/messageHeaderAvatar
    install: messageHeaderAvatar
  - name: venpmGui
    label: venpmGui
    description: "Manage venpm plugins from inside Discord."
    prose:
      - "venpmGui brings the common venpm loop into Discord: browse configured repos, search available plugins, install, update, review state, and work through setup without keeping a terminal open."
      - "It is still backed by the venpm CLI and plugin index format, so it fits the same install/update model as command-line venpm."
    demoTitle: "venpmGui - plugin browser"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/venpmGui
    install: venpmGui
  - name: betterRes
    label: betterRes
    description: "Unlock custom Discord stream resolutions and frame rates."
    prose:
      - "betterRes patches Discord's stream quality choices so you can add lower, higher, or unusual vertical resolutions and frame rates. That is useful for low-bandwidth sharing, battery-conscious calls, and stream setups that Discord does not expose by default."
      - "Custom values are configured as comma-separated resolution and FPS lists, then surfaced alongside Discord's normal quality presets."
    demoTitle: "betterRes - stream quality"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/betterRes
    install: betterRes
  - name: vipNotifications
    label: vipNotifications
    description: "Rule-based VIP alerts with profiles, cooldowns, and privacy controls."
    prose:
      - "vipNotifications lets you define rules for messages that deserve attention even when Discord's normal notification behavior would stay quiet. Rules can target authors, channels, keywords, and profiles."
      - "Profiles control desktop and Vencord alerts, cooldown behavior, DND overrides, streamer-mode handling, and privacy-sensitive display choices."
    demoTitle: "vipNotifications - rule alerts"
    source: https://github.com/theokyr/vencord-plugins/tree/main/plugins/vipNotifications
    install: vipNotifications
---
