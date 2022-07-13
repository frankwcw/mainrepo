const fs = require('fs')

const NOT_FOUND_PACKAGE_JSON = 'NOT_FOUND_PACKAGE_JSON'
const NOT_FOUND_PEER_DEPENDENCIES = 'NOT_FOUND_PEER_DEPENDENCIES'

const CODE_MESSAGE_TRANS = {
	[NOT_FOUND_PACKAGE_JSON]:
		'找不到 package.json 請確認執行命令的路徑是否為專案的跟目錄',
	[NOT_FOUND_PEER_DEPENDENCIES]: '找不到需要安裝的依賴',
}

const getPeerDependencies = ({
	hasPackageVersion = true,
	ignorePackages = [],
} = {}) => {
	try {
		let packageJson
		try {
			packageJson = JSON.parse(
				fs.readFileSync(`${process.cwd()}/package.json`).toString(),
			)
		} catch {
			throw new Error(NOT_FOUND_PACKAGE_JSON)
		}
		const peerDependencies = packageJson.peerDependencies

		if (peerDependencies == null) throw new Error(NOT_FOUND_PEER_DEPENDENCIES)

		const ignorePackageNameObj = ignorePackages.reduce(
			(prev, packageName) => ((prev[packageName] = 1), prev),
			{},
		)
		const excludePeerDependencies = []

		Object.entries(peerDependencies).forEach(([name, version]) => {
			if (ignorePackageNameObj[name] != null) return

			excludePeerDependencies.push(
				`${name}${hasPackageVersion ? `@${version}` : ''}`,
			)
		})

		return excludePeerDependencies
	} catch (error) {
		if (Object.keys(CODE_MESSAGE_TRANS).includes(error.message)) {
			console.log(CODE_MESSAGE_TRANS[error.message])
			return null
		}
		console.error(error)
	}
}

module.exports = {
	getPeerDependencies,
}
