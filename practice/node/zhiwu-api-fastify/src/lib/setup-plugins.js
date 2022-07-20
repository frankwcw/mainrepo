import { routesPlugin } from '../plugins/routes-plugin'

export { setupPlugins }

const setupPlugins = async fastify => {
	await fastify.register(routesPlugin)
}
