(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.BIFFUD = root.BIFFUD || {};
    root.BIFFUD.setRandomBgColor = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  /**
   * Selects a random color from the BIFFUD palette.
   *
   * @return {string} hex code of color
   */
  function selectRandomColor () {
    var colors = [
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
      '#be1622'
    ]
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
  }

  /**
   * Sets the background color of elements to a random BIFFUD pallete
   * color. Elements are chosen when given a valid css selector.
   * If a selector is not provided, the default element that this acts
   * on will be the document's <body> element. Otherwise, all valid
   * elements found by that selector will have its background color
   * changed to the same randomly selected color.
   *
   * @param {string|HTMLElement} selector - defaults to <body>
   * @param {Object} options - accepts the following properties:
   *    disallowTransition - if false, does not override
   *      the CSS transition property. Defaults to `true`
   *    autoTextContrast - if true, attempts to automatically
   *      adjust text color to contrast with background color
   * @return undefined (this is a side effect)
   */
  function setRandomBgColor (selector, options) {
    var els, css;
    var options = options || {};
    if (options.disallowTransition !== true) {
      css = 'background-color 120ms';
    }
    if (typeof selector === 'string') {
      els = Array.prototype.slice.call(document.querySelectorAll(selector));
    } else if (selector instanceof Element) {
      // TODO: allow array of elements
      els = [selector];
    } else {
      els = [document.body];
    }
    if (Array.isArray(els)) {
      els.forEach(function (el) {
        if (el.style.transition && css) {
          if (el.style.transition.indexOf(css) === -1) {
            el.style.transition += ', ' + css;
          }
        } else if (css) {
          el.style.transition = css;
        }
        var color = selectRandomColor();
        el.style.backgroundColor = color;
        if (color === '#fcea10' || color === '#ffda00') {
          el.dataset.darkMode = false;
          if (options.autoTextContrast === true) {
            el.style.color = 'black';
          }
        } else {
          el.dataset.darkMode = true;
          if (options.autoTextContrast === true) {
            el.style.color = 'white';
          }
        }
      })
    }
  }

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return setRandomBgColor;
}));
