<script setup lang="ts">
import type { PortfolioSection } from '~/types/service'
defineProps<{ section: PortfolioSection }>()
</script>

<template>
  <SectionsSectionFrame :section="section">
    <SectionsSectionItems v-if="section.items.length" :items="section.items" />
    <div v-else class="portfolio-pending">
      <span class="pending-mark" aria-hidden="true">＋</span>
      <p>{{ typography(section.outro || '') }}</p>
    </div>
  </SectionsSectionFrame>
</template>
