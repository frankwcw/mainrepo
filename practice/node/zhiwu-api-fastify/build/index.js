const { build } = require('esbuild')
const { getCommandArgs } = require('./lib/get-command-args')
const { setupPlugins } = require('./lib/setup-plugins')

const { mode } = getCommandArgs({
	mode: 'production',
})

const isProduction = mode === 'production'

!(async () => {
	const entryPlugins = await setupPlugins()

	console.log(`
	---------build 完成分隔線---------
	`)

	build({
		entryPoints: {
			main: './src/main.js',
			...entryPlugins,
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
})()
