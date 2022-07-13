import Koa from 'koa'
import { env } from './env'
import { setupRouter } from './setup-router'

export { setupServer }

const setupServer = async () => {
	const { PORT = 7777 } = env
	const app = new Koa()

	await setupRouter(app)

	app.listen(PORT)

	console.log(`服務器已啟動，訪問：http://localhost:${PORT}`)
}
