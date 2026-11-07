<script setup lang="ts">
import { site } from '~/config/site'
const identity = usePageIdentity()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-main">
      <NuxtLink to="/" class="footer-signature">Мастерство.<br>Порядок.<br><em>Внимание к деталям.</em></NuxtLink>
      <nav aria-label="Направления в подвале">
        <span class="eyebrow">Направления</span>
        <NuxtLink v-for="item in site.navigation" :key="item.path" :to="item.path">{{ item.label }} <span aria-hidden="true">↗</span></NuxtLink>
      </nav>
      <div class="footer-info">
        <template v-if="identity"><span class="eyebrow">Личная работа</span><p>{{ identity.person.name }}<br><span>{{ identity.caption }}</span></p></template>
        <template v-else><span class="eyebrow">Формат работы</span><p>По договору<br><span>Согласованное задание, акт и чек</span></p><p>Россия<br><span>Удалённая работа</span></p></template>
      </div>
    </div>
    <div class="container footer-bottom"><span>© {{ new Date().getFullYear() }} {{ identity ? identity.person.name : 'Разработка · Автоматизация · Дизайн' }}</span><span>Россия · Удалённо</span><a href="#main">К началу страницы ↑</a></div>
  </footer>
</template>
