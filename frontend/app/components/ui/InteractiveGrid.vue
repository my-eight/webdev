<script setup lang="ts">
const surface = ref<HTMLElement | null>(null)
const route = useRoute()
let allowed: MediaQueryList | undefined
let shell: HTMLElement | null = null
let frame = 0
let active = false
let initialized = false
let x = 0
let y = 0
let targetX = 0
let targetY = 0

function paint() {
  frame = 0
  if (!surface.value || !allowed?.matches) return
  x += (targetX - x) * 0.18
  y += (targetY - y) * 0.18
  surface.value.style.setProperty('--grid-x', `${x.toFixed(2)}px`)
  surface.value.style.setProperty('--grid-y', `${y.toFixed(2)}px`)
  surface.value.style.setProperty('--grid-offset-y', `${shell?.getBoundingClientRect().top ?? 0}px`)
  if (active && (Math.abs(targetX - x) > 0.2 || Math.abs(targetY - y) > 0.2)) schedule()
}
function schedule() {
  if (active && allowed?.matches && !frame) frame = requestAnimationFrame(paint)
}
function hide() {
  active = false
  initialized = false
  surface.value?.classList.remove('is-active')
  cancelAnimationFrame(frame)
  frame = 0
}
function move(event: PointerEvent) {
  if (!allowed?.matches || event.pointerType !== 'mouse') return
  targetX = event.clientX
  targetY = event.clientY
  if (!initialized) {
    x = targetX
    y = targetY
    initialized = true
  }
  active = true
  surface.value?.classList.add('is-active')
  schedule()
}
function onPointerOut(event: PointerEvent) {
  if (!event.relatedTarget) hide()
}
function onVisibility() {
  if (document.hidden) hide()
}
watch(() => route.path, hide)
onMounted(() => {
  shell = surface.value?.closest('.site-shell') ?? null
  allowed = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  allowed.addEventListener('change', hide)
  window.addEventListener('pointermove', move, { passive: true })
  window.addEventListener('pointerout', onPointerOut, { passive: true })
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
  window.addEventListener('blur', hide)
  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => {
  hide()
  allowed?.removeEventListener('change', hide)
  window.removeEventListener('pointermove', move)
  window.removeEventListener('pointerout', onPointerOut)
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  window.removeEventListener('blur', hide)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <div ref="surface" class="interactive-grid" aria-hidden="true">
    <div class="interactive-grid-lens" />
  </div>
</template>
