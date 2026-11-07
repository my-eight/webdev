<script setup lang="ts">
import type { ProcessSection } from '~/types/service'
defineProps<{ section: ProcessSection; number: number }>()
</script>

<template>
  <SectionsSectionFrame :section="section" :number="number">
    <ol class="process-list">
      <li v-for="(item, index) in section.items" :key="item.title"><span class="item-number">{{ String(index + 1).padStart(2, '0') }}</span><div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div></li>
    </ol>
  </SectionsSectionFrame>
</template>
