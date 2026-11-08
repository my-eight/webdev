<script setup lang="ts">
import type { Direction } from '~/types/service'
const props = defineProps<{ theme: Direction | 'home' }>()
const id = useId().replaceAll(':', '')
const labels = {
  home: 'Три направления соединяются в единую цифровую систему',
  web: 'Сборка интерфейса и обмен данными с сервером',
  stock: 'Синхронизация заказов, команды и данных',
  design: 'Световые грани собираются в визуальный знак',
}
</script>
<template>
  <figure class="visual-study" :class="`visual-${theme}`" role="img" :aria-label="labels[props.theme]">
    <svg viewBox="0 0 560 520" fill="none" aria-hidden="true">
      <defs>
        <linearGradient :id="`${id}-metal`" x1="100" y1="80" x2="440" y2="430" gradientUnits="userSpaceOnUse">
          <stop stop-color="#28313d" />
          <stop offset=".46" stop-color="#0c121b" />
          <stop offset="1" stop-color="#030609" />
        </linearGradient>
        <linearGradient :id="`${id}-light`" x1="120" y1="100" x2="420" y2="430" gradientUnits="userSpaceOnUse">
          <stop stop-color="currentColor" stop-opacity=".7" />
          <stop offset=".5" stop-color="currentColor" stop-opacity=".06" />
          <stop offset="1" stop-color="currentColor" stop-opacity=".35" />
        </linearGradient>
        <linearGradient :id="`${id}-blade`">
          <stop stop-color="currentColor" stop-opacity="0" />
          <stop offset=".6" stop-color="currentColor" />
          <stop offset="1" stop-color="#fff" />
        </linearGradient>
        <radialGradient :id="`${id}-aura`">
          <stop stop-color="currentColor" stop-opacity=".22" />
          <stop offset="1" stop-color="currentColor" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="285" cy="270" rx="254" ry="238" :fill="`url(#${id}-aura)`" />
      <g class="art-guides" stroke="currentColor">
        <path d="M25 114V82h32m446 0h32v32M25 406v32h32m446 0h32v-32" />
        <path d="M280 35v18m0 414v18M5 260h18m514 0h18" />
      </g>
      <template v-if="theme === 'home'">
        <g class="home-orbit" stroke="currentColor">
          <ellipse cx="280" cy="260" rx="230" ry="192" transform="rotate(-28 280 260)" stroke-dasharray="105 24 3 24" />
          <ellipse cx="280" cy="260" rx="238" ry="205" transform="rotate(-28 280 260)" opacity=".2" />
        </g>
        <path d="m101 242 179-127 179 127-179 180Z" :fill="`url(#${id}-metal)`" stroke="#3d4754" />
        <g class="home-panel panel-lime">
          <path d="m280 88-153 88 25 162 104-68Z" fill="#13200b" stroke="#c4f541" />
          <path d="m280 88-24 182-104 68 37-132Z" fill="#c4f541" fill-opacity=".15" />
          <path class="trace-line" d="m260 123-24 132-60 41" pathLength="100" stroke="#c4f541" stroke-width="3" />
          <path d="m188 203 45-27-8 51-30 19Z" fill="#c4f541" fill-opacity=".8" />
        </g>
        <g class="home-panel panel-blue">
          <path d="m298 112 146 86-31 163-103-79Z" fill="#08182d" stroke="#5b9dff" />
          <path d="m298 112 12 170 103 79-35-139Z" fill="#5b9dff" fill-opacity=".16" />
          <path class="trace-line" d="m320 147 14 119 54 51" pathLength="100" stroke="#5b9dff" stroke-width="3" />
          <path d="m354 194 29 18 8 37-35-21Z" fill="#5b9dff" fill-opacity=".8" />
        </g>
        <g class="home-panel panel-purple">
          <path d="m161 357 119-76 121 90-121 85Z" fill="#211134" stroke="#b38aff" />
          <path d="m161 357 119 40 121-26-121 85Z" fill="#b38aff" fill-opacity=".17" />
          <path class="trace-line" d="m190 362 90 60 88-55" pathLength="100" stroke="#b38aff" stroke-width="3" />
        </g>
        <path d="m280 220 32 37-32 38-28-38Z" fill="#f2f5f4" class="core-light" />
        <path d="m280 207 44 50-44 50-42-50Z" stroke="#ffffff70" />
        <path d="M87 396 478 108" stroke="#f2f5f4" opacity=".25" />
        <path class="home-slice" d="M87 396 478 108" :stroke="`url(#${id}-blade)`" stroke-width="2" pathLength="100" />
      </template>
      <template v-else-if="theme === 'web'">
        <g class="web-interface">
          <path d="m90 155 284-62 104 57-283 65Z" fill="#111a0a" stroke="currentColor" opacity=".45" />
          <path d="m90 155 105 60v218L90 370Z" :fill="`url(#${id}-metal)`" stroke="#344029" />
          <path d="m195 215 283-65v218l-283 65Z" fill="#080d07" stroke="currentColor" stroke-opacity=".7" />
          <path d="m195 249 283-65" stroke="currentColor" opacity=".4" />
          <path d="m214 232 5-1m11-3 5-1m11-3 5-1" stroke="currentColor" stroke-width="3" />
          <path
            class="web-write"
            d="m223 287 83-19m-83 34 115-26m-115 41 62-14m-62 30 96-22"
            stroke="currentColor"
            stroke-width="3"
            pathLength="100"
          />
          <path
            class="web-write write-late"
            d="m354 257 94-22v71l-94 22Z M354 257l94 49M448 235l-94 93"
            stroke="currentColor"
            pathLength="100"
          />
          <path d="m223 367 70-16v22l-70 16Z" fill="currentColor" opacity=".8" />
          <path class="web-scan" d="m200 272 272-62" stroke="currentColor" stroke-width="2" />
          <path d="m114 204 45 27m-45-3 45 27m-45-3 26 16m-26 8 40 24m-40 0 45 27" stroke="#6c8550" stroke-width="2" />
        </g>
        <g class="web-terminal">
          <path d="m257 349 151 19v91l-151-19Z" fill="#0b1110" stroke="currentColor" />
          <path
            class="web-write write-late"
            d="m278 373 18 12-18 6m32 0 23 3m-55 17 66 8m-66 4 101 13"
            stroke="currentColor"
            stroke-width="2"
            pathLength="100"
          />
          <path d="m359 401 14 2" stroke="currentColor" stroke-width="4" class="terminal-cursor" />
        </g>
        <path d="M142 396v45h85" stroke="currentColor" opacity=".25" />
        <path class="packet" d="M142 396v45h85" stroke="currentColor" stroke-width="3" pathLength="100" />
      </template>
      <template v-else-if="theme === 'stock'">
        <g class="stock-circuits" stroke="currentColor">
          <path d="M180 150h63v46M182 355h61v-28M357 260h54" opacity=".3" />
          <path class="packet stock-packet-one" d="M180 150h63v46" stroke-width="3" pathLength="100" />
          <path class="packet stock-packet-two" d="M182 355h61v-28" stroke-width="3" pathLength="100" />
          <path class="packet stock-packet-three" d="M357 260h54" stroke-width="3" pathLength="100" />
        </g>
        <g class="stock-core">
          <path d="m281 174 76 44v87l-76 44-76-44v-87Z" :fill="`url(#${id}-metal)`" stroke="currentColor" />
          <path
            d="m281 191 61 35v70l-61 35-61-35v-70Z"
            :fill="`url(#${id}-light)`"
            stroke="currentColor"
            stroke-opacity=".35"
          />
          <path
            d="m249 241 32-18 32 18-32 19Z m0 0v38l32 19 32-19v-38m-32 19v38"
            stroke="currentColor"
            stroke-width="2"
          />
          <path d="m281 155 93 54v106l-93 54-93-54V209Z" stroke="currentColor" opacity=".15" />
        </g>
        <g class="stock-node node-order">
          <path d="M65 101h100l15 15v71H65Z" fill="#0b1321" stroke="currentColor" />
          <path d="M102 126h26l9 9v28h-35Z m26-28h9m-28 8h20m-20 8h14" stroke="currentColor" stroke-width="2" />
        </g>
        <g class="stock-node node-team">
          <path d="M54 314h113l15 15v70H54Z" fill="#0b1321" stroke="currentColor" />
          <circle cx="111" cy="345" r="9" stroke="currentColor" stroke-width="2" />
          <path d="M91 376v-8c0-13 40-13 40 0v8m0-32c14 0 17 25 13 31" stroke="currentColor" stroke-width="2" />
        </g>
        <g class="stock-node node-data">
          <path d="M411 218h89l15 15v78H411Z" fill="#0b1321" stroke="currentColor" />
          <ellipse cx="463" cy="245" rx="19" ry="7" stroke="currentColor" stroke-width="2" />
          <path d="M444 245v31c0 10 38 10 38 0v-31m-38 15c0 10 38 10 38 0" stroke="currentColor" stroke-width="2" />
        </g>
        <path d="m225 130 56-32 126 73m-69 224-57 32-75-43" stroke="currentColor" opacity=".2" />
        <circle cx="243" cy="150" r="4" fill="currentColor" />
        <circle cx="243" cy="355" r="4" fill="currentColor" />
      </template>
      <template v-else>
        <g class="design-orbit">
          <ellipse
            cx="280"
            cy="265"
            rx="223"
            ry="119"
            transform="rotate(-35 280 265)"
            stroke="currentColor"
            opacity=".45"
          />
          <ellipse
            cx="280"
            cy="265"
            rx="238"
            ry="132"
            transform="rotate(-35 280 265)"
            stroke="currentColor"
            opacity=".15"
            stroke-dasharray="5 18"
          />
          <circle cx="473" cy="151" r="6" fill="currentColor" />
        </g>
        <g class="design-prism">
          <path d="m280 91 116 78-28 164-88 104-105-103-15-165Z" :fill="`url(#${id}-metal)`" stroke="currentColor" />
          <path d="m280 91-22 142-98-64Z" fill="#d6bbff" fill-opacity=".85" />
          <path d="m280 91 116 78-138 64Z" fill="#7a41ca" fill-opacity=".6" />
          <path d="m160 169 98 64-83 101Z" fill="#462576" />
          <path d="m258 233 138-64-28 164Z" fill="#aa70ff" fill-opacity=".5" />
          <path d="m258 233 110 100-88 104Z" fill="#532792" />
          <path d="m258 233 22 204-105-103Z" fill="#b38aff" fill-opacity=".7" />
          <path
            class="prism-outline"
            d="m280 91-22 142-98-64m98 64 138-64m-138 64-83 101m83-101 110 100m-110-100 22 204"
            stroke="#eadcff"
            stroke-opacity=".6"
            pathLength="100"
          />
        </g>
        <path
          class="design-stroke"
          d="M83 392 475 110"
          :stroke="`url(#${id}-blade)`"
          stroke-width="3"
          pathLength="100"
        />
        <path d="m430 353 13-12 12 12-12 13Z" fill="currentColor" opacity=".7" />
      </template>
    </svg>
  </figure>
</template>
<style src="~/assets/styles/components/visual-study.css" />
