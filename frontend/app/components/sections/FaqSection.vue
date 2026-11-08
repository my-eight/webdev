<script setup lang="ts">
import type { FaqItem } from '~/types/service'
import { typeText, finishTypingWithin } from '~/utils/typewriter'
const props = defineProps<{ items: FaqItem[] }>()
const selected = ref(0)
const list = ref<HTMLElement | null>(null)
const id = `faq-${useId().replaceAll(':', '')}`
watch(() => props.items, () => {
  if (list.value) finishTypingWithin(list.value)
  selected.value = 0
})
onBeforeUnmount(() => { if (list.value) finishTypingWithin(list.value) })

async function select(index: number) {
  if (selected.value === index) return
  if (list.value) finishTypingWithin(list.value)
  selected.value = index
  await nextTick()
  if (selected.value !== index) return
  const answer = list.value?.querySelector<HTMLElement>('.faq-entry.is-active .faq-answer p')
  if (answer) typeText(answer, { delay: 60 })
  if (!window.matchMedia('(max-width: 760px)').matches) return
  const question = list.value?.querySelectorAll<HTMLButtonElement>('.faq-question')[index]
  question?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
}

function navigate(event: KeyboardEvent, index: number) {
  let next: number
  if (event.key === 'ArrowDown') next = (index + 1) % props.items.length
  else if (event.key === 'ArrowUp') next = (index - 1 + props.items.length) % props.items.length
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = props.items.length - 1
  else return
  event.preventDefault()
  list.value?.querySelectorAll<HTMLButtonElement>('.faq-question')[next]?.focus()
}
</script>
<template>
  <section id="faq" class="content-section section-faq" aria-labelledby="faq-title">
    <div class="container section-layout">
      <div class="section-content">
        <h2 id="faq-title" :aria-label="typography('Вопросы и ответы')">
          <span class="section-title-full">{{ typography('Вопросы и ответы') }}</span>
          <span class="section-title-compact">Вопросы</span>
        </h2>
        <div ref="list" class="faq-layout" :style="{ '--faq-count': items.length }">
          <div v-for="(item, index) in items" :key="item.question" class="faq-entry" :class="{ 'is-active': selected === index }">
            <button
              :id="`${id}-question-${index}`"
              class="faq-question"
              type="button"
              :style="{ gridRow: index + 1 }"
              :aria-expanded="selected === index"
              :aria-disabled="selected === index ? true : undefined"
              :aria-controls="`${id}-answer-${index}`"
              @click="select(index)"
              @keydown="navigate($event, index)"
            >
              <span>{{ typography(item.question) }}</span>
              <span class="faq-icon" aria-hidden="true">{{ selected === index ? '−' : '+' }}</span>
            </button>
            <div
              :id="`${id}-answer-${index}`"
              class="faq-answer"
              role="region"
              :aria-labelledby="`${id}-question-${index}`"
              :aria-hidden="selected !== index"
              :inert="selected !== index"
            >
              <p>{{ typography(item.answer) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
