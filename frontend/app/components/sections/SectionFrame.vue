<script setup lang="ts">
import type { ContentSection } from '~/types/service'
defineProps<{ section: ContentSection; number: number }>()
</script>

<template>
  <section :id="section.id" class="content-section" :class="[`section-${section.kind}`, { 'section-empty': !section.items.length }]" :aria-labelledby="`${section.id}-title`">
    <div class="container section-layout">
      <div class="section-label"><span class="section-number">{{ String(number).padStart(2, '0') }}</span><span>{{ section.label }}</span></div>
      <div class="section-content">
        <h2 :id="`${section.id}-title`">{{ section.title }}</h2>
        <p v-if="section.intro" class="section-intro">{{ section.intro }}</p>
        <slot />
        <p v-if="section.outro && section.items.length" class="section-outro">{{ section.outro }}</p>
        <SectionsSectionLink v-if="section.link" :link="section.link" />
      </div>
    </div>
  </section>
</template>
