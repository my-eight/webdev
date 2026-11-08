<script setup lang="ts">
import type { Direction } from '~/types/service'
import portraits from '~/data/samurai-assets.json'

const props = defineProps<{ theme: Direction; compact?: boolean }>()
const root = ref<HTMLElement | null>(null)
const playing = ref(false)
const base = useRuntimeConfig().app.baseURL
const names = { web: 'development', stock: 'moysklad', design: 'design' }
const portrait = computed(() => portraits[names[props.theme] as keyof typeof portraits].images)
const largest = computed(() => portrait.value[portrait.value.length - 1]!)
const fallback = computed(() => `${base}${portrait.value[1]!.path}`)
const sources = computed(() => portrait.value.map(image => `${base}${image.path} ${image.width}w`).join(', '))
const sizes = computed(() => props.compact
  ? '(max-width: 760px) 60vw, 420px'
  : '(max-width: 760px) 95vw, (max-width: 1200px) 55vw, 720px')

onMounted(() => {
  const element = root.value
  if (!element) return
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
  let inView = false
  let frame = 0
  function reset() {
    cancelAnimationFrame(frame)
    frame = 0
    element!.style.removeProperty('--samurai-x')
    element!.style.removeProperty('--samurai-y')
    element!.style.removeProperty('--samurai-turn')
  }
  function sync() {
    playing.value = inView && !motion.matches && !document.hidden
    if (!playing.value || !pointer.matches) reset()
  }
  function move(event: PointerEvent) {
    if (!playing.value || !pointer.matches || event.pointerType !== 'mouse') return
    const rect = element!.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1))
    const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1))
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      element!.style.setProperty('--samurai-x', `${x * 7}px`)
      element!.style.setProperty('--samurai-y', `${y * 4}px`)
      element!.style.setProperty('--samurai-turn', `${x * 0.7}deg`)
      frame = 0
    })
  }
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry?.isIntersecting ?? false
    sync()
  })
  observer.observe(element)
  element.addEventListener('pointermove', move)
  element.addEventListener('pointerleave', reset)
  motion.addEventListener('change', sync)
  pointer.addEventListener('change', sync)
  document.addEventListener('visibilitychange', sync)
  onBeforeUnmount(() => {
    observer.disconnect()
    reset()
    element.removeEventListener('pointermove', move)
    element.removeEventListener('pointerleave', reset)
    motion.removeEventListener('change', sync)
    pointer.removeEventListener('change', sync)
    document.removeEventListener('visibilitychange', sync)
  })
})
</script>
<template>
  <div ref="root" class="samurai-portrait" :class="[`samurai-${theme}`, `theme-${theme}`, { 'is-playing': playing }]"
    :style="{ '--portrait-ratio': largest.width / largest.height }" aria-hidden="true">
    <div class="samurai-aura" />
    <div class="samurai-cutout">
      <img class="samurai-image" :src="fallback" :srcset="sources" :sizes="sizes"
        :width="largest.width" :height="largest.height" alt="" decoding="async" :fetchpriority="compact ? 'auto' : 'high'" />
      <img v-for="surface in ['hat', 'detail']" :key="surface"
        class="samurai-reflection" :class="`samurai-reflection-${surface}`"
        :src="fallback" :srcset="sources" :sizes="sizes" :width="largest.width" :height="largest.height" alt="" decoding="async" />
    </div>
    <div class="samurai-dust"><i /><i /><i /><i /></div>
  </div>
</template>
<style src="~/assets/styles/components/samurai.css" />
