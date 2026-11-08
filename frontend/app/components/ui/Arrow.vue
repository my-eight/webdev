<script setup lang="ts">
const props = withDefaults(defineProps<{
  direction?: 'up-right' | 'right' | 'down' | 'up' | 'left' | 'both'
}>(), { direction: 'up-right' })

const rotation = computed(() => ({
  'up-right': 0,
  right: 45,
  down: 135,
  up: -45,
  left: 225,
  both: 0,
})[props.direction])
</script>

<template>
  <svg class="ui-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path v-if="direction === 'both'" d="M4 12h16M8 8l-4 4 4 4m8-8 4 4-4 4" />
    <path v-else d="M6 18 18 6M7 6h11v11" :transform="`rotate(${rotation} 12 12)`" />
  </svg>
</template>

<style scoped>
.ui-arrow {
  display: inline-block;
  inline-size: var(--arrow-size, 20px);
  block-size: var(--arrow-size, 20px);
  flex: 0 0 auto;
  vertical-align: middle;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  pointer-events: none;
}
</style>
