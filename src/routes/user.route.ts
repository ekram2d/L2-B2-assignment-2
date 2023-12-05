import express from 'express'
import { userController } from '../controllers/user.controller'
import { orderController } from '../controllers/order.controller'

export const router = express.Router()

router.post('/users', userController.createUser)
router.get('/users', userController.getUsers)
router.get('/users/:userId', userController.getSingleUser)
router.patch('/users/:userId', userController.updateUser)
router.delete('/users/:userId', userController.deleteUser)
router.post('/users/:userId/orders', orderController.addToOrder)
router.get('/users/:userId/orders', orderController.getSinleUserOrders)
router.get(
  '/users/:userId/orders/total-price',
  orderController.getSinleUserOrdersSum,
)
export const userRoutes = router
