const fs = require('fs')

const _deepFind = (refs, path, dirPath, level = 0) => {
	const nextPath = path + dirPath

	refs.totalPromiseNum++
	fs.stat(nextPath, (err, stat) => {
		if (err) return refs.checkResolve()

		const isDir = stat.isDirectory()

		if (isDir) {
			return fs.readdir(nextPath, (err, list) => {
				if (err) return refs.checkResolve()

				if (list.length > 0) {
					list.forEach(dir => _deepFind(refs, nextPath, `/${dir}`, level + 1))
				}

				refs.checkResolve()
			})
		} else if (dirPath.match(refs.fileNameMatch)) {
			const [matched, fullName, name, ext] = nextPath.match(
				/\/(([A-z.]+)\.([A-z]+))$/,
			)

			refs.files.push({
				level,
				path: nextPath,
				fullName,
				name,
				ext,
			})
		}

		refs.checkResolve()
	})
}

const findMatchFilesRecur = (path, dirPath, fileNameMatch = /^\/index\.js$/) =>
	new Promise(resolve => {
		const refs = {
			fileNameMatch,
			files: [],
			finishedPromiseNum: 0,
			totalPromiseNum: 0,
			checkResolve: () => {
				if (++refs.finishedPromiseNum >= refs.totalPromiseNum) {
					resolve(refs.files)
				}
			},
		}

		_deepFind(refs, path, dirPath)
	})

module.exports = { findMatchFilesRecur }
