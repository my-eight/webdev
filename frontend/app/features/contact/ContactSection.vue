<script setup lang="ts">
import { emailLink, telegramLink } from '#shared/utils/site'
import { people } from '~/data/people'
const props = defineProps<{ person: 'slava' | 'erin'; title: string; text: string; prompts?: string[] }>()
const config = useRuntimeConfig().public
const personKey = computed(() => props.person)
const person = computed(() => people[personKey.value])
const telegram = computed(() => telegramLink(personKey.value === 'slava' ? config.slavaTelegram : config.erinTelegram))
const email = computed(() => emailLink(personKey.value === 'slava' ? config.slavaEmail : config.erinEmail))
</script>

<template>
  <section id="contact" class="contact-section" aria-labelledby="contact-title">
    <div class="container contact-layout">
      <div class="contact-copy"><span class="eyebrow"><span class="small-square" /> Следующий шаг</span><h2 id="contact-title">{{ title }}</h2><p>{{ text }}</p>
        <ul v-if="prompts?.length" class="contact-prompts"><li v-for="prompt in prompts" :key="prompt">{{ prompt }}</li></ul>
      </div>
      <div class="contact-card">
        <div class="contact-person"><span class="contact-monogram" aria-hidden="true">{{ personKey === 'slava' ? 'С' : 'Э' }}</span><div><h3>{{ person.name }}</h3><p>{{ person.role }}</p></div></div>
        <div v-if="telegram || email" class="contact-links"><a v-if="telegram" :href="telegram" class="button button-primary">Написать в Telegram <span aria-hidden="true">↗</span></a><a v-if="email" :href="email" class="text-link">Написать на почту <span aria-hidden="true">↗</span></a></div>
        <p v-else class="contact-pending" role="status">Контакты появятся перед запуском сайта.</p>
        <a v-if="personKey === 'erin'" href="https://www.behance.net/erinart" class="text-link portfolio-link">Портфолио на Behance <span aria-hidden="true">↗</span></a>
        <p class="contact-footnote">Россия · Работаю удалённо<br>Можно начать с описания своими словами.</p>
      </div>
    </div>
  </section>
</template>

<style src="~/assets/styles/components/contact.css" />
