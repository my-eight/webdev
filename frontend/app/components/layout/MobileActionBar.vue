<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => (route.path.replace(/\/+$/, '') || '/') === '/')
</script>
<template>
  <aside class="mobile-action-bar" aria-label="Быстрое действие">
    <NuxtLink :to="{ path: route.path, hash: isHome ? '#directions' : '#contact' }" class="button button-primary">
      {{ typography(isHome ? 'Выбрать направление' : 'Обсудить задачу') }}
      <span aria-hidden="true">{{ isHome ? '↓' : '↗' }}</span>
    </NuxtLink>
  </aside>
</template>
<style src="~/assets/styles/components/mobile-action.css" />
