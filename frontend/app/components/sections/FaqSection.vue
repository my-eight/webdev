<script setup lang="ts">
import type { FaqItem } from '~/types/service'
defineProps<{ items: FaqItem[]; number: number }>()
</script>

<template>
  <section id="faq" class="content-section section-faq" aria-labelledby="faq-title">
    <div class="container section-layout">
      <div class="section-label"><span class="section-number">{{ String(number).padStart(2, '0') }}</span><span>Частые вопросы</span></div>
      <div class="section-content"><h2 id="faq-title">Что ещё важно знать.</h2>
        <div class="faq-list"><details v-for="item in items" :key="item.question"><summary>{{ item.question }}<span aria-hidden="true" class="faq-icon">+</span></summary><p>{{ item.answer }}</p></details></div>
      </div>
    </div>
  </section>
</template>
