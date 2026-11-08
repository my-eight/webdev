import assert from 'node:assert/strict'

// The demo must render before hydration and remain available in both hosting modes.
export function assertQuiz(html, path) {
  const quiz = html.match(/<section\b[^>]*id="quiz"[\s\S]*?<\/section>/)?.[0]
  if (path === '/') return assert.equal(quiz, undefined, 'Quiz belongs to direction pages only')
  assert.ok(quiz, `Missing quiz on ${path}`)
  assert.equal((quiz.match(/aria-current="step"/g) || []).length, 1, 'One current quiz step')
  assert.equal((quiz.match(/<li\b/g) || []).length, 7, 'Seven quiz questions')
  assert.match(quiz, /aria-valuemax="7"/, 'Accessible seven-step progress')
  assert.match(quiz, /Демо-режим/, 'Demo is disclosed before submission')
  assert.match(quiz, /<input\b[^>]*type="(?:radio|checkbox)"/, 'Native accessible choices')
  assert.ok(!/<form\b[^>]*(?:action|method)=/.test(quiz), 'No external form submission')
  const hero = html.indexOf('id="service-title"')
  const ribbon = html.indexOf('class="direction-ribbon')
  const offset = html.indexOf('id="quiz"')
  const faq = html.indexOf('id="faq"')
  assert.ok(hero >= 0 && ribbon > hero && faq > ribbon && offset > faq, 'Quiz follows FAQ after the page content')
}
