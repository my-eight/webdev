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
const marks = { web: '59,60 68,60 68,83 59,83', stock: '79,70 88,70 88,91 79,91', design: '73,69 82,69 82,90 73,90' }
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
          <filter :id="`${id}-ink`" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .2126 .7152 .0722 0 0" />
            <feComponentTransfer><feFuncA type="linear" slope="12" intercept="-4.8" /></feComponentTransfer>
            <feComposite in2="SourceAlpha" operator="in" />
          </filter>
          <mask :id="`${id}-letters`" mask-type="alpha">
            <image :href="fallback" width="100" height="100" preserveAspectRatio="none" :filter="`url(#${id}-ink)`" />
          </mask>
        </defs>
        <g :clip-path="`url(#${id}-mark)`">
          <rect width="100" height="100" fill="currentColor" :mask="`url(#${id}-letters)`" />
        </g>
      </svg>
      <img class="samurai-reflection" :src="fallback" :srcset="sources" :sizes="sizes"
        :width="largest.width" :height="largest.height" alt="" decoding="async" />
    </div>
  </div>
</template>
<style src="~/assets/styles/components/samurai.css" />
