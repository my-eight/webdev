<script setup lang="ts">
import { site } from '~/config/site'
const route = useRoute()
const currentPath = computed(() => route.path.replace(/\/+$/, '') || '/')
const identity = usePageIdentity()
const menuOpen = ref(false)
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink to="/" class="wordmark" :aria-label="identity ? `${identity.name} — на главную` : 'На главную'">
        <span class="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span v-if="identity">{{ identity.name }}<span class="wordmark-caption">{{ identity.caption }}</span></span>
        <span v-else class="wordmark-neutral">Разработка<br>Автоматизация · Дизайн</span>
      </NuxtLink>
      <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="main-navigation" @click="menuOpen = !menuOpen" @keydown.esc="menuOpen = false">
        {{ menuOpen ? 'Закрыть' : 'Меню' }} <span aria-hidden="true">{{ menuOpen ? '−' : '+' }}</span>
      </button>
      <nav id="main-navigation" class="main-navigation" :class="{ 'is-open': menuOpen }" aria-label="Основная навигация" @keydown.esc="menuOpen = false">
        <NuxtLink v-for="item in site.navigation" :key="item.path" :to="item.path" :aria-current="currentPath === item.path ? 'page' : undefined" :class="['nav-link', `nav-${item.theme}`]">
          {{ item.label }}
        </NuxtLink>
        <NuxtLink :to="{ path: route.path, hash: '#contact' }" class="header-contact" @click="menuOpen = false">Обсудить задачу <span aria-hidden="true">↗</span></NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style src="~/assets/styles/components/layout.css" />
