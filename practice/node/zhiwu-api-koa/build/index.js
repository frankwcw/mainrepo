const { build } = require('esbuild')
const { getCommandArgs } = require('./lib/get-command-args')
const { setupRoutes } = require('./lib/setup-routes')

const { mode } = getCommandArgs({
	mode: 'production',
})

const isProduction = mode === 'production'

setupRoutes().then(([entryRoutes, ESBUILD_DEFINE_ROUTES]) => {
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
			ESBUILD_DEFINE_ROUTES,
			ESBUILD_DEFINE_MODE: `"${mode}"`,
		},
	}).catch(() => process.exit(1))
})
