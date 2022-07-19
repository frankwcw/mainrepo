/** @type {(fastify: FastifyInstance, opts: Options) => Promise<void>} */
const router = async (fastify, opts) => {
	fastify.get('/', async function (request, reply) {
		return 'Hi there!'
	})
}

export default router
