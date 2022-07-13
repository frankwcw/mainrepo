import { setupEnv } from './lib/env'
import { setupServer } from './lib/server'

!(function setup() {
	if (!setupEnv()) return
	setupServer()
})()
