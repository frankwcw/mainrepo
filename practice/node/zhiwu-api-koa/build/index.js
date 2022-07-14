const { build } = require('esbuild')
const { getCommandArgs } = require('./lib/get-command-args')
const { setupRoutes } = require('./lib/setup-routes')

const { sourcemap } = getCommandArgs({
	sourcemap: false,
})

setupRoutes().then(([entryRoutes, ESBUILD_DEFINE_ROUTES]) => {
	build({
		// entryPoints: ['./src/main.js', ...entryRoutes],
		entryPoints: {
			main: './src/main.js',
			...entryRoutes,
		},
		outdir: 'dist',
		minify: true,
		bundle: true,
		sourcemap,
		platform: 'node',
		define: {
			ESBUILD_DEFINE_ROUTES,
		},
	}).catch(() => process.exit(1))
})
