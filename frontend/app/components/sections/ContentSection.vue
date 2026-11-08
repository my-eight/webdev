<script setup lang="ts">
import type { ItemSection } from '~/types/service'
defineProps<{ section: ItemSection }>()
</script>

<template>
  <SectionsSectionFrame :section="section">
    <SectionsSectionItems :items="section.items" :grid-layout="section.gridLayout" />
  </SectionsSectionFrame>
</template>
