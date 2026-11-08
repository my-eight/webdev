<script setup lang="ts">
import type { ItemSection } from '~/types/service'

defineProps<{ formats: NonNullable<ItemSection['workFormats']> }>()
</script>

<template>
  <div :id="formats.id" class="service-formats" role="group" aria-label="Формат работы и оценка">
    <article v-for="item in formats.items" :key="item.title" class="service-format">
      <h3>{{ typography(item.title) }}</h3>
      <p>{{ typography(item.text) }}</p>
    </article>
    <NuxtLink :to="formats.link.to" class="button button-primary button-contact">
      {{ typography(formats.link.label) }} <UiArrow />
    </NuxtLink>
  </div>
</template>
