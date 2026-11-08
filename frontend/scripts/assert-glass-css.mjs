import assert from 'node:assert/strict'

export function assertGlassCss(css) {
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
  for (const selector of ['.site-header.is-scrolled', '.site-header.is-sections-open', '.main-navigation', '.mobile-action-bar']) {
    const matches = rules.filter(([, selectors]) => selectors.split(',').some(value => value.trim() === selector))
    const glass = matches.find(([, , body]) => body.split(';').some(value => /^backdrop-filter\s*:\s*blur\([1-9]/.test(value.trim())))
    assert.ok(glass, `${selector}: compiled CSS must retain standard backdrop-filter`)
    assert.ok(glass[2].split(';').some(value => /^-webkit-backdrop-filter\s*:\s*blur\([1-9]/.test(value.trim())), `${selector}: Safari fallback must also survive`)
  }
}
