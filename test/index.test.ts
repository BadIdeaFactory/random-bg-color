import { beforeEach, describe, expect, it } from 'vitest'
import { setRandomBgColor } from '../src/index'

const RGB = /rgb\([0-9]+, [0-9]+, [0-9]+\)/

describe('setRandomBgColor', () => {
  // jsdom provides a fresh document per test file; reset the body between tests.
  beforeEach(() => {
    document.body.innerHTML = ''
    document.body.removeAttribute('style')
    delete document.body.dataset.darkMode
  })

  it('sets the body background color', () => {
    setRandomBgColor()

    expect(document.body.style.backgroundColor).toMatch(RGB)
    expect(document.body.style.transition).toBe('background-color 120ms')

    // We can't deterministically set a background color, so just check that
    // dark mode is set to one of the valid values.
    expect(document.body.dataset.darkMode).toMatch(/true|false/)
  })

  it('does not add transition if `disallowTransition` is true', () => {
    setRandomBgColor(null, { disallowTransition: true })

    expect(document.body.style.backgroundColor).toMatch(RGB)

    // Browser behavior is to return an empty string for undefined styles.
    expect(document.body.style.transition).toBe('')
  })

  it('appends a transition if it already exists', () => {
    const el = document.createElement('div')
    el.style.transition = 'transform 400ms ease'
    setRandomBgColor(el)

    expect(el.style.transition).toBe(
      'transform 400ms ease, background-color 120ms',
    )
  })

  it('sets the background color for an element selector', () => {
    document.body.innerHTML = '<p id="my-el">foo</p>'
    setRandomBgColor('#my-el')

    const el = document.body.querySelector<HTMLElement>('#my-el')!
    expect(el.style.backgroundColor).toMatch(RGB)
    expect(el.style.transition).toBe('background-color 120ms')
    expect(el.dataset.darkMode).toMatch(/true|false/)
  })

  it('sets the background color for multiple elements via selector', () => {
    document.body.innerHTML = '<ul><li>foo</li><li>bar</li></ul>'
    setRandomBgColor('ul > li')

    const els = document.body.querySelectorAll<HTMLElement>('ul > li')
    expect(els.length).toBe(2)
    for (const el of els) {
      expect(el.style.backgroundColor).toMatch(RGB)
      expect(el.style.transition).toBe('background-color 120ms')
      expect(el.dataset.darkMode).toMatch(/true|false/)
    }
  })

  it('sets the background color for an element passed directly', () => {
    const el = document.createElement('div')
    setRandomBgColor(el)

    expect(el.style.backgroundColor).toMatch(RGB)
    expect(el.style.transition).toBe('background-color 120ms')
    expect(el.dataset.darkMode).toMatch(/true|false/)
  })

  it('adjusts the text contrast if `autoTextContrast` is set', () => {
    const el = document.createElement('div')
    setRandomBgColor(el, { autoTextContrast: true })

    expect(el.style.color).toMatch(/white|black/)

    // Text contrast should match the dark mode setting.
    expect(
      (el.style.color === 'white' && el.dataset.darkMode === 'true') ||
        (el.style.color === 'black' && el.dataset.darkMode === 'false'),
    ).toBe(true)
  })
})
