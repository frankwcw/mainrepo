import Router from 'koa-router'
import { userController } from '../controllers/users'

const router = new Router({ prefix: '/users' })

router.get('/', userController.find)
router.get('/:id', userController.findOne)
router.post('/:id', userController.create)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

export default router
