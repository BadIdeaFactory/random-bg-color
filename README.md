# random-bg-color
Give your site a random background color from the Bad Idea Factory brand guidelines

Compatibility: IE9+

## Usage

Installation:

```sh
npm install @biffud/random-bg-color
```

Script:

```js
// ES6+
import { setRandomBgColor } from '@biffud/random-bg-color'

// ES5 / AMD / CommonJS
var setRandomBgColor = require('@biffud/random-bg-color')
```

```html
<!-- exported on the BIFFUD global object -->
<script src="./node_modules/@biffud/random-bg-color/src/index.js"></script>
<script>
  BIFFUD.setRandomBgColor()
</script>
```

## Options

### Set the background color of elements other than the document body

```js
// Give it a valid CSS selector
setRandomBgColor('h1')

// Complex selectors work too; anything that document.querySelectorAll() accepts
setRandomBgColor('.some-element > p.nested-child:first-child')

// You can also pass in a reference to an element directly
const el = document.createElement('div')
setRandomBgColor(el)
```

### Override transition style

This isn't a setting. Change it via CSS instead.

```css
body {
  transition: background-color 500ms ease-in-out !important;
}
```

### Prevent animated transitions

Pass in an object to the second argument like this:

```js
setRandomBgColor(null, { disallowTransition: true })
```
