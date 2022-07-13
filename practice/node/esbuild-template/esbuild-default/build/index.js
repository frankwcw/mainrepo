const { build } = require('esbuild')
const { getCommandArgs } = require('./lib/get-command-args')

const { sourcemap } = getCommandArgs({
	sourcemap: false,
})

build({
	entryPoints: ['./src/core/main.js'],
	outfile: './dist/main.js',
	minify: true,
	bundle: true,
	sourcemap,
	platform: 'node',
}).catch(() => process.exit(1))
