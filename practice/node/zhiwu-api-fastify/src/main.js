import Fastify from 'fastify'
import { env, setupEnv } from './lib/env'

const fastify = Fastify({
	logger: true,
})

fastify.get('/', async reply => {
	return { hello: 'world' }
})

const start = async () => {
	try {
		if (!(await setupEnv())) return
		const address = await fastify.listen(env.PORT)
		console.log(`服務器已啟動, address: ${address}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()
