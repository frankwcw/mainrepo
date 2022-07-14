export { jsonError }

/** @type {(ctx: BaseContext, next: () => Promise<any>) => Promise<any>} */
const jsonError = async (ctx, next) => {
	try {
		await next()

		if (ctx.status === 404) throw ctx.throw(404, 'Not Found')
	} catch (err) {
		const { stack, message, name, status } = err
		const isProduction = ESBUILD_DEFINE_MODE === 'production'

		ctx.body = {
			stack: isProduction ? null : stack,
			message,
			name,
			status: status || 500,
		}

		if (!isProduction) console.log(stack)
	}
}
