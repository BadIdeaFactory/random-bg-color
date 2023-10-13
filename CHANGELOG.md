# v1.3.0

- Version update only. Bumped test dependencies. Everything should work in Node.js v16 up to at least v20.

# v1.2.0

- Add a `data-dark-mode` data attribute to the styled element for finer-grained adjustments based on background color.
- Bumped test dependencies and update tests.

# v1.1.1

- Minor code style fixes.
- Whitelist files for published package.

# v1.1.0

- Add a new option `autoTextContrast` which also allows it to set the appropriate white or black text color to contrast with the background color.
- Improve tests.

# v1.0.0

- **Official release.**
- Breaking changes from alpha:
  - Exported function is now `setRandomBgColor()`.
  - If imported via `<script>` tag, `setRandomBgColor` will be exported on the `BIFFUD` object, rather globally. `BIFFUD` is a global object. Why do this? It's what we in the biz call the [YUI](https://yuilibrary.com/yui/docs/yui/) pattern. I'm just kidding. No one calls it that.
  - You can now pass in a reference to an element directly, if you don't want to use string selectors.
  - The `disallowTransition` argument has been replaced with an `options` object instead, where `disallowTransition` is the only property of that object that we understand. That way there's less technical hurdles to bloating this library with more options later.
- Fix a grip o' typos in the documentation.
- Add tests.
- Add example HTML (which is also a test).

# v1.0.0-alpha1

- Created on a train between Philadelphia and New York, so this package is technically a birthright citizen of New Jersey
