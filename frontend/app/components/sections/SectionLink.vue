<script setup lang="ts">
import type { SectionDetails } from '~/types/service'
defineProps<{ link: NonNullable<SectionDetails['link']> }>()
</script>

<template>
  <NuxtLink :to="link.to" class="text-link section-link" :external="link.to.startsWith('https://')"><span class="text-link-label">{{ link.label }}</span><span class="text-link-arrow" aria-hidden="true">↗</span></NuxtLink>
</template>
