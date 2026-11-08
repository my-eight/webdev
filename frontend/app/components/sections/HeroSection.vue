<script setup lang="ts">
import type { ServicePageData } from '~/types/service'
defineProps<{ page: ServicePageData }>()
</script>
<template>
  <section class="service-hero container" aria-labelledby="service-title">
    <div class="hero-copy">
      <h1 id="service-title">
        <span class="hero-title-label">{{ typography(page.heading) + ' ' }}</span>
        <span class="hero-title-message">{{ typography(page.emphasis.join(' ')) }}</span>
      </h1>
      <div class="hero-description">
        <p class="hero-lead">{{ typography(page.lead) }}</p>
        <p class="hero-detail">{{ typography(page.detail) }}</p>
      </div>
      <div class="hero-actions">
        <a href="#contact" class="button button-primary">Обсудить задачу <span aria-hidden="true">↗</span></a
        >
      </div>
    </div>
    <!-- Hero visual temporarily disabled while its replacement is designed
    <UiVisualStudy :theme="page.theme" />
    -->
  </section>
</template>
