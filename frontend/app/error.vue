<script setup lang="ts">
import type { NuxtError } from '#app'
const props = defineProps<{ error: NuxtError }>()
useSeoMeta({
  title: props.error.statusCode === 404 ? 'Страница не найдена' : 'Не удалось открыть страницу',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="error-page container">
    <span class="eyebrow">{{ error.statusCode }}</span>
    <h1>{{ typography(error.statusCode === 404 ? 'Здесь пока ничего нет' : 'Страница не открылась') }}</h1>
    <p>{{ typography('Откройте разработку или выберите другое направление в меню') }}</p>
    <button class="button button-primary" @click="clearError({ redirect: '/web-development' })">
      {{ typography('К разработке') }} <UiArrow />
    </button>
  </main>
</template>
