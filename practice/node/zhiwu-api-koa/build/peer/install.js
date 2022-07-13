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
	console.log('peerDependencies 安裝完畢')
}

const peerDependencies = getPeerDependencies()

if (peerDependencies == null) return

const nodeGlobalInstall = spawn(getSpawnPackageManagerString(), [
	'i',
	'-g',
	...peerDependencies,
])

console.log(`開始安裝 peerDependencies...`)

nodeGlobalInstall.stdout.on('data', logSpawnData)
nodeGlobalInstall.stderr.on('data', logSpawnData)
nodeGlobalInstall.on('close', logCloseSpawnData)
