import { BaseContext } from 'koa'

export { homeController }

class HomeController {
	/** @param {BaseContext} ctx */
	index(ctx) {
		ctx.body = 'hello zhiwu-api-koa!'
	}
}

const homeController = new HomeController()
