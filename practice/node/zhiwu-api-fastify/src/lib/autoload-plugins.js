import autoLoad from '@fastify/autoload'

export { autoloadPlugins }

const autoloadPlugins = async (fastify, { log } = {}) => {
	try {
		await fastify.register(autoLoad, {
			dir: __dirname,
			scriptPattern: /^plugins(\.[\w\d]+)+\.js$/,
		})
		log?.('插件加載完成')
	} catch (err) {
		throw err
	}
}
