<script setup lang="ts">
import type { PricingSection } from '~/types/service'
defineProps<{ section: PricingSection }>()
</script>

<template>
  <SectionsSectionFrame :section="section">
    <SectionsSectionItems :items="section.items" />
  </SectionsSectionFrame>
</template>
