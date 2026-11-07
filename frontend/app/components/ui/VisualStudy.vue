<script setup lang="ts">
import type { Direction } from '~/types/service'
defineProps<{ theme: Direction | 'home' }>()
</script>

<template>
  <figure class="visual-study" :class="`study-${theme}`">
    <svg v-if="theme === 'home'" viewBox="0 0 480 480" fill="none" aria-hidden="true">
      <path class="study-grid" d="M0 120h480M0 240h480M0 360h480M120 0v480M240 0v480M360 0v480" />
      <circle cx="240" cy="240" r="176" class="study-faint" />
      <path d="M64 240a176 176 0 0 1 352 0" class="study-arch" />
      <rect x="129" y="127" width="224" height="224" class="study-paper" transform="rotate(-12 241 239)" />
      <path class="study-ink" d="M156 178h168M156 192h73M156 222h168M156 236h118M156 290h74" />
      <rect x="260" y="263" width="64" height="64" fill="var(--color-web)" />
      <circle cx="188" cy="271" r="26" fill="var(--color-stock)" />
      <rect x="308" y="103" width="38" height="38" fill="#A63D32" transform="rotate(-12 327 122)" />
      <path class="study-ink" d="M240 416h176M416 240v176" />
      <path class="study-ticks" d="M56 56h20M66 46v20M414 56h20M424 46v20M56 424h20M66 414v20M414 424h20M424 414v20" />
      <text x="29" y="253" transform="rotate(-90 29 253)" class="study-type">ФОРМА / ФУНКЦИЯ / ДЕТАЛИ</text>
    </svg>
    <svg v-else-if="theme === 'web'" viewBox="0 0 480 480" fill="none" aria-hidden="true">
      <path class="study-grid" d="M0 120h480M0 240h480M0 360h480M120 0v480M240 0v480M360 0v480" />
      <rect x="50" y="99" width="336" height="251" class="study-paper" />
      <path class="study-ink" d="M50 132h336M65 116h4m8 0h4m8 0h4" />
      <path d="M77 168h176M77 180h124M77 215h93M77 226h107M77 237h77" class="study-ink" />
      <rect x="77" y="276" width="83" height="28" fill="currentColor" />
      <rect x="277" y="164" width="81" height="81" stroke="currentColor" />
      <path d="M277 164l81 81m0-81l-81 81" stroke="currentColor" />
      <rect x="246" y="282" width="161" height="105" fill="#F7F4EC" stroke="currentColor" />
      <path d="M264 305h75m-75 14h123m-123 14h85m-85 14h106m-106 14h52" stroke="currentColor" />
      <path class="study-ink" d="M133 350v53h110M386 214h40v68" stroke-dasharray="3 5" />
      <circle cx="133" cy="403" r="4" fill="currentColor" />
      <path class="study-ticks" d="M30 57h20M40 47v20M420 417h20m-10-10v20" />
      <text x="51" y="76" class="study-type">ИНТЕРФЕЙС / ДАННЫЕ / СВЯЗИ</text>
      <text x="266" y="418" class="study-type">ПРОДУМАННАЯ СИСТЕМА</text>
    </svg>
    <svg v-else-if="theme === 'stock'" viewBox="0 0 480 480" fill="none" aria-hidden="true">
      <path class="study-grid" d="M0 120h480M0 240h480M0 360h480M120 0v480M240 0v480M360 0v480" />
      <path stroke="currentColor" d="M80 145h160v95h150M80 145v191h160v-96" />
      <rect x="40" y="108" width="120" height="76" class="study-paper" />
      <text x="66" y="151" class="study-label">Заказ</text>
      <circle cx="240" cy="240" r="65" fill="currentColor" />
      <text x="202" y="245" class="study-label study-label-inverse">МойСклад</text>
      <rect x="328" y="203" width="120" height="76" class="study-paper" />
      <text x="354" y="246" class="study-label">Данные</text>
      <rect x="40" y="299" width="120" height="76" class="study-paper" />
      <text x="65" y="342" class="study-label">Команда</text>
      <circle cx="240" cy="145" r="5" fill="currentColor" /><circle cx="240" cy="336" r="5" fill="currentColor" />
      <path d="M304 240h15l-5-5m5 5l-5 5M80 281v10l-5-5m5 5l5-5" stroke="currentColor" />
      <path class="study-ticks" d="M30 57h20M40 47v20M420 417h20m-10-10v20" />
      <text x="41" y="77" class="study-type">ПРОЦЕССЫ / КОМАНДА / ЯСНОСТЬ</text>
      <text x="240" y="418" class="study-type">ВСЁ ВЗАИМОСВЯЗАНО</text>
    </svg>
    <svg v-else viewBox="0 0 480 480" fill="none" aria-hidden="true">
      <path class="study-grid" d="M0 120h480M0 240h480M0 360h480M120 0v480M240 0v480M360 0v480" />
      <rect x="89" y="93" width="278" height="294" class="study-paper" transform="rotate(8 228 240)" />
      <circle cx="241" cy="224" r="100" fill="currentColor" />
      <path d="M190 119v219M211 107v238M232 107v244M253 109v247M274 119v236M295 138v210" stroke="#F7F4EC" stroke-width="3" />
      <rect x="83" y="261" width="104" height="104" fill="#202523" transform="rotate(-8 135 313)" />
      <path stroke="#F7F4EC" d="M114 317l25-29 23 33m-43-10l36 5" />
      <circle cx="350" cy="126" r="30" stroke="#202523" />
      <path class="study-ink" d="M262 367h104M262 377h62" />
      <path class="study-ticks" d="M30 57h20M40 47v20M420 417h20m-10-10v20" />
      <text x="41" y="54" class="study-type">ИДЕЯ / ФОРМА / ХАРАКТЕР</text>
      <text x="250" y="433" class="study-type">ПОИСК ВИЗУАЛЬНОГО РЕШЕНИЯ</text>
    </svg>
    <figcaption><span>{{ theme === 'home' ? 'Разные задачи. Один подход.' : theme === 'web' ? 'Интерфейс, данные, связи.' : theme === 'stock' ? 'У каждого процесса — своё место.' : 'Идея. Композиция. Характер.' }}</span><span class="study-caption-mark" aria-hidden="true">↗</span></figcaption>
  </figure>
</template>

<style src="~/assets/styles/components/visual-study.css" />
