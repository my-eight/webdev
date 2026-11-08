interface TextRun {
  element: HTMLElement
  nodes: { node: Text; start: number; text: string }[]
  ends: number[]
  range: Range
  start: number
  duration: number
  count: number
}

const highlightName = 'm8n-typing'
const runs = new Map<HTMLElement, TextRun>()
let highlight: Highlight | undefined
let motion: MediaQueryList | undefined
let frame = 0
let listening = false

function releaseListeners() {
  if (runs.size) return
  cancelAnimationFrame(frame)
  frame = 0
  CSS.highlights.delete(highlightName)
  if (!listening) return
  motion?.removeEventListener('change', onMotion)
  document.removeEventListener('visibilitychange', onVisibility)
  window.removeEventListener('beforeprint', finishAll)
  window.removeEventListener('resize', finishAll)
  listening = false
}
function finish(run: TextRun) {
  highlight?.delete(run.range)
  runs.delete(run.element)
  run.element.dataset.typing = 'done'
  run.element.dataset.typedChars = String(run.ends.length)
}
function finishAll() {
  for (const run of runs.values()) finish(run)
  releaseListeners()
}
function onMotion() {
  if (motion?.matches) finishAll()
}
function onVisibility() {
  if (document.hidden) finishAll()
}
function tick(now: number) {
  frame = 0
  for (const run of runs.values()) {
    if (!run.element.isConnected || run.nodes.some(({ node, text }) => node.data !== text)) {
      finish(run)
      continue
    }
    const progress = Math.max(0, Math.min(1, (now - run.start) / run.duration))
    const count = Math.floor(progress * run.ends.length)
    if (progress === 1) {
      finish(run)
      continue
    }
    if (count === run.count) continue
    run.count = count
    run.element.dataset.typedChars = String(count)
    const offset = count ? run.ends[count - 1]! : 0
    const part = run.nodes.find(({ start, text }) => offset < start + text.length) || run.nodes.at(-1)!
    run.range.setStart(part.node, Math.min(part.text.length, offset - part.start))
  }
  if (runs.size) frame = requestAnimationFrame(tick)
  else releaseListeners()
}

/** Reveal existing glyphs, preserving layout, Vue's DOM and the accessible text. */
export function typeText(element: HTMLElement, options: { delay?: number } = {}) {
  if (typeof window === 'undefined' || typeof CSS === 'undefined' || !CSS.highlights || typeof Highlight === 'undefined') return
  motion ??= window.matchMedia('(prefers-reduced-motion: reduce)')
  if (motion.matches || document.hidden || !element.isConnected) return
  const previous = runs.get(element)
  if (previous) finish(previous)

  const nodes: TextRun['nodes'] = []
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
  let text = ''
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const part = node as Text
    const parent = part.parentElement
    if (!part.data || !parent || parent.closest('[aria-hidden="true"], [inert]')) continue
    if (!parent.getClientRects().length || getComputedStyle(parent).visibility === 'hidden') continue
    nodes.push({ node: part, start: text.length, text: part.data })
    text += part.data
  }
  if (!text.trim() || !nodes.length) { releaseListeners(); return }
  const ends: number[] = []
  if (typeof Intl.Segmenter === 'function') {
    for (const part of new Intl.Segmenter('ru', { granularity: 'grapheme' }).segment(text))
      ends.push(part.index + part.segment.length)
  } else {
    let offset = 0
    for (const character of text) { offset += character.length; ends.push(offset) }
  }
  const range = document.createRange()
  range.setStart(nodes[0]!.node, 0)
  range.setEnd(nodes.at(-1)!.node, nodes.at(-1)!.text.length)
  highlight ??= new Highlight()
  highlight.add(range)
  CSS.highlights.set(highlightName, highlight)
  runs.set(element, {
    element, nodes, ends, range,
    start: performance.now() + (options.delay || 0),
    duration: Math.min(1100, Math.max(240, ends.length * 5)),
    count: 0,
  })
  element.dataset.typing = 'active'
  element.dataset.typedChars = '0'
  element.dataset.typeLength = String(ends.length)
  if (!listening) {
    motion.addEventListener('change', onMotion)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('beforeprint', finishAll)
    window.addEventListener('resize', finishAll)
    listening = true
  }
  if (!frame) frame = requestAnimationFrame(tick)
}

export function typeTextWithin(root: HTMLElement, delay = 0) {
  const selector = 'h2, h3, p'
  const candidates = [
    ...(root.matches(selector) ? [root] : []),
    ...root.querySelectorAll<HTMLElement>(selector),
  ]
  let index = 0
  for (const element of candidates) {
    if (element.closest('.quiz-shell, .faq-question, [inert], [aria-hidden="true"]')) continue
    typeText(element, { delay: delay + Math.min(index++, 3) * 45 })
  }
}

export function finishTypingWithin(root: HTMLElement) {
  for (const run of runs.values()) {
    if (root.contains(run.element)) finish(run)
  }
  if (typeof window !== 'undefined' && typeof CSS !== 'undefined' && CSS.highlights) releaseListeners()
}

if (import.meta.hot) import.meta.hot.dispose(() => {
  if (typeof window !== 'undefined' && typeof CSS !== 'undefined' && CSS.highlights) finishAll()
})
