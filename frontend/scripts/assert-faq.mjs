import assert from 'node:assert/strict'

export function assertFaq(html, path) {
  const faq = html.match(/<section\b[^>]*id="faq"[\s\S]*?<\/section>/)?.[0]
  if (path === '/') return assert.equal(faq, undefined)
  assert.ok(faq, `Missing FAQ on ${path}`)
  assert.ok(!/<h3\b/.test(faq), 'Answer does not repeat the question as a large heading')
  const questions = [...faq.matchAll(/<button\b[^>]*class="faq-question"[^>]*>/g)].map(match => match[0])
  const answers = [...faq.matchAll(/<div\b[^>]*class="faq-answer"[^>]*>/g)].map(match => match[0])
  assert.equal(questions.length, path === '/web-development' ? 7 : 8, 'All questions remain available')
  assert.equal(answers.length, questions.length, 'Every question has its own answer')
  assert.equal(questions.filter(tag => tag.includes('aria-expanded="true"')).length, 1, 'Only the first answer starts expanded')
  assert.equal(answers.filter(tag => tag.includes('aria-hidden="false"')).length, 1, 'One accessible answer')
  assert.ok(questions[0].includes('aria-expanded="true"'))
  for (let index = 0; index < questions.length; index++) {
    const questionId = questions[index].match(/\bid="([^"]+)"/)?.[1]
    const answerId = answers[index].match(/\bid="([^"]+)"/)?.[1]
    assert.ok(questionId && answerId)
    assert.ok(questions[index].includes(`aria-controls="${answerId}"`), 'Button controls the corresponding answer')
    assert.ok(answers[index].includes(`aria-labelledby="${questionId}"`), 'Answer is labelled by its question')
    if (index) assert.match(answers[index], /\sinert(?:\s|>)/, 'Inactive answers do not receive focus')
  }
  assert.equal((faq.match(/<p\b/g) || []).length, answers.length, 'All answer text is present in SSR')
}
