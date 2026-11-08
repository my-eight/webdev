<script setup lang="ts">
import type { ProcessSection } from '~/types/service'
defineProps<{ section: ProcessSection }>()
</script>
<template>
  <SectionsSectionFrame :section="section"
    ><ol class="process-list">
      <li v-for="item in section.items" :key="item.title">
        <span class="process-node" aria-hidden="true" />
        <h3>{{ typography(item.title) }}</h3>
        <p>{{ typography(item.text) }}</p>
      </li>
    </ol></SectionsSectionFrame
  >
</template>
