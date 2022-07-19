import autoLoad from '@fastify/autoload'

export { autoloadRoutes }

const autoloadRoutes = async (fastify, { log } = {}) => {
	try {
		await fastify.register(autoLoad, {
			dir: __dirname,
			scriptPattern: /^route(\.[\w\d]+)+\.js$/,
		})
		log?.('路由加載完成')
	} catch (err) {
		throw err
	}
}
