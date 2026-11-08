<script setup lang="ts">
const snippets = {
  js: [
    'const items=await fetch("/api/items").then(r=>r.json());',
    'const total=cart.reduce((sum,item)=>sum+item.price,0);',
    'app.get("/status",(_,res)=>res.json({ready:true}));',
    'await api.sync({cache:true});',
  ],
  php: [
    '$routes=["/"=>"home","/api"=>"items","/cart"=>"checkout"];',
    '$items=array_map(fn($item)=>$item["price"],$catalog);',
    '$config=["cache"=>true,"timeout"=>30,"driver"=>"redis"];',
    '$items=["web","api","data"];',
  ],
  go: [
    'items:=map[string]int{"web":3,"api":5};for key,value:=range items{fmt.Println(key,value)}',
    'go func(){results<-service.Load(ctx)}();',
    'if err:=server.ListenAndServe();err!=nil{log.Print(err)}',
    'go syncOrders(ctx)',
  ],
  cpp: [
    'std::vector<int> ids{8,16,32};for(auto id:ids){queue.push(id);}',
    'auto task=std::async(std::launch::async,build);task.get();',
    'std::map<std::string,int> cache{{"web",200},{"api",201}};',
    'std::vector<int> ids{8,16};',
  ],
  java: [
    'var names=users.stream().map(User::getName).toList();',
    'CompletableFuture.runAsync(()->service.refresh());',
    'Map<String,Integer> ports=Map.of("web",8080,"api",9000);',
    'users.forEach(User::save);',
  ],
}
type Language = keyof typeof snippets
const languages = Object.keys(snippets) as Language[]
type Phase = 'static' | 'typing' | 'holding' | 'fading' | 'waiting'
// Stable, complete fallback for SSR and reduced motion. Randomness starts after hydration.
const lines = ref(
  Array.from({ length: 3 }, (_, row) =>
    Array.from({ length: 3 }, (_, column) => ({
      id: row * 3 + column,
      target: snippets[languages[(row + column) % languages.length]!].at(-1)!,
      text: snippets[languages[(row + column) % languages.length]!].at(-1)!,
      phase: 'static' as Phase,
      left: 12,
      cycle: 0,
      deadline: 0,
    })),
  ),
)
const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const context = document.createElement('canvas').getContext('2d')
  let inView = false
  let disposed = false
  let columns = 3
  let cellWidth = 0
  let lastWidth = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  const queues: Language[][] = Array.from({ length: 9 }, () => [])
  const previous: (Language | undefined)[] = Array(9)
  const widthOf = (text: string) => context?.measureText(text).width ?? text.length * 8

  function nextSnippet(index: number) {
    const queue = queues[index]!
    if (!queue.length) {
      queue.push(...languages)
      for (let i = queue.length - 1; i > 0; i--) {
        const other = Math.floor(Math.random() * (i + 1))
        ;[queue[i], queue[other]] = [queue[other]!, queue[i]!]
      }
      if (queue.at(-1) === previous[index]) {
        ;[queue[0], queue[queue.length - 1]] = [queue.at(-1)!, queue[0]!]
      }
    }
    const language = queue.pop()!
    previous[index] = language
    const variants = snippets[language]
    const fitting = variants.filter((text) => widthOf(text) <= cellWidth - 24)
    const choices = fitting.length ? fitting : [variants.at(-1)!]
    return choices[Math.floor(Math.random() * choices.length)]!
  }
  function prepare(cell: typeof lines.value[number][number], now: number, initial = false) {
    cell.target = nextSnippet(cell.id)
    cell.left = 8 + Math.random() * Math.max(0, cellWidth - widthOf(cell.target) - 24)
    cell.cycle++
    cell.text = initial ? cell.target.slice(0, Math.floor(cell.target.length * Math.random() * 0.6)) : ''
    cell.phase = initial ? 'typing' : 'waiting'
    cell.deadline = now + 100 + Math.random() * 650
  }
  function refreshLayout(force = false) {
    if (!root.value || disposed) return
    const width = root.value.clientWidth
    if (!force && width === lastWidth) return
    lastWidth = width
    const firstRow = root.value.querySelector<HTMLElement>('.code-stream-line')
    columns = firstRow ? getComputedStyle(firstRow).gridTemplateColumns.split(' ').length : 3
    cellWidth = width / columns
    const font = getComputedStyle(root.value)
    if (context) context.font = `${font.fontWeight} ${font.fontSize} ${font.fontFamily}`
    const now = performance.now()
    lines.value.flat().forEach((cell) => {
      if (motion.matches) {
        cell.text = snippets[languages[cell.id % languages.length]!]!.at(-1)!
        cell.phase = 'static'
        cell.left = 8
      } else prepare(cell, now, true)
    })
    syncPlayback()
  }
  function tick() {
    const now = performance.now()
    lines.value.forEach((row) =>
      row.slice(0, columns).forEach((cell) => {
        if (now < cell.deadline) return
        if (cell.phase === 'waiting') {
          cell.phase = 'typing'
          cell.deadline = now
        }
        if (cell.phase === 'typing') {
          cell.text = cell.target.slice(0, cell.text.length + 1 + Math.floor(Math.random() * 2))
          if (cell.text.length === cell.target.length) {
            cell.phase = 'holding'
            cell.deadline = now + 900 + Math.random() * 1300
          } else cell.deadline = now + 40 + Math.random() * 70
        } else if (cell.phase === 'holding') {
          cell.phase = 'fading'
          cell.deadline = now + 1400
        } else if (cell.phase === 'fading') prepare(cell, now)
      }),
    )
    timer = setTimeout(tick, 40)
  }
  function syncPlayback() {
    clearTimeout(timer)
    if (inView && !motion.matches && !document.hidden) tick()
  }
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry?.isIntersecting ?? false
    syncPlayback()
  })
  const resizeObserver = new ResizeObserver(() => refreshLayout())
  if (root.value) observer.observe(root.value)
  if (root.value) resizeObserver.observe(root.value)
  const onMotionChange = () => refreshLayout(true)
  motion.addEventListener('change', onMotionChange)
  document.addEventListener('visibilitychange', syncPlayback)
  refreshLayout()
  void document.fonts.ready.then(() => refreshLayout(true))
  onBeforeUnmount(() => {
    disposed = true
    clearTimeout(timer)
    observer.disconnect()
    resizeObserver.disconnect()
    motion.removeEventListener('change', onMotionChange)
    document.removeEventListener('visibilitychange', syncPlayback)
  })
})
</script>
<template>
  <div ref="root" class="code-stream">
    <div v-for="(row, index) in lines" :key="index" class="code-stream-line">
      <div v-for="cell in row" :key="cell.id" class="code-fragment">
        <span
          class="code-fragment-text"
          :class="{ 'is-fading': cell.phase === 'fading', 'is-waiting': cell.phase === 'waiting' }"
          :style="{ left: `${cell.left}px` }"
          :data-phase="cell.phase"
          :data-cycle="cell.cycle"
        ><span>{{ cell.text }}</span><span v-if="cell.phase === 'typing'" class="code-stream-cursor" aria-hidden="true">▍</span></span>
      </div>
    </div>
  </div>
</template>
