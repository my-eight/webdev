const revealTargets = [
  '.home-section-heading', '.home-approach > h2', '.direction-card', '.home-principles article',
  '.section-heading', '.section-item', '.process-list > li', '#faq-title', '.faq-column > details',
  '.quiz-heading', '.quiz-shell', '.contact-copy', '.contact-card',
  '.footer-brand', '.footer-note', '.footer-bottom',
].join(', ')

/** Progressive enhancement: SSR and the initial viewport are always visible. */
export function useScrollReveal(root: Ref<HTMLElement | null>) {
  const nuxtApp = useNuxtApp()
  let observer: IntersectionObserver | undefined
  let reduced: MediaQueryList | undefined
  let unhook: (() => void) | undefined
  let routeTimer: ReturnType<typeof setTimeout> | undefined
  let awaitingRouteScroll = false
  const pending = new Set<HTMLElement>()
  const animations = new Map<HTMLElement, Animation>()

  function reveal(element: HTMLElement, animate = true) {
    observer?.unobserve(element)
    pending.delete(element)
    element.dataset.reveal = 'shown'
    if (!animate || reduced?.matches || !element.isConnected) return
    const rect = element.getBoundingClientRect()
    const narrow = window.innerWidth <= 760
    const viewportWidth = document.documentElement.clientWidth
    const spread = narrow ? 12 : 28
    const leftSpace = Math.max(0, rect.left - 8)
    const rightSpace = Math.max(0, viewportWidth - rect.right - 8)
    const x = Math.max(-leftSpace, Math.min(rightSpace, (Math.random() * 2 - 1) * spread))
    const bottomSpace = document.documentElement.scrollHeight - (rect.bottom + window.scrollY)
    const y = Math.min(16 + Math.random() * (narrow ? 12 : 22), Math.max(0, bottomSpace - 8))
    const angle = narrow || Math.min(leftSpace, rightSpace) < 12 ? 0 : (Math.random() * 2 - 1) * 0.45
    const animation = element.animate([
      { opacity: 0, transform: `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)` },
      { opacity: 1, transform: 'translate3d(0, 0, 0) rotate(0deg)' },
    ], {
      duration: 620 + Math.random() * 220,
      delay: Math.random() * 160,
      easing: 'cubic-bezier(.18,.72,.22,1)',
      fill: 'both',
    })
    animations.set(element, animation)
    const release = () => {
      animations.delete(element)
      animation.cancel()
    }
    animation.onfinish = release
    animation.oncancel = () => animations.delete(element)
  }

  function showAll() {
    for (const element of pending) reveal(element, false)
    for (const animation of animations.values()) animation.cancel()
    animations.clear()
  }

  function scan() {
    if (!root.value || !observer) return
    for (const element of pending) {
      if (!element.isConnected) {
        observer.unobserve(element)
        pending.delete(element)
      }
    }
    for (const element of root.value.querySelectorAll<HTMLElement>(revealTargets)) {
      if (element.dataset.reveal) continue
      const rect = element.getBoundingClientRect()
      // Never hide already visible content or content above a restored scroll position.
      if (reduced?.matches || rect.top < window.innerHeight || !rect.height) {
        element.dataset.reveal = 'shown'
        continue
      }
      element.dataset.reveal = 'pending'
      pending.add(element)
      observer.observe(element)
    }
  }

  function onFocus(event: FocusEvent) {
    if (!(event.target instanceof HTMLElement)) return
    // Anchor and keyboard navigation must never wait for a decorative entrance.
    const element = event.target.closest<HTMLElement>('[data-reveal]')
    if (!element) return
    animations.get(element)?.cancel()
    if (pending.has(element)) reveal(element, false)
  }
  function onPreference() {
    if (reduced?.matches) showAll()
    else scan()
  }
  function waitForRouteScroll() {
    clearTimeout(routeTimer)
    routeTimer = setTimeout(() => {
      awaitingRouteScroll = false
      scan()
    }, 120)
  }
  function onScroll() {
    if (awaitingRouteScroll) waitForRouteScroll()
  }

  onMounted(() => {
    if (!('IntersectionObserver' in window) || !HTMLElement.prototype.animate) return
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement)
      }
    }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' })
    reduced.addEventListener('change', onPreference)
    root.value?.addEventListener('focusin', onFocus)
    window.addEventListener('scroll', onScroll, { passive: true })
    // Nuxt restores scrolling after page:loading:end. Wait until it settles,
    // otherwise the previous page's bottom position marks new content as seen.
    unhook = nuxtApp.hook('page:loading:end', async () => {
      await nextTick()
      awaitingRouteScroll = true
      waitForRouteScroll()
    })
    scan()
  })
  onBeforeUnmount(() => {
    unhook?.()
    clearTimeout(routeTimer)
    window.removeEventListener('scroll', onScroll)
    reduced?.removeEventListener('change', onPreference)
    root.value?.removeEventListener('focusin', onFocus)
    observer?.disconnect()
    showAll()
  })
}
