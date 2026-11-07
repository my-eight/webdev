<script setup lang="ts">
import type { ServiceItem } from '~/types/service'
defineProps<{ items: ServiceItem[]; numbered?: boolean }>()
</script>

<template>
  <div class="section-items">
    <article v-for="(item, index) in items" :key="item.title" class="section-item">
      <span v-if="numbered" class="item-number">{{ String(index + 1).padStart(2, '0') }}</span>
      <h3>{{ item.title }}</h3><p>{{ item.text }}</p>
      <ul v-if="item.tags?.length" class="tags" aria-label="Направления работы"><li v-for="tag in item.tags" :key="tag">{{ tag }}</li></ul>
    </article>
  </div>
</template>
