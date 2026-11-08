<script setup lang="ts">
defineProps<{ name?: string }>()
</script>
<template>
  <span class="brand-logo"
    ><svg class="brand-symbol" viewBox="0 0 56 52" fill="none" aria-hidden="true">
      <path class="brand-lime" d="M2 8 24 2 22 20 4 32Z" />
      <path class="brand-blue" d="m30 2 24 6-2 24-20-12Z" />
      <path class="brand-purple" d="m4 38 22-13 26 13-24 12Z" />
      <path d="m25 8 2 29 2-29M8 38l19 5 18-5" stroke="#050607" stroke-width="2" /></svg
    ><span class="brand-letters">{{ typography(name || 'Веб Системы Дизайн') }}</span></span
  >
</template>
