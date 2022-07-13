import path from 'path'

export { setupRouter }

const setupRouter = async app => {
	if (ESBUILD_DEFINE_ROUTES != null) {
		await Promise.all(
			ESBUILD_DEFINE_ROUTES.split(',').map(e =>
				require(path.resolve(__dirname, e)),
			),
		).then(pkgs => {
			pkgs.forEach(pkg => {
				if (pkg?.default.routes != null) app.use(pkg.default.routes())
			})
		})
	}
}
