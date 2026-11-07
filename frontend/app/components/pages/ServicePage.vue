<script setup lang="ts">
import type { ServicePageData } from '~/types/service'
import { people } from '~/data/people'
import ContactSection from '~/features/contact/ContactSection.vue'
const props = defineProps<{ page: ServicePageData }>()
usePageSeo({ title: props.page.title, description: props.page.description, path: props.page.path, person: people[props.page.person], serviceName: props.page.theme === 'web' ? 'Разработка сайтов и веб-приложений' : props.page.theme === 'stock' ? 'Внедрение МойСклад и автоматизация' : 'Графический и бренд-дизайн' })
</script>

<template>
  <div class="service-page" :class="`theme-${page.theme}`">
    <SectionsHeroSection :page="page" />
    <nav class="page-navigation" aria-label="Разделы страницы"><div class="container"><span class="page-nav-caption">На странице</span><a v-for="anchor in page.anchors" :key="anchor.id" :href="`#${anchor.id}`">{{ anchor.label }}</a><a href="#contact" class="page-nav-contact">Обсудить задачу ↗</a></div></nav>
    <SectionsContentSection v-for="(section, index) in page.sections" :key="section.id" :section="section" :number="index + 2" />
    <SectionsFaqSection :items="page.faqs" :number="page.sections.length + 2" />
    <ContactSection :person="page.person" :title="page.contact.title" :text="page.contact.text" :prompts="page.contact.prompts" />
  </div>
</template>

<style src="~/assets/styles/pages/service.css" />
