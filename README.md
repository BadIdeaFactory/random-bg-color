# random-bg-color
Give your site a random background color from the Bad Idea Factory brand guidelines

Compatibility: IE9+

## usage

Installation:

```sh
npm install @biffud/random-bg-color
```

Script:

```js
// ES6+
import { randomBgColor } from '@biffud/random-bg-color'

// ES5 / AMD / CommonJS
var randomBgColor = require('@biffud/random-bg-color')
```

```html
<!-- global -->
<script src="./node_modules/@biffud/random-bg-color/src/bgcolor.js"></script>
<script>
  setRandomBgColor()
</script>
```

## options

### set the background color of elements other than the document body

```js
// give it a valid CSS selector
setRandomBgColor('h1')

// or
setRandomBgColor('.some-element > p.nested-child:first-child')
```

### prevent animated transitions

```js
setRandomBgColor(null, true)
```
