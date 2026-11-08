<script setup lang="ts">
// A compact identity workbench: typography, colour and editable vector forms
const tiles = [
  { kind: 'type', text: 'Аа', variant: 0 },
  { kind: 'palette', text: '', variant: 1 },
  { kind: 'curve', text: '', variant: 2 },
  { kind: 'type', text: 'Я', variant: 1 },
  { kind: 'mark', text: '', variant: 0 },
  { kind: 'type', text: 'БРЕНД', variant: 2 },
  { kind: 'palette', text: '', variant: 2 },
  { kind: 'layout', text: '', variant: 1 },
  { kind: 'type', text: 'Ж', variant: 0 },
  { kind: 'curve', text: '', variant: 1 },
  { kind: 'mark', text: '', variant: 2 },
  { kind: 'type', text: 'ФОРМА', variant: 1 },
] as const
const sequence = ref(Array.from({ length: 3 }, () => [...tiles]).flat())
const root = ref<HTMLElement | null>(null)
const playing = ref(false)

onMounted(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let inView = false
  function syncPlayback() {
    playing.value = inView && !motion.matches && !document.hidden
  }
  if (!motion.matches) {
    const shuffled = [...sequence.value]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const other = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[other]] = [shuffled[other]!, shuffled[i]!]
    }
    sequence.value = shuffled
  }
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry?.isIntersecting ?? false
    syncPlayback()
  })
  if (root.value) observer.observe(root.value)
  motion.addEventListener('change', syncPlayback)
  document.addEventListener('visibilitychange', syncPlayback)
  onBeforeUnmount(() => {
    observer.disconnect()
    motion.removeEventListener('change', syncPlayback)
    document.removeEventListener('visibilitychange', syncPlayback)
  })
})
</script>
<template>
  <div ref="root" class="identity-stream" :class="{ 'is-playing': playing }">
    <div class="identity-track">
      <div v-for="copy in 2" :key="copy" class="identity-group">
        <div v-for="(tile, index) in sequence" :key="index" class="identity-tile"
          :class="[`identity-${tile.kind}`, `identity-variant-${tile.variant}`]"
          :style="{ '--identity-delay': `${-index * 0.7}s` }">
          <template v-if="tile.kind === 'type'">
            <span class="identity-letter">{{ tile.text }}</span>
            <i class="identity-baseline" />
          </template>
          <template v-else-if="tile.kind === 'palette'">
            <i v-for="swatch in 5" :key="swatch" class="identity-swatch" :style="{ '--swatch': swatch }" />
          </template>
          <svg v-else-if="tile.kind === 'curve'" viewBox="0 0 144 40" fill="none">
            <path class="identity-guide" d="M8 31 46 7M98 33l38-24" />
            <path class="identity-draw" d="M8 31C46 7 98 33 136 9" pathLength="100" />
            <circle class="identity-handle" cx="46" cy="7" r="2" /><circle class="identity-handle" cx="98" cy="33" r="2" />
            <rect x="5" y="28" width="6" height="6" /><rect x="133" y="6" width="6" height="6" />
          </svg>
          <svg v-else-if="tile.kind === 'mark'" viewBox="0 0 80 40" fill="none">
            <path class="identity-draw" d="M9 30 25 6l16 24ZM31 30 47 6l16 24Z" pathLength="100" />
            <circle class="identity-guide" cx="36" cy="20" r="17" />
          </svg>
          <svg v-else viewBox="0 0 100 40" fill="none">
            <rect x="4" y="3" width="92" height="34" />
            <path class="identity-guide" d="M34 3v34M67 3v34M4 14h92" />
            <path class="identity-draw" d="M10 9h15M10 21h17M10 27h13M41 20h20v11H41ZM73 20h17M73 26h17M73 31h10" pathLength="100" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
