import Fastify from 'fastify'
import { env, setupEnv } from './lib/env'
import { setupMongoose } from './lib/setup-mongoose'
import { setupPlugins } from './lib/setup-plugins'

function Logger(...args) {
	this.args = args
}
Logger.prototype.info = function (msg) {
	console.log('myLogger', msg)
}
Logger.prototype.error = function (msg) {
	console.log('myLogger', msg)
}
Logger.prototype.debug = function (msg) {
	console.log('myLogger', msg)
}
Logger.prototype.fatal = function (msg) {
	console.log('myLogger', msg)
}
Logger.prototype.warn = function (msg) {
	console.log('myLogger', msg)
}
Logger.prototype.trace = function (msg) {
	console.log('myLogger', msg)
}
Logger.prototype.child = function () {
	return new Logger()
}

const myLogger = new Logger()

const fastify = Fastify({
	logger: myLogger,
})

const log = msg => fastify.log.info(msg)

!(async () => {
	try {
		setupEnv({ log })
		await setupMongoose({ log })
		await setupPlugins(fastify)

		await fastify.listen({ port: env.PORT })
		fastify.log.info(`服務器已啟動, port: ${env.PORT}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})()
