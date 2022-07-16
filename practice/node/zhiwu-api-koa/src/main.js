import { setupEnv } from './lib/env'
import { setupServer } from './lib/server'
import { setupMongodb } from './lib/setup-mongodb'
import { setupLogger } from './lib/setup-logger'

!(async function setup() {
	if (!setupEnv()) return
	if (!(await setupMongodb())) return
	setupLogger()
	setupServer()
})()
