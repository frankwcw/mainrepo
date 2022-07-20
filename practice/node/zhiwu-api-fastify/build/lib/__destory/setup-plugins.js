const path = require('path')
const { getExportDefaultFiles } = require('./get-export-default-files')

const setupPlugins = async (entryPath = './src/plugins') => {
	const rootDirPath = path.join(process.cwd(), entryPath)

	return await getExportDefaultFiles(rootDirPath, /^\/.+\.js$/).then(files => {
		const entryRoutes = {}

		for (let i = 0; i < files.length; i++) {
			const { path: filePath, ext: fileExt } = files[i]
			const noEntryPathFilePath = filePath.replace(`${rootDirPath}/`, '')
			const entryRouteName = `plugins.${noEntryPathFilePath
				.split('/')
				.join('.')
				.replace(new RegExp(`\.${fileExt}$`), '')}`
			entryRoutes[entryRouteName] = `${entryPath}/${noEntryPathFilePath}`
		}

		console.log('entryRoutes:', entryRoutes)

		return entryRoutes
	})
}

module.exports = { setupPlugins }
