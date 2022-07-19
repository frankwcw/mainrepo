import Fastify from 'fastify'
import { env, setupEnv } from './lib/env'

const fastify = Fastify({
	logger: true,
})

fastify.get('/', async reply => {
	return { hello: 'world' }
})

!(async () => {
	try {
		setupEnv({ log: (...args) => fastify.log.info(...args) })

		const address = await fastify.listen({ port: env.PORT })
		fastify.log.info(`服務器已啟動, address: ${address}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})()
