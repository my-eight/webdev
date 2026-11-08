<script setup lang="ts">
import type { ServiceItem } from '~/types/service'
defineProps<{ items: ServiceItem[]; gridLayout?: 'catalog' }>()
</script>
<template>
  <div
    class="section-items"
    :class="{
      'section-items-paired': gridLayout !== 'catalog' && items.length % 3 !== 0,
      'section-items-catalog': gridLayout === 'catalog',
    }"
  >
    <article v-for="item in items" :key="item.title" class="section-item">
      <h3>{{ typography(item.title) }}</h3>
      <p>{{ typography(item.text) }}</p>
      <ul v-if="item.tags?.length" class="tags" aria-label="Направления работы">
        <li v-for="tag in item.tags" :key="tag">{{ typography(tag) }}</li>
      </ul>
    </article>
  </div>
</template>
