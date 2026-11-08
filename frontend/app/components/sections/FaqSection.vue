<script setup lang="ts">
import type { FaqItem } from '~/types/service'
const props = defineProps<{ items: FaqItem[] }>()
const columns = computed(() => {
  const middle = Math.ceil(props.items.length / 2)
  return [props.items.slice(0, middle), props.items.slice(middle)].filter((column) => column.length)
})
</script>
<template>
  <section id="faq" class="content-section section-faq" aria-labelledby="faq-title">
    <div class="container section-layout">
      <div class="section-content">
        <h2 id="faq-title" :aria-label="typography('Вопросы и ответы')">
          <span class="section-title-full">{{ typography('Вопросы и ответы') }}</span>
          <span class="section-title-compact">Вопросы</span>
        </h2>
        <div class="faq-list">
          <div v-for="(column, index) in columns" :key="index" class="faq-column">
            <details v-for="item in column" :key="item.question" open>
              <summary>{{ typography(item.question) }}<span aria-hidden="true" class="faq-icon">+</span></summary>
              <p>{{ typography(item.answer) }}</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
