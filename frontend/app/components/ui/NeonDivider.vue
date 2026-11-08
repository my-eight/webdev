<script setup lang="ts">
import type { Direction } from '~/types/service'
defineProps<{ theme: Direction | 'home' }>()
const root = ref<HTMLElement | null>(null)
const playing = ref(false)
onMounted(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let visible = false
  const sync = () => { playing.value = visible && !document.hidden && !motion.matches }
  const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; sync() })
  if (root.value) observer.observe(root.value)
  document.addEventListener('visibilitychange', sync)
  motion.addEventListener('change', sync)
  onBeforeUnmount(() => {
    observer.disconnect()
    document.removeEventListener('visibilitychange', sync)
    motion.removeEventListener('change', sync)
  })
})
</script>
<template>
  <div ref="root" class="neon-divider" :class="[`neon-${theme}`, { 'is-playing': playing }]" aria-hidden="true">
    <i />
  </div>
</template>
<style src="~/assets/styles/components/neon-divider.css" />
