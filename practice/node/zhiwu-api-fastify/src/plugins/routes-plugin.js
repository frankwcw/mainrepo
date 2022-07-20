import { usersRoute } from '../routes/users-route'

export { routesPlugin }

/** @type {(fastify: FastifyInstance, opts: Options) => Promise<void>} */
const routesPlugin = async (fastify, options) => {
	await Promise.all([usersRoute(fastify, options)])

	fastify.log.info('routesPlugin 初始化完成')
}
