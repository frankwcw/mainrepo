import Router from 'koa-router'

const router = new Router({ prefix: '/users' })

router.get('/', ctx => {
	ctx.body = ['frank', 'jeff']
})

export default router
