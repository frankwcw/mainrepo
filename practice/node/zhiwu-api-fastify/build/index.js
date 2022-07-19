const { build } = require('esbuild')
const { getCommandArgs } = require('./lib/get-command-args')
const { setupRoutes } = require('./lib/setup-routes')

const { mode } = getCommandArgs({
	mode: 'production',
})

const isProduction = mode === 'production'

!(async () => {
	const entryRoutes = await setupRoutes()

	console.log(`
	---------build 完成分隔線---------
	`)

	build({
		entryPoints: {
			main: './src/main.js',
			...entryRoutes,
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
