<script setup lang="ts">
import type { ItemSection } from '~/types/service'
defineProps<{ section: ItemSection; number: number }>()
</script>

<template>
  <SectionsSectionFrame :section="section" :number="number">
    <SectionsSectionItems :items="section.items" :numbered="section.kind === 'rows'" />
  </SectionsSectionFrame>
</template>
