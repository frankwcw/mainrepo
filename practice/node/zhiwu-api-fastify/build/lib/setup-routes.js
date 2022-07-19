const path = require('path')
const { getRoutesDirs } = require('./get-routes-dirs')

const setupRoutes = async (entryPath = './src/routes') => {
	const routesDirPath = path.join(process.cwd(), entryPath)

	return await getRoutesDirs(routesDirPath, /^\/.+\.js$/).then(files => {
		const entryRoutes = {}

		for (let i = 0; i < files.length; i++) {
			const { path: filePath, ext: fileExt } = files[i]
			const noEntryPathFilePath = filePath.replace(`${routesDirPath}/`, '')
			const entryRouteName = `route.${noEntryPathFilePath
				.split('/')
				.join('.')
				.replace(new RegExp(`\.${fileExt}$`), '')}`
			entryRoutes[entryRouteName] = `${entryPath}/${noEntryPathFilePath}`
		}

		console.log('entryRoutes:', entryRoutes)

		return entryRoutes
	})
}

module.exports = { setupRoutes }
