import Fastify from 'fastify'
import { env, setupEnv } from './lib/env'
import { autoloadPlugins } from './lib/autoload-plugins'

const fastify = Fastify({
	logger: true,
})

const log = msg => fastify.log.info(msg)

!(async () => {
	try {
		setupEnv({ log })
		await autoloadPlugins(fastify, { log })

		await fastify.listen({ port: env.PORT })
		fastify.log.info(`服務器已啟動, port: ${env.PORT}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})()
