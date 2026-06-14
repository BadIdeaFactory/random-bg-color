/**
 * The official Bad Idea Factory brand palette.
 *
 * NOTE: these are not the same colors used on the actual Bad Idea Factory
 * website, which does not use the colors from the official brand guidelines.
 */
export const COLORS = [
  '#b3115a',
  '#af1781',
  '#883a8e',
  '#8f0863',
  '#54358c',
  '#625198',
  '#312783',
  '#24378d',
  '#224c9c',
  '#1d71b8',
  '#009c9b',
  '#31a936',
  '#9db41f',
  '#fcea10',
  '#ffda00',
  '#f39200',
  '#e94e1b',
  '#e6332a',
  '#e30613',
  '#be1622',
] as const

export type BiffudColor = (typeof COLORS)[number]

/** Colors light enough that dark text reads best on top of them. */
const LIGHT_COLORS: ReadonlySet<string> = new Set(['#fcea10', '#ffda00'])

const TRANSITION = 'background-color 120ms'

export interface SetRandomBgColorOptions {
  /**
   * If `true`, the CSS `transition` property is left untouched so the
   * background color changes instantly. Defaults to `false`.
   */
  disallowTransition?: boolean
  /**
   * If `true`, the element's text `color` is set to `black` or `white`
   * to contrast with the chosen background. Defaults to `false`.
   */
  autoTextContrast?: boolean
}

/**
 * Selects a random color from the BIFFUD palette.
 *
 * @returns the hex code of the chosen color
 */
export function selectRandomColor(): BiffudColor {
  const random = Math.floor(Math.random() * COLORS.length)
  return COLORS[random]
}

/**
 * Resolves the target argument into a concrete list of elements.
 *
 * - A string is treated as a CSS selector passed to `querySelectorAll`.
 * - An `Element` is used directly.
 * - Anything else (including `null`/`undefined`) defaults to `<body>`.
 */
function resolveElements(target?: string | Element | null): Element[] {
  if (typeof target === 'string') {
    return Array.from(document.querySelectorAll(target))
  }
  if (target instanceof Element) {
    return [target]
  }
  return [document.body]
}

/**
 * Sets the background color of one or more elements to a random color from
 * the BIFFUD palette. Every matched element receives the same color.
 *
 * @param target - a CSS selector, an `Element`, or `null` for `<body>`
 * @param options - see {@link SetRandomBgColorOptions}
 */
export function setRandomBgColor(
  target?: string | Element | null,
  options: SetRandomBgColorOptions = {},
): void {
  const css = options.disallowTransition ? undefined : TRANSITION

  for (const el of resolveElements(target)) {
    if (!(el instanceof HTMLElement)) continue

    if (css) {
      if (el.style.transition) {
        if (!el.style.transition.includes(css)) {
          el.style.transition += `, ${css}`
        }
      } else {
        el.style.transition = css
      }
    }

    const color = selectRandomColor()
    el.style.backgroundColor = color

    const isLight = LIGHT_COLORS.has(color)
    el.dataset.darkMode = String(!isLight)
    if (options.autoTextContrast) {
      el.style.color = isLight ? 'black' : 'white'
    }
  }
}
