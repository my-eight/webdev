<script setup lang="ts">
import { people } from '~/data/people'
const props = defineProps<{ person: 'slava' | 'erin'; title: string; text: string; prompts?: string[] }>()
const personKey = computed(() => props.person)
const person = computed(() => people[personKey.value])
const contacts = usePersonContacts(personKey)
</script>

<template>
  <section id="contact" class="contact-section" aria-labelledby="contact-title">
    <div class="container contact-layout">
      <div class="contact-copy"><span class="eyebrow"><span class="small-square" /> Следующий шаг</span><h2 id="contact-title">{{ title }}</h2><p>{{ text }}</p>
        <ul v-if="prompts?.length" class="contact-prompts"><li v-for="prompt in prompts" :key="prompt">{{ prompt }}</li></ul>
      </div>
      <div class="contact-card">
        <div class="contact-person"><span class="contact-monogram" aria-hidden="true">{{ personKey === 'slava' ? 'С' : 'Э' }}</span><div><h3>{{ person.name }}</h3><p>{{ person.role }}</p></div></div>
        <div v-if="contacts.telegram || contacts.phone || contacts.email" class="contact-links">
          <a v-if="contacts.telegram" :href="contacts.telegram" class="contact-method contact-method-primary"><span class="contact-method-copy"><span class="contact-method-label">Написать в Telegram</span><span class="contact-method-value">{{ contacts.telegramLabel }}</span></span><span class="contact-method-arrow" aria-hidden="true">↗</span></a>
          <a v-if="contacts.phone" :href="contacts.phone" class="contact-method"><span class="contact-method-copy"><span class="contact-method-label">Позвонить</span><span class="contact-method-value">{{ contacts.phoneLabel }}</span></span><span class="contact-method-arrow" aria-hidden="true">↗</span></a>
          <a v-if="contacts.email" :href="contacts.email" class="contact-method"><span class="contact-method-copy"><span class="contact-method-label">Написать на почту</span><span class="contact-method-value">{{ contacts.emailLabel }}</span></span><span class="contact-method-arrow" aria-hidden="true">↗</span></a>
        </div>
        <p v-else class="contact-pending" role="status">Контакты появятся перед запуском сайта.</p>
        <a v-if="personKey === 'erin'" href="https://www.behance.net/erinart" class="text-link portfolio-link">Портфолио на Behance <span aria-hidden="true">↗</span></a>
        <p class="contact-footnote">Россия · Работаю удалённо<br>Можно начать с описания своими словами.</p>
      </div>
    </div>
  </section>
</template>

<style src="~/assets/styles/components/contact.css" />
