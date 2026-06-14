import { defineConfig } from 'tsup'

export default defineConfig([
	// ESM + CJS builds for bundlers and Node, with type definitions.
	{
		entry: ['src/index.ts'],
		format: ['esm', 'cjs'],
		target: 'es2018',
		dts: true,
		sourcemap: true,
		clean: true,
	},
	// Standalone, minified browser build for <script> / CDN usage.
	// Exposes a `RandomBgColor` global, e.g. `RandomBgColor.setRandomBgColor()`.
	{
		entry: ['src/index.ts'],
		format: ['iife'],
		target: 'es2018',
		globalName: 'RandomBgColor',
		minify: true,
		sourcemap: true,
	},
])
