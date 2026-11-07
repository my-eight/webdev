<script setup lang="ts">
import type { PortfolioSection } from '~/types/service'
defineProps<{ section: PortfolioSection; number: number }>()
</script>

<template>
  <SectionsSectionFrame :section="section" :number="number">
    <SectionsSectionItems v-if="section.items.length" :items="section.items" numbered />
    <div v-else class="portfolio-pending"><span class="pending-mark" aria-hidden="true">＋</span><p>{{ section.outro }}</p></div>
  </SectionsSectionFrame>
</template>
