<script setup lang="ts">
import type { ServicePageData } from '~/types/service'
defineProps<{ page: ServicePageData }>()
</script>
<template>
  <section class="service-hero container" aria-labelledby="service-title">
    <div class="hero-copy">
      <h1 id="service-title">
        <span class="hero-title-label">{{ typography(page.heading) + ' ' }}</span>
        <em class="hero-title-message">
          <span v-for="(line, index) in page.emphasis" :key="index" class="hero-title-line">{{ typography(line) + ' ' }}</span>
        </em>
      </h1>
      <div class="hero-description">
        <p class="hero-lead">{{ typography(page.lead) }}</p>
        <p class="hero-detail">{{ typography(page.detail) }}</p>
      </div>
      <div class="hero-actions">
        <a href="#contact" class="button button-primary">Обсудить задачу <span aria-hidden="true">↗</span></a
        ><a :href="page.secondary.to" class="text-link"
          ><span class="text-link-label">{{ typography(page.secondary.label) }}</span
          ><span class="text-link-arrow" aria-hidden="true">↓</span></a
        >
      </div>
    </div>
    <UiVisualStudy :theme="page.theme" />
  </section>
</template>
