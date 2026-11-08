<script setup lang="ts">
import { site } from '~/config/site'
const identity = usePageIdentity()
const personKey = computed(() => (identity.value?.name === 'Эрин' ? 'erin' : 'slava'))
const contacts = usePersonContacts(personKey)
</script>
<template>
  <footer class="site-footer">
    <div class="container footer-main">
      <div class="footer-brand">
        <UiBrandLogo :name="identity?.name" />
        <div class="footer-socials">
          <a v-if="contacts.telegram" :href="contacts.telegram" target="_blank" rel="noopener noreferrer">Telegram <UiArrow /></a
          ><a v-if="contacts.email" :href="contacts.email" target="_blank" rel="noopener noreferrer">Почта <UiArrow /></a>
        </div>
      </div>
      <p class="footer-note">
        {{ typography('Разработка, автоматизация и визуальный образ') + ' ' }}<br />{{
          typography('Удалённо по договору')
        }}
      </p>
    </div>
    <div class="container footer-bottom">
      <span>© {{ new Date().getFullYear() }} m8n</span>
      <nav aria-label="Направления в подвале">
        <NuxtLink v-for="item in site.navigation" :key="item.path" :to="item.path" :class="`nav-${item.theme}`">
          {{ typography(item.label) }}
        </NuxtLink>
      </nav>
      <a href="#main">Наверх <UiArrow direction="up" /></a>
    </div>
  </footer>
</template>
