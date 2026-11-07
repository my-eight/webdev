<script setup lang="ts">
import { useId } from 'vue'
import type { Direction } from '~/types/service'
defineProps<{ theme: Direction | 'home' }>()
const stockArrowId = `stock-arrow-${useId()}`
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
      <g class="web-build">
        <rect x="50" y="99" width="336" height="251" class="study-paper" />
        <path class="study-ink" d="M50 132h336M65 116h4m8 0h4m8 0h4" />
        <g class="study-ink">
          <path class="web-reveal" pathLength="100" style="--write-delay: 0s" d="M77 168h176" />
          <path class="web-reveal" pathLength="100" style="--write-delay: .18s" d="M77 180h124" />
          <path class="web-reveal" pathLength="100" style="--write-delay: .38s" d="M77 215h93" />
          <path class="web-reveal" pathLength="100" style="--write-delay: .55s" d="M77 226h107" />
          <path class="web-reveal" pathLength="100" style="--write-delay: .72s" d="M77 237h77" />
        </g>
        <rect x="77" y="276" width="83" height="28" fill="currentColor" />
        <g class="web-image" stroke="currentColor">
          <rect class="web-reveal" pathLength="100" style="--write-delay: .8s" x="277" y="164" width="81" height="81" />
          <path class="web-reveal" pathLength="100" style="--write-delay: 1.1s" d="M277 164l81 81m0-81l-81 81" />
        </g>
        <g class="web-code-card" stroke="currentColor">
          <rect x="246" y="282" width="161" height="105" fill="#F7F4EC" />
          <path class="web-reveal" pathLength="100" style="--write-delay: 1.8s" d="M264 305h75" />
          <path class="web-reveal" pathLength="100" style="--write-delay: 2s" d="M264 319h123" />
          <path class="web-reveal" pathLength="100" style="--write-delay: 2.2s" d="M264 333h85" />
          <path class="web-reveal" pathLength="100" style="--write-delay: 2.4s" d="M264 347h106" />
          <path class="web-reveal" pathLength="100" style="--write-delay: 2.6s" d="M264 361h52" />
        </g>
        <path class="study-ink" d="M133 350v53h110M386 214h40v68" stroke-dasharray="3 5" />
        <circle cx="133" cy="403" r="4" fill="currentColor" />
      </g>
      <path class="study-ticks" d="M30 57h20M40 47v20M420 417h20m-10-10v20" />
      <text x="51" y="76" class="study-type">ИНТЕРФЕЙС / ДАННЫЕ / СВЯЗИ</text>
      <text x="266" y="418" class="study-type">ПРОДУМАННАЯ СИСТЕМА</text>
    </svg>
    <svg v-else-if="theme === 'stock'" viewBox="0 0 480 480" fill="none" aria-hidden="true">
      <defs>
        <marker :id="stockArrowId" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto">
          <path class="stock-arrowhead" d="M1 1l6 3-6 3" />
        </marker>
      </defs>
      <path class="study-grid" d="M0 120h480M0 240h480M0 360h480M120 0v480M240 0v480M360 0v480" />
      <g class="stock-network">
        <g class="stock-connections">
          <path d="M160 145H240V175" />
          <path d="M80 184V295" :marker-end="`url(#${stockArrowId})`" />
          <path d="M160 336H240V305" />
          <path d="M305 240H324" :marker-end="`url(#${stockArrowId})`" />
        </g>
        <g class="stock-flows">
          <path class="stock-flow stock-flow-order" pathLength="100" d="M160 145H240V175" />
          <path class="stock-flow stock-flow-team" pathLength="100" d="M80 184V295" />
          <path class="stock-flow stock-flow-hub" pathLength="100" d="M160 336H240V305" />
          <path class="stock-flow stock-flow-data" pathLength="100" d="M305 240H324" />
          <path class="stock-flow stock-flow-order-return" pathLength="100" d="M240 175V145H160" />
        </g>
        <rect x="40" y="108" width="120" height="76" class="study-paper" />
        <text x="58" y="146" dominant-baseline="central" class="study-label">Заказ</text>
        <g class="stock-icon stock-icon-order" transform="translate(128 136)">
          <path d="M2 1h9l5 5v13H2zM11 1v5h5M5 10h8M5 14h6" />
        </g>
        <g class="stock-hub">
          <circle cx="240" cy="240" r="65" fill="currentColor" />
          <text x="240" y="240" text-anchor="middle" dominant-baseline="central" class="study-label study-label-inverse">МойСклад</text>
        </g>
        <rect x="328" y="203" width="120" height="76" class="study-paper" />
        <text x="346" y="241" dominant-baseline="central" class="study-label">Данные</text>
        <g class="stock-icon stock-icon-data" transform="translate(416 231)">
          <ellipse cx="10" cy="4" rx="8" ry="3" />
          <path d="M2 4v12c0 4 16 4 16 0V4M2 10c0 4 16 4 16 0" />
        </g>
        <rect x="40" y="299" width="120" height="76" class="study-paper" />
        <text x="58" y="337" dominant-baseline="central" class="study-label">Команда</text>
        <g class="stock-icon stock-icon-team" transform="translate(127 327)">
          <circle cx="7" cy="6" r="3" />
          <path d="M1 18v-2a6 6 0 0 1 12 0v2M14 4a3 3 0 0 1 0 6M16 12a5 5 0 0 1 3 4v2" />
        </g>
        <circle cx="240" cy="145" r="5" fill="currentColor" /><circle cx="240" cy="336" r="5" fill="currentColor" />
      </g>
      <path class="study-ticks" d="M30 57h20M40 47v20M420 417h20m-10-10v20" />
      <text x="41" y="77" class="study-type">ПРОЦЕССЫ / КОМАНДА / ЯСНОСТЬ</text>
      <text x="240" y="418" class="study-type">ВСЁ ВЗАИМОСВЯЗАНО</text>
    </svg>
    <svg v-else viewBox="0 0 480 480" fill="none" aria-hidden="true">
      <path class="study-grid" d="M0 120h480M0 240h480M0 360h480M120 0v480M240 0v480M360 0v480" />
      <g class="study-motion study-motion-design">
        <rect x="89" y="93" width="278" height="294" class="study-paper" transform="rotate(8 228 240)" />
        <g class="study-motion study-motion-design-disc">
          <circle cx="241" cy="224" r="100" fill="currentColor" />
          <path d="M190 119v219M211 107v238M232 107v244M253 109v247M274 119v236M295 138v210" stroke="#F7F4EC" stroke-width="3" />
        </g>
        <g class="study-motion study-motion-detail study-motion-design-card">
          <rect x="83" y="261" width="104" height="104" fill="#202523" transform="rotate(-8 135 313)" />
          <path stroke="#F7F4EC" d="M114 317l25-29 23 33m-43-10l36 5" />
        </g>
        <circle cx="350" cy="126" r="30" stroke="#202523" />
        <path class="study-ink" d="M262 367h104M262 377h62" />
      </g>
      <path class="study-ticks" d="M30 57h20M40 47v20M420 417h20m-10-10v20" />
      <text x="64" y="54" class="study-type">ИДЕЯ / ФОРМА / ХАРАКТЕР</text>
      <text x="250" y="433" class="study-type">ПОИСК ВИЗУАЛЬНОГО РЕШЕНИЯ</text>
    </svg>
    <figcaption><span>{{ theme === 'home' ? 'Разные задачи. Один подход.' : theme === 'web' ? 'Интерфейс, данные, связи.' : theme === 'stock' ? 'У каждого процесса — своё место.' : 'Идея. Композиция. Характер.' }}</span><span class="study-caption-mark" aria-hidden="true">↗</span></figcaption>
  </figure>
</template>

<style src="~/assets/styles/components/visual-study.css" />
