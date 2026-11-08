<script setup lang="ts">
import { quizzes } from '~/data/quizzes'
import type { Direction } from '~/types/service'
import type { ChoiceQuestion } from '~/types/quiz'

const props = defineProps<{ theme: Direction }>()
const quiz = quizzes[props.theme]
const step = ref(0)
const answers = ref<Record<string, string[]>>({})
const name = ref('')
const contact = ref('')
const complete = ref(false)
const receipt = ref('')
const questionTitle = ref<HTMLElement | null>(null)
const resultTitle = ref<HTMLElement | null>(null)
const quizSection = ref<HTMLElement | null>(null)
const current = computed(() => quiz.questions[step.value]!)
const selected = computed(() => answers.value[current.value.id] || [])
const canContinue = computed(() => current.value.kind === 'contact' ? contact.value.trim().length >= 3 : selected.value.length > 0)
const answered = (index: number) => {
  const question = quiz.questions[index]!
  return question.kind === 'contact' ? contact.value.trim().length >= 3 : Boolean(answers.value[question.id]?.length)
}

function choose(question: ChoiceQuestion, id: string) {
  const previous = answers.value[question.id] || []
  if (question.kind === 'single') answers.value[question.id] = [id]
  else if (previous.includes(id)) answers.value[question.id] = previous.filter((item) => item !== id)
  else if (question.options.find((option) => option.id === id)?.exclusive) answers.value[question.id] = [id]
  else answers.value[question.id] = [...previous.filter((item) => !question.options.find((option) => option.id === item)?.exclusive), id]
}
async function moveTo(index: number) {
  step.value = index
  await nextTick()
  questionTitle.value?.focus({ preventScroll: true })
  const top = questionTitle.value?.getBoundingClientRect().top ?? 0
  const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'))
  if (top < headerHeight + 16) questionTitle.value?.scrollIntoView({ block: 'start', behavior: 'auto' })
}
async function next() {
  if (!canContinue.value) return
  if (step.value < quiz.questions.length - 1) return moveTo(step.value + 1)
  const missing = quiz.questions.findIndex((_, index) => !answered(index))
  if (missing !== -1) return moveTo(missing)
  const number = (crypto.getRandomValues(new Uint32Array(1))[0]! % 900000) + 100000
  receipt.value = `ДЕМО-${quiz.code}-${number}`
  complete.value = true
  await nextTick()
  resultTitle.value?.focus({ preventScroll: true })
  quizSection.value?.scrollIntoView({ block: 'start', behavior: 'auto' })
}
async function reset() {
  answers.value = {}
  name.value = ''
  contact.value = ''
  receipt.value = ''
  complete.value = false
  await moveTo(0)
}
</script>

<template>
  <section id="quiz" ref="quizSection" class="project-quiz content-section" aria-labelledby="quiz-title">
    <div class="container">
      <h2 id="quiz-title" class="quiz-heading" :aria-label="typography('Расскажите о задаче')">
        <span class="section-title-full">{{ typography('Расскажите о задаче') }}</span>
        <span class="section-title-compact">Мини-квиз</span>
      </h2>
      <div class="quiz-shell" :class="{ 'quiz-shell-complete': complete }">
        <template v-if="!complete">
          <aside class="quiz-sidebar" aria-label="Этапы квиза">
            <p class="quiz-sidebar-title">Этапы</p>
            <ol>
              <li v-for="(question, index) in quiz.questions" :key="question.id">
                <button type="button" :disabled="index > step && !answered(index)" :aria-current="index === step ? 'step' : undefined" @click="moveTo(index)">
                  <span class="quiz-step-mark" aria-hidden="true"><svg v-if="answered(index)" viewBox="0 0 16 16" fill="none"><path d="m3 8 3 3 7-7" /></svg></span>
                  {{ typography(question.stepLabel) }}
                </button>
              </li>
            </ol>
            <p class="quiz-demo-label">{{ typography('Демо-режим — без отправки') }}</p>
          </aside>
          <form class="quiz-form" @submit.prevent="next">
            <div class="quiz-progress-copy" aria-live="polite"><span>Вопрос {{ step + 1 }} из {{ quiz.questions.length }}</span><span>Короткий бриф</span></div>
            <div class="quiz-progress" role="progressbar" aria-label="Прогресс квиза" :aria-valuenow="step" :aria-valuemax="quiz.questions.length" aria-valuemin="0">
              <span v-for="index in quiz.questions.length" :key="index" :class="{ 'is-complete': index <= step, 'is-current': index === step + 1 }" />
            </div>
            <h3 ref="questionTitle" class="quiz-question-title" tabindex="-1">{{ typography(current.title) }}</h3>
            <p class="quiz-instruction">{{ typography(current.kind === 'multiple' ? 'Можно выбрать несколько вариантов' : current.kind === 'contact' ? 'Оставьте удобный способ связи' : 'Выберите один вариант') }}</p>
            <fieldset v-if="current.kind !== 'contact'" :key="current.id" class="quiz-options">
              <legend class="quiz-sr-only">{{ typography(current.title) }}</legend>
              <label v-for="option in current.options" :key="option.id" class="quiz-option" :class="{ 'is-selected': selected.includes(option.id) }">
                <input :type="current.kind === 'single' ? 'radio' : 'checkbox'" :name="`quiz-${theme}-${current.id}`" :value="option.id" :checked="selected.includes(option.id)" @change="choose(current as ChoiceQuestion, option.id)" />
                <span class="quiz-option-mark" :class="{ 'is-radio': current.kind === 'single' }" aria-hidden="true"><svg v-if="selected.includes(option.id)" viewBox="0 0 16 16" fill="none"><path d="m3 8 3 3 7-7" /></svg></span>
                <span>{{ typography(option.label) }}</span>
              </label>
            </fieldset>
            <div v-else class="quiz-contact-fields">
              <label :for="`quiz-${theme}-name`">{{ typography('Как к вам обращаться') }} <span>— необязательно</span><input :id="`quiz-${theme}-name`" v-model="name" type="text" autocomplete="name" maxlength="80" placeholder="Ваше имя" /></label>
              <label :for="`quiz-${theme}-contact`">{{ typography('Телеграм, телефон или почта') }}<input :id="`quiz-${theme}-contact`" v-model="contact" type="text" autocomplete="off" required minlength="3" maxlength="150" placeholder="@имя / телефон / почта" /></label>
              <p class="quiz-contact-note">{{ typography('Это демо — ответы остаются только на странице и никуда не передаются') }}</p>
            </div>
            <div class="quiz-controls">
              <button class="button quiz-back" type="button" :disabled="step === 0" @click="moveTo(step - 1)">Назад</button>
              <button class="button button-primary quiz-next" type="submit" :disabled="!canContinue">{{ step === quiz.questions.length - 1 ? 'Отправить' : 'Далее' }} <span aria-hidden="true">→</span></button>
            </div>
            <p class="quiz-mobile-demo">{{ typography('Демо-режим — без отправки') }}</p>
          </form>
        </template>
        <div v-else class="quiz-result" role="status">
          <svg class="quiz-result-icon" viewBox="0 0 72 72" fill="none" aria-hidden="true"><path d="M21 5h30l16 16v30L51 67H21L5 51V21Z" /><path d="m22 35 10 10 19-22" /></svg>
          <span class="quiz-result-demo">Демо-заявка</span>
          <h3 ref="resultTitle" tabindex="-1">Отправлено</h3>
          <p>Ваш номер <strong class="quiz-receipt">{{ receipt }}</strong></p>
          <p>{{ typography('Ответ поступит в течение одного рабочего дня') }}</p>
          <p class="quiz-result-note">{{ typography('Это демонстрация — данные не отправлялись, ожидать ответа пока не нужно') }}</p>
          <button class="button quiz-back" type="button" @click="reset">{{ typography('Пройти ещё раз') }} <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style src="~/assets/styles/components/quiz.css" />
