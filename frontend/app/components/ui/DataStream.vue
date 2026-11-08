<script setup lang="ts">
type Packet = { kind: 'json' | 'request' | 'response' | 'document'; text: string }
const packets: Packet[] = [
  { kind: 'json', text: '{"order":1048,"status":"ready"}' },
  { kind: 'request', text: 'POST /api/orders' },
  { kind: 'document', text: 'Заказ #1048' },
  { kind: 'response', text: '201 CREATED' },
  { kind: 'json', text: '{"stock":128,"reserved":12}' },
  { kind: 'document', text: 'Накладная #86' },
  { kind: 'request', text: 'GET /api/stock' },
  { kind: 'response', text: '200 OK' },
  { kind: 'json', text: '{"sync":true,"updated":24}' },
  { kind: 'document', text: 'Счёт #312' },
  { kind: 'request', text: 'PATCH /api/products' },
  { kind: 'response', text: '202 ACCEPTED' },
  { kind: 'json', text: '{"event":"shipment","qty":8}' },
  { kind: 'document', text: 'Отгрузка #207' },
  { kind: 'request', text: 'POST /api/webhooks' },
  { kind: 'response', text: '204 SYNCED' },
]
// Identical server/client markup first; reshuffle after hydration and on every lap.
function initialLane(offset: number) {
  return Array.from({ length: 24 }, (_, index) => packets[(index + offset) % packets.length]!)
}
const lanes = ref([initialLane(0), initialLane(7)])
function shuffleLane(index: number) {
  const pool = [...packets]
  for (let i = pool.length - 1; i > 0; i--) {
    const other = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[other]] = [pool[other]!, pool[i]!]
  }
  lanes.value[index] = Array.from({ length: 24 }, (_, item) => pool[item % pool.length]!)
}
const root = ref<HTMLElement | null>(null)
const playing = ref(false)
onMounted(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let inView = false
  function syncPlayback() {
    playing.value = inView && !motion.matches && !document.hidden
  }
  if (!motion.matches) lanes.value.forEach((_, index) => shuffleLane(index))
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry?.isIntersecting ?? false
    syncPlayback()
  })
  if (root.value) observer.observe(root.value)
  motion.addEventListener('change', syncPlayback)
  document.addEventListener('visibilitychange', syncPlayback)
  onBeforeUnmount(() => {
    observer.disconnect()
    motion.removeEventListener('change', syncPlayback)
    document.removeEventListener('visibilitychange', syncPlayback)
  })
})
</script>
<template>
  <div ref="root" class="data-stream" :class="{ 'is-playing': playing }">
    <div v-for="(lane, laneIndex) in lanes" :key="laneIndex" class="data-stream-lane">
      <div class="data-stream-track" @animationiteration.self="shuffleLane(laneIndex)">
        <div v-for="copy in 2" :key="copy" class="data-stream-group">
          <span v-for="(packet, index) in lane" :key="index" class="data-packet" :class="`packet-${packet.kind}`">
            <svg v-if="packet.kind === 'document'" class="data-document" viewBox="0 0 24 28" fill="none">
              <path d="M4 2h10l6 6v18H4Z M14 2v7h6 M8 14h8 M8 18h8 M8 22h5" />
            </svg>
            <svg v-else-if="packet.kind === 'request'" class="data-request" viewBox="0 0 24 24" fill="none">
              <path d="M2 8h17m-5-5 5 5-5 5 M22 17H5m5-5-5 5 5 5" />
            </svg>
            <span v-else-if="packet.kind === 'json'" class="data-braces">{ }</span>
            <svg v-else class="data-response" viewBox="0 0 24 24" fill="none">
              <path d="m6 12 4 4 8-9 M3 6V3h5 M16 3h5v5 M21 16v5h-5 M8 21H3v-5" />
            </svg>
            <span>{{ packet.text }}</span>
            <svg class="data-transfer" viewBox="0 0 30 12" fill="none"><path d="M1 6h26m-5-4 5 4-5 4" /></svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
