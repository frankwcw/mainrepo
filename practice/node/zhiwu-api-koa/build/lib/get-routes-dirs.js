const fs = require('fs')
const { recurFindMatchFiles } = require('./recur-find-match-files')

const getRoutesDirs = async (
	routesDirPath = '',
	fileNameMatch = undefined,
	mapCallback,
) => {
	const resultPaths = await recurFindMatchFiles(
		routesDirPath,
		'',
		fileNameMatch,
	)

	if (resultPaths.length === 0) console.log('找不到路由目錄')

	const filePaths = await Promise.all(
		resultPaths.map(
			filePath =>
				// 過濾未 export default router 的檔案
				new Promise(resolve => {
					const fileString = fs.readFileSync(filePath).toString()
					if (fileString.match(/export\s+default\s+router/)) resolve(filePath)
					else resolve(undefined)
				}),
		),
	)

	const resultFilePaths = []

	filePaths.forEach((filePath, index, els) => {
		if (filePath != null) {
			resultFilePaths.push(
				mapCallback != null ? mapCallback(filePath, index, els) : filePath,
			)
		}
	})

	if (resultFilePaths.length === 0) console.log('沒有可用路由檔')

	return resultFilePaths
}

module.exports = { getRoutesDirs }
