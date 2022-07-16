import { setupEnv } from './lib/env'
import { setupServer } from './lib/server'
import { setupMongodb } from './lib/setup-mongodb'

!(async function setup() {
	if (!setupEnv()) return
	if (!(await setupMongodb())) return
	setupServer()
})()
