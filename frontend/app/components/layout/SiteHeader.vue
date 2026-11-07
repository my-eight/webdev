<script setup lang="ts">
import { site } from '~/config/site'
const route = useRoute()
const currentPath = computed(() => route.path.replace(/\/+$/, '') || '/')
const identity = usePageIdentity()
const menuOpen = ref(false)
const scrolled = ref(false)
const header = ref<HTMLElement | null>(null)
const menuToggle = ref<HTMLButtonElement | null>(null)

function closeMenu(restoreFocus = false) {
  menuOpen.value = false
  if (restoreFocus) menuToggle.value?.focus({ preventScroll: true })
}
function updateScroll() { scrolled.value = window.scrollY > 8 }
function closeOutside(event: PointerEvent) {
  if (menuOpen.value && event.target instanceof Node && !header.value?.contains(event.target)) closeMenu()
}
function onEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    event.preventDefault()
    closeMenu(true)
  }
}
function onResize() { closeMenu() }

watch(() => route.fullPath, () => closeMenu())
onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('resize', onResize)
  document.addEventListener('pointerdown', closeOutside)
  document.addEventListener('keydown', onEscape)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('pointerdown', closeOutside)
  document.removeEventListener('keydown', onEscape)
})
</script>

<template>
  <header ref="header" class="site-header" :class="{ 'is-scrolled': scrolled, 'is-menu-open': menuOpen }">
    <div class="container header-inner">
      <NuxtLink to="/" class="wordmark" :aria-label="identity ? `${identity.name} — на главную` : 'На главную'" @click="closeMenu()">
        <span class="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span v-if="identity">{{ identity.name }}<span class="wordmark-caption">{{ identity.caption }}</span></span>
        <span v-else class="wordmark-neutral">Разработка<br>Автоматизация · Дизайн</span>
      </NuxtLink>
      <button ref="menuToggle" class="menu-toggle" type="button" :aria-expanded="menuOpen" :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'" aria-controls="main-navigation" @click="menuOpen = !menuOpen">
        {{ menuOpen ? 'Закрыть' : 'Меню' }} <span aria-hidden="true">{{ menuOpen ? '−' : '+' }}</span>
      </button>
      <nav id="main-navigation" class="main-navigation" :class="{ 'is-open': menuOpen }" aria-label="Основная навигация">
        <NuxtLink v-for="item in site.navigation" :key="item.path" :to="item.path" :aria-current="currentPath === item.path ? 'page' : undefined" :class="['nav-link', `nav-${item.theme}`]" @click="closeMenu()">
          {{ item.label }}
        </NuxtLink>
        <NuxtLink :to="{ path: route.path, hash: '#contact' }" class="header-contact" @click="closeMenu()">Обсудить задачу <span aria-hidden="true">↗</span></NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style src="~/assets/styles/components/layout.css" />
