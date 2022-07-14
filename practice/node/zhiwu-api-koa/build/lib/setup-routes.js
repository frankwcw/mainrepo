const path = require('path')
const { getRoutesDirs } = require('./get-routes-dirs')

const setupRoutes = async (entryPath = './src/routes') => {
	const routesDirPath = path.join(process.cwd(), entryPath)

	return await getRoutesDirs(routesDirPath, /^\/.+\.js$/).then(files => {
		const entryRoutes = {},
			defineRoutes = []

		for (let i = 0; i < files.length; i++) {
			const { name: fileName, ext: fileExt } = files[i]
			const routeFileName = `route.${fileName}`
			entryRoutes[`route.${fileName}`] = `${entryPath}/${fileName}.${fileExt}`
			defineRoutes.push(`${routeFileName}.${fileExt}`)
		}

		const ESBUILD_DEFINE_ROUTES = defineRoutes.length
			? `"${defineRoutes.join(',')}"`
			: undefined

		console.log(entryRoutes, ESBUILD_DEFINE_ROUTES)

		return [entryRoutes, ESBUILD_DEFINE_ROUTES]
	})
}

module.exports = { setupRoutes }
