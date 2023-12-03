import express from 'express'
import { userController } from '../controllers/user.controller'

export const router = express.Router()

router.post('/users', userController.createUser)
router.get('/users', userController.getUsers)
router.get('/users/:userId', userController.getSingleUser)
// router.delete('/users/:userId', userController.deleteUserById)
export const userRoutes = router
