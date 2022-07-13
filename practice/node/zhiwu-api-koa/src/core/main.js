import { initEnvConfig, env } from './lib/env'

!(function setup() {
	if (!initEnvConfig()) return
	console.log(env)
})()
