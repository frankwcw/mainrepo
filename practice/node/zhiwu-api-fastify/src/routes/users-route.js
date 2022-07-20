import * as controllers from '../controllers/users-controller'
import { mergeUrl } from '../lib/merge-url'

export { usersRoute }

/** @type {(fastify: FastifyInstance, opts: Options) => Promise<void>} */
const usersRoute = async (fastify, options) => {
	const prefixUrl = 'users'

	fastify.get(mergeUrl(prefixUrl), controllers.getList)

	fastify.get(mergeUrl(prefixUrl, ':id'), controllers.get)

	fastify.post(mergeUrl(prefixUrl), controllers.create)

	fastify.put(mergeUrl(prefixUrl, ':id'), controllers.update)

	fastify.delete(mergeUrl(prefixUrl, ':id'), controllers.del)
}
