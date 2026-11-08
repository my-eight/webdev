<script setup lang="ts">
import type { ContentSection } from '~/types/service'
defineProps<{ section: ContentSection }>()
</script>
<template>
  <section
    :id="section.id"
    class="content-section"
    :class="`section-${section.kind}`"
    :aria-labelledby="`${section.id}-title`"
  >
    <div class="container section-layout">
      <div class="section-content">
        <div class="section-heading">
          <h2 :id="`${section.id}-title`" :aria-label="typography(section.title)">
            <span class="section-title-full">{{ typography(section.title) }}</span>
            <span class="section-title-compact">{{ typography(section.compactTitle || section.title) }}</span>
          </h2>
        </div>
        <slot />

        <SectionsSectionLink v-if="section.link" :link="section.link" />
      </div>
    </div>
  </section>
</template>
