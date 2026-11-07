<script setup lang="ts">
import type { SectionDetails } from '~/types/service'
defineProps<{ link: NonNullable<SectionDetails['link']> }>()
</script>

<template>
  <NuxtLink :to="link.to" class="text-link section-link" :external="link.to.startsWith('https://')">{{ link.label }} <span aria-hidden="true">↗</span></NuxtLink>
</template>
