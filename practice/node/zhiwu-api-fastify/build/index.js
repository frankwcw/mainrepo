const { build } = require('esbuild')
const { getCommandArgs } = require('./lib/get-command-args')

const { mode } = getCommandArgs({
	mode: 'production',
})

const isProduction = mode === 'production'

build({
	entryPoints: {
		main: './src/main.js',
	},
	outdir: 'dist',
	minify: true,
	bundle: true,
	sourcemap: !isProduction,
	platform: 'node',
	define: {
		ESBUILD_DEFINE_MODE: `"${mode}"`,
	},
}).catch(() => process.exit(1))
