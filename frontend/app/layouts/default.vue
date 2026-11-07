<template>
  <div class="site-shell">
    <a class="skip-link" href="#main">Перейти к содержанию</a>
    <LayoutSiteHeader />
    <main id="main" tabindex="-1"><slot /></main>
    <LayoutSiteFooter />
  </div>
</template>
