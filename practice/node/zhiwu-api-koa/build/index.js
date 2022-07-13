const { build } = require('esbuild')
const { getCommandArgs } = require('./lib/get-command-args')
const { setupRoutesEntryPoints } = require('./lib/setup-routes-entry-points')

const { sourcemap } = getCommandArgs({
	sourcemap: false,
})

setupRoutesEntryPoints().then(([entryRoutes, ESBUILD_DEFINE_ROUTES]) => {
	build({
		entryPoints: ['./src/main.js', ...entryRoutes],
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
