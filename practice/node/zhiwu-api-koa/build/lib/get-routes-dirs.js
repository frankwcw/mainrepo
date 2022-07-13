const fs = require('fs')
const { recurFindMatchFiles } = require('./recur-find-match-files')

const getRoutesDirs = async (routesDirPath = '', mapCallback) => {
	const resultPaths = await recurFindMatchFiles(routesDirPath, '')

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

/*

const fs = require('fs')

const findDeepExportDefault = (resultPaths = [], prePath = '', dirs = []) => {
	if (dirs.length === 0) return

	dirs.forEach(dir => {
		const prePathSlash = `${prePath === '' ? '' : `${prePath}/`}`
		const nextPath = `${prePathSlash}${dir}`
		const res = fs.statSync(nextPath)
		const isDir = res.isDirectory()

		if (isDir) {
			const nextDirs = fs.readdirSync(nextPath)
			findDeepExportDefault(resultPaths, nextPath, nextDirs)
			return
		}

		if (dir === 'index.js') {
			const fileString = fs.readFileSync(nextPath).toString()
			if (fileString.match(/export\s+default\s+router/)) {
				resultPaths.push(nextPath)
			}
		}
	})
}

const getRoutesDirs = (routesDirPath = '', mapCallback) => {
	try {
		const resultPaths = []
		findDeepExportDefault(resultPaths, '', [routesDirPath])

		if (mapCallback != null) {
			return resultPaths.map((e, i) => mapCallback(routesDirPath, e, i))
		}

		return resultPaths
	} catch {
		console.log('找不到路由目錄')
		return []
	}
}

module.exports = { getRoutesDirs }

 */

/*

const fs = require('fs')

const statCallback = (dir, resultPaths, nextPath) => (err, stats) => {
	const isDir = stats.isDirectory()

	if (isDir) {
		fs.readdir(nextPath, readdirCallback(resultPaths, nextPath))
		return
	}

	if (dir === 'index.js') {
		fs.readFile(nextPath, readFileCallback(resultPaths, nextPath))
	}
}

const readdirCallback = (resultPaths, nextPath) => (err, nextDirs) => {
	findDeepExportDefault(resultPaths, nextPath, nextDirs)
}

const readFileCallback = (resultPaths, nextPath) => (err, buffer) => {
	const fileString = buffer.toString()
	if (fileString.match(/export\s+default\s+router/)) {
		resultPaths.push(nextPath)
	}
}

const findDeepExportDefault = (resultPaths = [], prePath = '', dirs = []) => {
	if (dirs.length === 0) return

	dirs.forEach(dir => {
		const prePathSlash = `${prePath === '' ? '' : `${prePath}/`}`
		const nextPath = `${prePathSlash}${dir}`
		fs.stat(nextPath, statCallback(dir, resultPaths, nextPath))
	})
}

const getRoutesDirs = async (routesDirPath = '', mapCallback) => {
	try {
		const refs = {
			resultPaths: [],
		}
		const resultPaths = []
		await findDeepExportDefault(resultPaths, '', [routesDirPath])

		if (mapCallback != null) {
			return resultPaths.map((e, i) => mapCallback(routesDirPath, e, i))
		}

		return resultPaths
	} catch {
		console.log('找不到路由目錄')
		return []
	}
}

module.exports = { getRoutesDirs }


 */
