const { spawn } = require('child_process')
const {
	getSpawnPackageManagerString,
} = require('../lib/get-spawn-package-manager-string')
const { getPeerDependencies } = require('./helper')

const logSpawnData = data => {
	console.log(data.toString())
}

const logCloseSpawnData = data => {
	logSpawnData(data)
	console.log('peerDependencies link 完畢')
}

const peerDependencies = getPeerDependencies({
	hasPackageVersion: false,
	ignorePackages: ['pnpm', 'nodemon', 'prettier'],
})

if (peerDependencies == null) return

const linkDependencies = spawn(getSpawnPackageManagerString(), [
	'link',
	'-g',
	...peerDependencies,
])

console.log(`開始 link peerDependencies...`)

linkDependencies.stdout.on('data', logSpawnData)
linkDependencies.stderr.on('data', logSpawnData)
linkDependencies.on('close', logCloseSpawnData)
