import Router from 'koa-router'

const router = new Router()

router.get('/', ctx => {
	ctx.body = 'hello zhiwu-api-koa!'
})

export default router
