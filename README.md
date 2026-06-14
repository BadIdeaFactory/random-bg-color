[![CI](https://github.com/BadIdeaFactory/random-bg-color/actions/workflows/ci.yml/badge.svg)](https://github.com/BadIdeaFactory/random-bg-color/actions/workflows/ci.yml)

# random-bg-color

Give your site a random background color from the **official** Bad Idea Factory brand guidelines.

NOTE: these are not the same colors from the actual Bad Idea Factory website, which does not use the same colors from the official Bad Idea Factory brand guidelines.

Ships as ESM, CommonJS, and a standalone browser bundle, with TypeScript type definitions included.

## Installation

```sh
npm install @biffud/random-bg-color
```

## Usage

```js
// ESM
import { setRandomBgColor } from '@biffud/random-bg-color'

// CommonJS
const { setRandomBgColor } = require('@biffud/random-bg-color')

setRandomBgColor()
```

```html
<!-- Browser / CDN: exposed on the `RandomBgColor` global -->
<script src="https://unpkg.com/@biffud/random-bg-color"></script>
<script>
  RandomBgColor.setRandomBgColor()
</script>
```

## API

### `setRandomBgColor(target?, options?)`

Sets the background color of one or more elements to a random color from the
BIFFUD palette. Every matched element receives the same color.

- `target` — a CSS selector string, an `Element`, or `null`/omitted for `<body>`.
- `options` — see below.

```js
// Give it a valid CSS selector
setRandomBgColor('h1')

// Complex selectors work too; anything that document.querySelectorAll() accepts
setRandomBgColor('.some-element > p.nested-child:first-child')

// You can also pass in a reference to an element directly
const el = document.createElement('div')
setRandomBgColor(el)
```

#### Options

| Option               | Type      | Default | Description                                                                   |
| -------------------- | --------- | ------- | ----------------------------------------------------------------------------- |
| `disallowTransition` | `boolean` | `false` | When `true`, the CSS `transition` is left untouched so the color is instant.  |
| `autoTextContrast`   | `boolean` | `false` | When `true`, sets text `color` to `black`/`white` to contrast the background. |

### Prevent animated transitions

```js
setRandomBgColor(null, { disallowTransition: true })
```

### Color contrast

By default we don't adjust the text color of the element. This is because you
might have child elements that contain different types of content and you might
want finer-grained control. To help you do this, we add the `data-dark-mode`
data attribute to the element. It looks like this:

```html
<body
  style="transition: background-color 120ms ease 0s; background-color: rgb(0, 156, 155);"
  data-dark-mode="true"
></body>
```

You can then style it like this:

```css
body[data-dark-mode='true'] {
  color: white;
}
```

### Automatically adjust text contrast

If you want us to do this automatically, there is an option that will add the
`color` style as well.

```js
setRandomBgColor(null, { autoTextContrast: true })
```

The behavior is to set the `color` style of the same element where the
`background-color` is changing. It assumes `white` on dark colors and `black` on
light colors. If you use this option you may want to set `color: inherit` on
child elements so that they pick up changes to the text color.

### Override transition style

This isn't a setting. Change it via CSS instead.

```css
body {
  transition: background-color 500ms ease-in-out !important;
}
```

## Development

This project is written in TypeScript and built with [tsup](https://tsup.egoist.dev/).

Development is done on the Node.js version pinned in [`.node-version`](./.node-version)
(Node 24). The published package targets ES2018 and runs on Node 18+ and any
modern browser.

```sh
npm install        # install dependencies
npm run dev        # rebuild on change
npm run build      # build ESM + CJS + IIFE bundles and type defs
npm test           # run the test suite (Vitest + jsdom)
npm run coverage   # run tests with coverage
npm run lint       # ESLint
npm run format     # Prettier (write)
npm run typecheck  # tsc --noEmit
```

To see the library in action in a browser, run `npm run build` and open
[`test/index.html`](./test/index.html).

## License

[MIT](./LICENSE)
