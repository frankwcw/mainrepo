const minimist = require('minimist')

/**
 * @return {<T extends object, Args = { [K in keyof T]: string }>(defaultArgs: Args, log?: Function) => Args}
 * 會自動將 key 等於 test-name 的格式轉換成 testName
 */
const getCommandArgs = (defaultArgs, log) => {
	const { _, ...args } = minimist(process.argv.slice(2))
	const newArgs = { ...defaultArgs, ...args }

	for (let k in newArgs) {
		const canTrans = k.includes('-')
		const transKey = canTrans
			? k
					.split('-')
					.filter(e => e !== '')
					.reduce(
						(p, e, i) =>
							i === 0 ? e : p + (e[0].toUpperCase() + e.substring(1)),
						'',
					)
			: k

		if (canTrans) {
			const val = newArgs[k] == null ? defaultArgs[k] : newArgs[k]
			delete newArgs[k]
			newArgs[transKey] = val
		}
	}

	if (log == null) {
		console.log('command args:')
		console.log(newArgs)
	} else {
		log('command args:', newArgs)
	}

	return newArgs
}

module.exports = getCommandArgs
