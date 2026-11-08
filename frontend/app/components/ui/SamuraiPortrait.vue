<script setup lang="ts">
import type { Direction } from '~/types/service'
import portraits from '~/data/samurai-assets.json'
const props = defineProps<{ theme: Direction; compact?: boolean }>()
const id = useId().replaceAll(':', '')
const base = useRuntimeConfig().app.baseURL
const names = { web: 'development', stock: 'moysklad', design: 'design' } as const
const portrait = computed(() => portraits[names[props.theme]].images)
const largest = computed(() => portrait.value[portrait.value.length - 1]!)
const fallback = computed(() => `${base}${largest.value.path}`)
const sources = computed(() => portrait.value.map(image => `${base}${image.path} ${image.width}w`).join(', '))
const sizes = computed(() => props.compact ? '(max-width: 760px) 65vw, 500px' : '(max-width: 760px) 100vw, 62vw')
// Restrict illumination to the existing printed shoulder mark, preserving the white collar
const marks = { web: '59,61.751 68,61.751 68,85.422 59,85.422', stock: '79,70 88,70 88,91 79,91', design: '73,69 82,69 82,90 73,90' }
const hats = {
  web: '12,0 85,0 85,23.671 50,23.671 34,30.876 12,37.051',
  stock: '10,0 93,0 93,36 60,44 36,43 10,38',
  design: '20,0 95,0 95,46 57,30 20,23',
}
const hilts = {
  web: '80,28.817 90,30.876 82,59.693 72,58.664',
  stock: '14,39 19,39 31,63 26,65',
  design: '15,34 21,34 32,62 26,64',
}
</script>
<template>
  <div class="samurai-portrait" :class="[`samurai-${theme}`, `theme-${theme}`]" aria-hidden="true">
    <div class="samurai-aura" />
    <div class="samurai-cutout" :style="{ '--portrait-ratio': largest.width / largest.height }">
      <img class="samurai-image" :src="fallback" :srcset="sources" :sizes="sizes"
        :width="largest.width" :height="largest.height" alt="" decoding="async" :fetchpriority="compact ? 'auto' : 'high'" />
      <svg class="samurai-mark" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
        <defs>
          <clipPath :id="`${id}-mark`"><polygon :points="marks[theme]" /></clipPath>
          <clipPath :id="`${id}-hat`"><polygon :points="hats[theme]" /></clipPath>
          <clipPath :id="`${id}-metal`"><polygon :points="hats[theme]" /><polygon :points="hilts[theme]" /></clipPath>
          <filter :id="`${id}-colour`" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
            <feFlood flood-color="currentColor" result="accent" />
            <feComposite in="SourceGraphic" in2="accent" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />
          </filter>
          <filter :id="`${id}-ink`" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .2126 .7152 .0722 0 0" />
            <feComponentTransfer><feFuncA type="linear" slope="16" intercept="-4" /></feComponentTransfer>
            <feComposite in2="SourceAlpha" operator="in" />
            <!-- Close small gaps in the print without thickening the original strokes -->
            <feMorphology operator="dilate" radius=".12" />
            <feMorphology operator="erode" radius=".12" />
            <feGaussianBlur stdDeviation=".02" />
          </filter>
          <filter :id="`${id}-print`" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
            <!-- Compress the source grain into a light wear variation instead of dark blotches -->
            <feComponentTransfer result="worn-print">
              <feFuncR type="linear" slope=".2" intercept=".8" />
              <feFuncG type="linear" slope=".2" intercept=".8" />
              <feFuncB type="linear" slope=".2" intercept=".8" />
            </feComponentTransfer>
            <feFlood flood-color="currentColor" result="ink" />
            <feComposite in="worn-print" in2="ink" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />
          </filter>
          <filter :id="`${id}-shine`" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .2126 .7152 .0722 0 0" />
            <feComponentTransfer><feFuncA type="linear" slope="6" intercept="-1.2" /></feComponentTransfer>
            <feComposite in2="SourceAlpha" operator="in" />
          </filter>
          <mask :id="`${id}-highlights`" mask-type="alpha">
            <image :href="fallback" width="100" height="100" preserveAspectRatio="none" :filter="`url(#${id}-shine)`" />
          </mask>
          <mask :id="`${id}-letters`" mask-type="alpha">
            <image :href="fallback" width="100" height="100" preserveAspectRatio="none" :filter="`url(#${id}-ink)`" />
          </mask>
        </defs>
        <image :href="fallback" width="100" height="100" preserveAspectRatio="none"
          :clip-path="`url(#${id}-metal)`" :filter="`url(#${id}-colour)`" :mask="`url(#${id}-highlights)`" />
        <g :clip-path="`url(#${id}-mark)`">
          <image :href="fallback" width="100" height="100" preserveAspectRatio="none"
            :filter="`url(#${id}-print)`" :mask="`url(#${id}-letters)`" />
        </g>
        <g :clip-path="`url(#${id}-hat)`" :filter="`url(#${id}-colour)`">
          <image class="samurai-reflection" :href="fallback" width="100" height="100" preserveAspectRatio="none" />
        </g>
      </svg>
    </div>
  </div>
</template>
<style src="~/assets/styles/components/samurai.css" />
