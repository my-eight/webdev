<script setup lang="ts">
import ContactSection from '~/features/contact/ContactSection.vue'
import { site } from '~/config/site'
usePageSeo({ title: site.name, description: site.description, path: '/' })
const directions = [
  {
    theme: 'web',
    title: 'Разработка',
    to: '/web-development',
    description: 'Сайты, магазины и веб-приложения — разработка, доработки и интеграции',
    symbol: '</>',
  },
  {
    theme: 'stock',
    title: 'МойСклад',
    to: '/moysklad',
    description: 'Учёт, обмен данными и автоматизация — система, в которой удобно работать',
    symbol: '↔',
  },
  {
    theme: 'design',
    title: 'Дизайн',
    to: '/design',
    description: 'Айдентика, упаковка и веб-дизайн — визуальный образ с характером',
    symbol: '✳',
  },
]
</script>
<template>
  <div class="home-page">
    <div class="first-screen">
    <section class="home-hero container" aria-labelledby="home-title">
      <div class="home-hero-copy">
        <h1 id="home-title">
          <span class="home-word-web">{{ 'Сайты ' }}</span
          ><span class="home-word-stock">{{ 'Системы ' }}</span
          ><span class="home-word-design">Дизайн</span>
        </h1>
        <p class="home-tagline">{{ typography('Технологии и характер') }}</p>
        <p class="home-lead">
          {{ typography('Для вашего бизнеса и его следующего шага') }}
        </p>
        <a href="#directions" class="button button-primary">Выбрать направление <span aria-hidden="true">↓</span></a>
      </div>
      <UiSamuraiEnsemble />
    </section>
    <UiDirectionRibbon theme="home" />
    </div>
    <section id="directions" class="home-directions container" aria-labelledby="directions-title">
      <div class="home-section-heading">
        <h2 id="directions-title">{{ 'Ваша задача ' }}<br />Нужное решение</h2>
      </div>
      <div class="direction-grid">
        <NuxtLink
          v-for="item in directions"
          :key="item.to"
          :to="item.to"
          class="direction-card"
          :class="`theme-${item.theme}`"
          ><span class="direction-symbol" aria-hidden="true">{{ item.symbol }}</span
          ><span class="direction-arrow" aria-hidden="true">↗</span>
          <h3>{{ typography(item.title) }}</h3>
          <p>{{ typography(item.description) }}</p>
          <span class="direction-more">Подробнее <span aria-hidden="true">→</span></span></NuxtLink
        >
      </div>
    </section>
    <section class="home-approach container" aria-labelledby="approach-title">
      <h2 id="approach-title">{{ 'Чёткая задача ' }}<br /><em>Продуманный результат</em></h2>
      <div class="home-principles">
        <article>
          <h3>Разобраться</h3>
          <p>{{ typography('Понять ваш бизнес, контекст и нужный результат') }}</p>
        </article>
        <article>
          <h3>Договориться</h3>
          <p>{{ typography('Зафиксировать объём, стоимость и критерии готовности') }}</p>
        </article>
        <article>
          <h3>Реализовать</h3>
          <p>{{ typography('Выполнить работу, проверить и передать результат') }}</p>
        </article>
      </div>
    </section>
    <ContactSection
      person="slava"
      title="Начнём с вашей задачи"
      text="Расскажите, что хотите создать или изменить. Помогу определить подходящий следующий шаг."
    />
  </div>
</template>
<style src="~/assets/styles/pages/home.css" />
