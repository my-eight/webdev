<script setup lang="ts">
import type { ServicePageData } from '~/types/service'
defineProps<{ page: ServicePageData }>()
</script>

<template>
  <section class="service-hero container" aria-labelledby="service-title">
    <div class="hero-copy">
      <div class="eyebrow direction-label"><span class="small-square" />{{ page.eyebrow }}</div>
      <h1 id="service-title">{{ page.heading }}<br><em>{{ page.emphasis }}</em></h1>
      <p class="hero-lead">{{ page.lead }}</p>
      <p class="hero-detail">{{ page.detail }}</p>
      <div class="hero-actions"><a href="#contact" class="button button-primary">Обсудить задачу <span aria-hidden="true">↗</span></a><a :href="page.secondary.to" class="text-link"><span class="text-link-label">{{ page.secondary.label }}</span><span class="text-link-arrow" aria-hidden="true">↓</span></a></div>
      <p class="hero-note">{{ page.note }}</p>
    </div>
    <UiVisualStudy :theme="page.theme" />
    <div class="hero-trust"><span>Лично. По договору.</span><ul aria-label="Порядок оформления работы"><li>Согласованное задание</li><li>Акт приёмки</li><li>Чек</li></ul><span class="hero-geography">Россия · Удалённо</span></div>
  </section>
</template>
