<script setup lang="ts">
import type { Direction } from '~/types/service'
defineProps<{ theme: Direction }>()
</script>
<template>
  <div
    class="direction-ribbon"
    :class="`ribbon-${theme}`"
    aria-hidden="true"
  >
    <UiCodeStream v-if="theme === 'web'" />
    <UiDataStream v-else-if="theme === 'stock'" />
    <UiSketchStream v-else />
  </div>
</template>
<style src="~/assets/styles/components/direction-ribbon.css" />
