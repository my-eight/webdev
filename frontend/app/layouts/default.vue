<script setup lang="ts">
const route = useRoute()
const shell = ref<HTMLElement | null>(null)
useScrollReveal(shell)
const theme = computed(() =>
  route.path.includes('web-development')
    ? 'web'
    : route.path.includes('moysklad')
      ? 'stock'
      : route.path.includes('design')
        ? 'design'
        : 'home',
)
</script>
<template>
  <div ref="shell" class="site-shell" :class="`theme-${theme}`">
    <UiInteractiveGrid />
    <a class="skip-link" href="#main">{{ typography('Перейти к содержанию') }}</a>
    <LayoutSiteHeader />
    <LayoutMobileActionBar />
    <main id="main" tabindex="-1"><slot /></main>
    <LayoutSiteFooter />
  </div>
</template>
<style src="~/assets/styles/components/site-motion.css" />
