<script setup lang="ts">
import ContactSection from '~/features/contact/ContactSection.vue'
import { site } from '~/config/site'
usePageSeo({ title: site.name, description: site.description, path: '/' })
const directions = [
  { theme: 'web', title: 'Веб-разработка', to: '/web-development', description: 'Сайты, интернет-магазины и веб-приложения. От готового макета до запуска и дальнейшего развития.', tags: 'Разработка · Доработки · Интеграции' },
  { theme: 'stock', title: 'МойСклад', to: '/moysklad', description: 'Учёт, в котором есть порядок. Внедрение, связь с другими системами и автоматизация ежедневной работы.', tags: 'Внедрение · Автоматизация · Обучение' },
  { theme: 'design', title: 'Дизайн', to: '/design', description: 'Цельный визуальный образ бренда. От логотипа и упаковки до сайта, мерча и оформления событий.', tags: 'Айдентика · Упаковка · Веб-дизайн' },
]
</script>

<template>
  <div class="home-page">
    <section class="home-hero container" aria-labelledby="home-title">
      <div class="home-hero-copy"><div class="eyebrow"><span class="small-square" /> Личная работа. Продуманный результат.</div><h1 id="home-title">Сайты.<br>Системы.<br><em>Дизайн.</em></h1><p class="home-lead">От вашей задачи — к решению,<br>в котором всё на своём месте.</p><a href="#directions" class="button button-primary">Выбрать направление <span aria-hidden="true">↓</span></a></div>
      <div class="home-hero-art"><UiVisualStudy theme="home" /><p class="home-art-note"><span>Подход</span>Мастерство. Порядок.<br>Внимание к деталям.</p></div>
      <div class="home-hero-bottom"><span>Разработка · Автоматизация · Дизайн</span><span>Россия · Удалённо <span class="status-dot" aria-hidden="true" /></span><a href="#directions" aria-label="Перейти к направлениям" class="scroll-cue">↓</a></div>
    </section>
    <section id="directions" class="home-directions" aria-labelledby="directions-title"><div class="container"><div class="home-section-heading"><span class="eyebrow">Направления</span><h2 id="directions-title">Что нужно<br><em>вашему проекту?</em></h2><p>В каждом направлении —<br>внимание к вашей задаче.</p></div>
      <NuxtLink v-for="item in directions" :key="item.to" :to="item.to" class="direction-row" :class="`theme-${item.theme}`"><span class="small-square direction-marker" aria-hidden="true" /><div class="direction-name"><h3>{{ item.title }}</h3></div><div class="direction-description"><p>{{ item.description }}</p><span>{{ item.tags }}</span></div><span class="direction-arrow" aria-hidden="true">↗</span></NuxtLink>
    </div></section>
    <section class="home-approach container" aria-labelledby="approach-title"><div><span class="eyebrow">В основе работы</span><h2 id="approach-title">Хорошая работа<br>начинается<br><em>с ясности.</em></h2></div><div class="home-principles"><p class="approach-intro">Понятная задача. Согласованный объём.<br>Внимание к тому, как результат будет жить дальше.</p><article><span>01</span><div><h3>Сначала — разобраться</h3><p>Изучить задачу и контекст, задать вопросы, определить подходящий следующий шаг.</p></div></article><article><span>02</span><div><h3>Зафиксировать договорённости</h3><p>Согласовать объём, стоимость и критерии готовности. Оформить договор и задание.</p></div></article><article><span>03</span><div><h3>Довести до результата</h3><p>Последовательно выполнить работу, проверить детали и передать согласованные материалы.</p></div></article></div></section>
    <ContactSection person="slava" title="Начнём с вашей задачи." text="Расскажите мне, что хотите создать или изменить. Для первого разговора достаточно описать идею своими словами." />
  </div>
</template>

<style src="~/assets/styles/pages/home.css" />
