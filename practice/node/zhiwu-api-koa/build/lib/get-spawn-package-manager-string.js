const getSpawnPackageManagerString = (packageManagerName = 'pnpm') =>
	/^win/.test(process.platform)
		? `${packageManagerName}.cmd`
		: packageManagerName

module.exports = { getSpawnPackageManagerString }
