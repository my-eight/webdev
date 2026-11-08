<script setup lang="ts">
import type { Direction } from '~/types/service'
defineProps<{ theme: Direction | 'home' }>()
</script>
<template>
  <div
    class="direction-ribbon"
    :class="`ribbon-${theme}`"
    aria-hidden="true"
  >
    <template v-if="theme === 'home'">
      <div class="home-ribbon-part theme-web"><UiCodeStream /></div>
      <div class="home-ribbon-part theme-stock"><UiDataStream /></div>
      <div class="home-ribbon-part theme-design"><UiIdentityStream /></div>
    </template>
    <UiCodeStream v-else-if="theme === 'web'" />
    <UiDataStream v-else-if="theme === 'stock'" />
    <UiIdentityStream v-else />
  </div>
</template>
<style src="~/assets/styles/components/direction-ribbon.css" />
