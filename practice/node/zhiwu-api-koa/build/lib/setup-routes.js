const path = require('path')
const { getRoutesDirs } = require('./get-routes-dirs')

const setupRoutes = async (entryPath = './src/routes') => {
	const routesDirPath = path.join(process.cwd(), entryPath)

	return await getRoutesDirs(routesDirPath, /^\/.+\.js$/).then(filePaths => {
		const entryRoutes = [],
			defineRoutes = []

		for (let i = 0; i < filePaths.length; i++) {
			const [, suffixPath] = filePaths[i].split(routesDirPath)
			entryRoutes.push(`${entryPath}${suffixPath}`)
			defineRoutes.push(`./routes${suffixPath}`)
		}

		return [
			entryRoutes,
			defineRoutes.length ? `"${defineRoutes.join(',')}"` : undefined,
		]
	})
}

module.exports = { setupRoutes }
