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
      <div class="contact-copy">
        <h2 id="contact-title">{{ typography(title) }}</h2>
        <p>{{ typography(text) }}</p>
        <ul v-if="prompts?.length" class="contact-prompts">
          <li v-for="prompt in prompts" :key="prompt">{{ typography(prompt) }}</li>
        </ul>
      </div>
      <div class="contact-card">
        <div class="contact-person">
          <span class="contact-monogram" aria-hidden="true">{{ personKey === 'slava' ? 'С' : 'Э' }}</span>
          <div>
            <h3>{{ typography(person.name) }}</h3>
            <p>{{ typography(person.role) }}</p>
          </div>
        </div>
        <div v-if="contacts.telegram || contacts.phone || contacts.email" class="contact-links">
          <a
            v-if="contacts.telegram"
            :href="contacts.telegram"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-method contact-method-primary"
            ><span class="contact-method-copy"
              ><span class="contact-method-label">{{ typography('Написать в Telegram') }}</span
              ><span class="contact-method-value">{{ contacts.telegramLabel }}</span></span
            ><span class="contact-method-arrow" aria-hidden="true">↗</span></a
          >
          <a v-if="contacts.phone" :href="contacts.phone" class="contact-method"
            ><span class="contact-method-copy"
              ><span class="contact-method-label">Позвонить</span
              ><span class="contact-method-value">{{ contacts.phoneLabel }}</span></span
            ><span class="contact-method-arrow" aria-hidden="true">↗</span></a
          >
          <a
            v-if="contacts.email"
            :href="contacts.email"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-method"
            ><span class="contact-method-copy"
              ><span class="contact-method-label">{{ typography('Написать на почту') }}</span
              ><span class="contact-method-value">{{ contacts.emailLabel }}</span></span
            ><span class="contact-method-arrow" aria-hidden="true">↗</span></a
          >
        </div>
        <p v-else class="contact-pending" role="status">{{ typography('Контакты появятся перед запуском сайта') }}</p>
        <a v-if="personKey === 'erin'" href="https://www.behance.net/erinart" class="text-link portfolio-link"
          ><span class="text-link-label">{{ typography('Портфолио на Behance') }}</span
          ><span class="text-link-arrow" aria-hidden="true">↗</span></a
        >
      </div>
    </div>
  </section>
</template>

<style src="~/assets/styles/components/contact.css" />
