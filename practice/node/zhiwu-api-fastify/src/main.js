import Fastify from 'fastify'
import { env, setupEnv } from './lib/env'
import { autoloadRoutes } from './lib/autoload-routes'

const fastify = Fastify({
	logger: true,
})

const log = msg => fastify.log.info(msg)

!(async () => {
	try {
		setupEnv({ log })
		await autoloadRoutes(fastify, { log })

		await fastify.listen({ port: env.PORT })
		fastify.log.info(`服務器已啟動, port: ${env.PORT}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})()
