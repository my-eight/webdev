<script setup lang="ts">
import { site } from '~/config/site'
import type { Direction } from '~/types/service'
const route = useRoute()
const currentPath = computed(() => route.path.replace(/\/+$/, '') || '/')
const identity = usePageIdentity()
const menuOpen = ref(false)
const expandedSection = ref<Direction | null>(null)
const scrolled = ref(false)
const header = ref<HTMLElement | null>(null)
const menuToggle = ref<HTMLButtonElement | null>(null)

function closeMenu(restoreFocus = false) {
  menuOpen.value = false
  expandedSection.value = null
  if (restoreFocus) menuToggle.value?.focus({ preventScroll: true })
}
function toggleSection(theme: Direction) {
  expandedSection.value = expandedSection.value === theme ? null : theme
}
function openSectionOnHover(theme: Direction, event: PointerEvent) {
  if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1201px) and (hover: hover)').matches)
    expandedSection.value = theme
}
function leaveSection(theme: Direction, event: PointerEvent) {
  if (expandedSection.value !== theme || event.pointerType !== 'mouse') return
  if ((event.currentTarget as HTMLElement).contains(document.activeElement)) return
  expandedSection.value = null
}
function leaveSectionFocus(theme: Direction, event: FocusEvent) {
  if (
    expandedSection.value === theme &&
    !(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)
  )
    expandedSection.value = null
}
async function focusFirstSection(theme: Direction) {
  expandedSection.value = theme
  await nextTick()
  header.value?.querySelector<HTMLAnchorElement>(`#sections-${theme} a`)?.focus()
}
function updateScroll() {
  scrolled.value = window.scrollY > 8
}
function closeOutside(event: Event) {
  if (
    (menuOpen.value || expandedSection.value) &&
    event.target instanceof Node &&
    !header.value?.contains(event.target)
  )
    closeMenu()
}
function onEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  if (expandedSection.value) {
    event.preventDefault()
    const theme = expandedSection.value
    expandedSection.value = null
    header.value?.querySelector<HTMLButtonElement>(`[data-section-toggle="${theme}"]`)?.focus({ preventScroll: true })
  } else if (menuOpen.value) {
    event.preventDefault()
    closeMenu(true)
  }
}
function onResize() {
  closeMenu()
}

watch(
  () => route.fullPath,
  () => closeMenu(),
)
onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('resize', onResize)
  document.addEventListener('pointerdown', closeOutside)
  document.addEventListener('focusin', closeOutside)
  document.addEventListener('keydown', onEscape)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('pointerdown', closeOutside)
  document.removeEventListener('focusin', closeOutside)
  document.removeEventListener('keydown', onEscape)
})
</script>
<template>
  <header
    ref="header"
    class="site-header"
    :class="{ 'is-scrolled': scrolled, 'is-menu-open': menuOpen, 'is-sections-open': expandedSection }"
  >
    <div class="container header-inner">
      <div class="wordmark">
        <UiBrandLogo :name="identity?.name" />
      </div>
      <button
        ref="menuToggle"
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
        aria-controls="main-navigation"
        @click="menuOpen ? closeMenu() : (menuOpen = true)"
      >
        {{ menuOpen ? 'Закрыть' : 'Меню' }} <span aria-hidden="true">{{ menuOpen ? '−' : '+' }}</span>
      </button>
      <nav
        id="main-navigation"
        class="main-navigation"
        :class="{ 'is-open': menuOpen }"
        aria-label="Основная навигация"
      >
        <div
          v-for="item in site.navigation"
          :key="item.path"
          class="nav-direction"
          :class="`nav-${item.theme}`"
          @pointerenter="openSectionOnHover(item.theme, $event)"
          @pointerleave="leaveSection(item.theme, $event)"
          @focusout="leaveSectionFocus(item.theme, $event)"
        >
          <NuxtLink
            :to="item.path"
            :aria-current="currentPath === item.path ? 'page' : undefined"
            class="nav-link"
            @focus="expandedSection = item.theme"
            @keydown.down.prevent="focusFirstSection(item.theme)"
            @click="closeMenu()"
          >
            {{ typography(item.label) }}
          </NuxtLink>
          <button
            type="button"
            class="nav-disclosure"
            :data-section-toggle="item.theme"
            :aria-label="`Разделы: ${item.label}`"
            :aria-controls="`sections-${item.theme}`"
            :aria-expanded="expandedSection === item.theme"
            @click="toggleSection(item.theme)"
            @keydown.down.prevent="focusFirstSection(item.theme)"
          >
            <svg viewBox="0 0 12 8" fill="none" aria-hidden="true">
              <path d="m2 2 4 4 4-4" stroke="currentColor" stroke-width="1.4" />
            </svg>
          </button>
          <div v-show="expandedSection === item.theme" :id="`sections-${item.theme}`" class="direction-submenu">
            <div class="submenu-panel">
              <NuxtLink
                v-for="section in item.sections"
                :key="section.id"
                :to="{ path: item.path, hash: `#${section.id}` }"
                @click="closeMenu()"
                >{{ typography(section.label) }} <UiArrow /></NuxtLink
              >
            </div>
          </div>
        </div>
        <NuxtLink :to="{ path: route.path, hash: '#contact' }" class="button button-primary button-contact header-contact" @click="closeMenu()"
          >Обсудить задачу <UiArrow /></NuxtLink
        >
      </nav>
    </div>
  </header>
</template>
<style src="~/assets/styles/components/layout.css" />
