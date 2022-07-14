import Koa from 'koa'
import { env } from './env'
import { setupRouter } from '../middleware/setup-router'
import { jsonError } from '../middleware/json-error'

export { setupServer }

const setupServer = async () => {
	const { PORT = 7777 } = env
	const app = new Koa()

	app.use(jsonError)
	await setupRouter(app)

	app.listen(PORT)

	console.log(`服務器已啟動，訪問：http://localhost:${PORT}`)
}
