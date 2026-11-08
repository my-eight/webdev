<script setup lang="ts">
// Small studies of a designer's work: marks, packaging, layouts and vector curves.
const studies = [
  { guide: 'M12 36h88M56 5v62', strokes: ['M29 54 53 13 78 54Z', 'M39 38h29M45 49l11-18 11 18', 'M22 60h62'] },
  { guide: 'M18 12h76v48H18Z', strokes: ['M36 17 62 8 87 22 61 32Z', 'M36 17v34l25 13 26-14V22M61 32v32', 'M46 39l7 3M71 44l7-4'] },
  { guide: 'M11 56h90M56 8v54', strokes: ['M12 51C28 51 23 15 47 18S66 62 100 23', 'M12 51 28 18M47 18 67 57M67 57l33-34', 'M10 49h4v4h-4ZM45 16h4v4h-4ZM98 21h4v4h-4Z'] },
  { guide: 'M15 11h82v53H15Z', strokes: ['M22 15h69v45H22ZM22 25h69', 'M29 21h2m5 0h2m5 0h2M29 34h25M29 40h18M29 48h22', 'M65 32h19v19H65ZM65 32l19 19M84 32 65 51'] },
  { guide: 'M17 9h78v54H17Z', strokes: ['M33 11h46l4 50H29Z', 'M43 19c0-17 25-17 25 0', 'M45 34h23M45 40h16M50 48h12'] },
  { guide: 'M13 36h86M56 5v62', strokes: ['M56 9 64 26 83 22 75 38 85 53 65 51 56 65 47 51 27 53 37 38 29 22 48 26Z', 'M45 36 56 24 68 36 56 49Z'] },
  { guide: 'M18 7v58M94 7v58', strokes: ['M32 12h49v49H32Z', 'M41 47 50 28 57 39 65 24 74 47Z', 'M42 20h28M42 54h18'] },
  { guide: 'M10 56h92M10 15h92', strokes: ['M23 53 39 17 55 53M29 40h20', 'M63 53V22h13c17 0 17 17 0 17H63M75 39l14 14', 'M18 61h77'] },
  { guide: 'M11 13h91v46H11Z', strokes: ['M18 24h21v25H18ZM45 19h21v30H45ZM72 13h21v36H72Z', 'M18 24l21 25M18 49l21-25M45 34h21M72 31h21', 'M19 56h73'] },
  { guide: 'M16 36h81M56 6v60', strokes: ['M35 54 77 12l12 12-42 42-17 5Z', 'M35 54l12 12M69 20l12 12M30 71l8-4', 'M19 18c10-7 22-5 28 1M18 25c9-5 15-4 20-1'] },
  { guide: 'M15 11h82v51H15Z', strokes: ['M43 10h25v10l8 7v34H35V27l8-7Z', 'M43 10V6h25v4M35 33h41M35 52h41', 'M45 40h21M45 46h14'] },
  { guide: 'M12 36h88M56 7v58', strokes: ['M34 18c8-11 35-11 43 0s-4 20-21 20-30 13-21 21 33 7 43-2', 'M31 20c7-12 34-12 43-1M37 60c9 5 27 4 37-2', 'M23 9l6 5M88 60l6 4'] },
]
const sketches = ref(Array.from({ length: 40 }, (_, index) => ({
  study: index % studies.length,
  generation: 0,
  period: 7 + (index % 7) * 0.65,
  phase: -((index * 1.73) % 9),
  tilt: (index % 5 - 2) * 2,
})))
function nextStudy(index: number) {
  const count = sketches.value.length
  const excluded = new Set([
    sketches.value[index]!.study,
    sketches.value[(index + count - 1) % count]!.study,
    sketches.value[(index + 1) % count]!.study,
  ])
  const choices = studies.map((_, study) => study).filter((study) => !excluded.has(study))
  return choices[Math.floor(Math.random() * choices.length)]!
}
function redraw(index: number) {
  const sketch = sketches.value[index]!
  sketch.study = nextStudy(index)
  sketch.generation++
  sketch.phase = 0
  sketch.tilt = Math.random() * 8 - 4
}
const root = ref<HTMLElement | null>(null)
const playing = ref(false)
onMounted(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let inView = false
  function syncPlayback() {
    playing.value = inView && !motion.matches && !document.hidden
  }
  if (!motion.matches) {
    sketches.value.forEach((sketch, index) => {
      sketch.study = nextStudy(index)
    })
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
  <div ref="root" class="sketch-stream" :class="{ 'is-playing': playing }">
    <div class="sketch-stream-track">
      <div v-for="copy in 2" :key="copy" class="sketch-stream-group">
        <div v-for="(sketch, index) in sketches" :key="index" class="sketch-study">
          <svg
            :key="sketch.generation"
            viewBox="0 0 112 76"
            fill="none"
            :style="{ '--sketch-period': `${sketch.period}s`, '--sketch-phase': `${sketch.phase}s`, '--sketch-tilt': `${sketch.tilt}deg` }"
            @animationiteration.self="copy === 1 && redraw(index)"
          >
            <path :d="studies[sketch.study]!.guide" class="sketch-guide" />
            <path
              v-for="(stroke, strokeIndex) in studies[sketch.study]!.strokes"
              :key="strokeIndex"
              :d="stroke"
              pathLength="100"
              class="sketch-stroke"
              :style="{ '--stroke-index': strokeIndex }"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
