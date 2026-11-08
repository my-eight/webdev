<script setup lang="ts">
import type { ServicePageData } from '~/types/service'
import { people } from '~/data/people'
import ContactSection from '~/features/contact/ContactSection.vue'
import ProjectQuiz from '~/features/quiz/ProjectQuiz.vue'
const props = defineProps<{ page: ServicePageData }>()
usePageSeo({
  title: props.page.title,
  description: props.page.description,
  path: props.page.path,
  person: people[props.page.person],
  serviceName:
    props.page.theme === 'web'
      ? 'Разработка сайтов и веб-приложений'
      : props.page.theme === 'stock'
        ? 'Внедрение МойСклад и автоматизация'
        : 'Графический и бренд-дизайн',
})
</script>

<template>
  <div class="service-page" :class="`theme-${page.theme}`">
    <SectionsHeroSection :page="page" />
    <UiDirectionRibbon :theme="page.theme" />
    <template v-for="section in page.sections" :key="section.id">
      <SectionsWorkProcess v-if="section.kind === 'process'" :section="section" />
      <SectionsPricingSection v-else-if="section.kind === 'pricing'" :section="section" />
      <SectionsPortfolioSection v-else-if="section.kind === 'projects'" :section="section" />
      <SectionsContentSection v-else :section="section" />
    </template>
    <SectionsFaqSection :items="page.faqs" />
    <ProjectQuiz :key="page.theme" :theme="page.theme" />
    <ContactSection
      :person="page.person"
      :title="page.contact.title"
      :text="page.contact.text"
      :prompts="page.contact.prompts"
    />
  </div>
</template>

<style src="~/assets/styles/pages/service.css" />
