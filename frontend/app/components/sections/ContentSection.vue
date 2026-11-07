<script setup lang="ts">
import type { ContentSection } from '~/types/service'
const props = defineProps<{ section: ContentSection; number: number }>()
const sectionLink = computed(() => props.section.link)
</script>

<template>
  <section :id="section.id" class="content-section" :class="[`section-${section.kind}`, { 'section-empty': !section.items.length }]" :aria-labelledby="`${section.id}-title`">
    <div class="container section-layout">
      <div class="section-label"><span class="section-number">{{ String(number).padStart(2, '0') }}</span><span>{{ section.label }}</span></div>
      <div class="section-content">
        <h2 :id="`${section.id}-title`">{{ section.title }}</h2>
        <p v-if="section.intro" class="section-intro">{{ section.intro }}</p>
        <ol v-if="section.kind === 'process'" class="process-list">
          <li v-for="(item, index) in section.items" :key="item.title"><span class="item-number">{{ String(index + 1).padStart(2, '0') }}</span><div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div></li>
        </ol>
        <div v-else-if="section.items.length" class="section-items">
          <article v-for="(item, index) in section.items" :key="item.title" class="section-item">
            <span v-if="['rows', 'projects'].includes(section.kind)" class="item-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ item.title }}</h3><p>{{ item.text }}</p>
            <ul v-if="item.tags?.length" class="tags" aria-label="Направления работы"><li v-for="tag in item.tags" :key="tag">{{ tag }}</li></ul>
          </article>
        </div>
        <div v-else class="portfolio-pending"><span class="pending-mark" aria-hidden="true">＋</span><p>{{ section.outro }}</p></div>
        <p v-if="section.outro && section.items.length" class="section-outro">{{ section.outro }}</p>
        <template v-if="sectionLink">
          <NuxtLink :to="sectionLink?.to" class="text-link section-link" :external="sectionLink?.to.startsWith('https://')">{{ sectionLink?.label }} <span aria-hidden="true">↗</span></NuxtLink>
        </template>
      </div>
    </div>
  </section>
</template>
