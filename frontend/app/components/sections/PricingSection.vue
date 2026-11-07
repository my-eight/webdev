<script setup lang="ts">
import type { PricingSection } from '~/types/service'
defineProps<{ section: PricingSection; number: number }>()
</script>

<template>
  <SectionsSectionFrame :section="section" :number="number">
    <SectionsSectionItems :items="section.items" />
  </SectionsSectionFrame>
</template>
