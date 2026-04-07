<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import InstallCommand from './InstallCommand.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #home-hero-actions-after>
      <InstallCommand v-if="frontmatter.layout === 'home'" />
    </template>
  </Layout>
</template>
