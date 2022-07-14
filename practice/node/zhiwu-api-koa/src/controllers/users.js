export { userController }

class UserController {
	/** @param {BaseContext} ctx */
	find(ctx) {
		ctx.body = ['frank', 'jeff']
	}

	/** @param {BaseContext} ctx */
	findOne(ctx) {
		// ctx.throw(412, '找不到用戶')
		ctx.body = { name: 'frank' }
	}

	/** @param {BaseContext} ctx */
	create(ctx) {}

	/** @param {BaseContext} ctx */
	update(ctx) {}

	/** @param {BaseContext} ctx */
	delete(ctx) {
		ctx.status = 204
	}
}

const userController = new UserController()
