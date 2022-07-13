import { initEnvConfig, env } from './lib/env'

!(function setup() {
	if (!initEnvConfig()) return
	const a = 123
	console.log(env)
})()
