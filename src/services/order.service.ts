import { Order } from '../interfaces/user.interface'
import UserModel from '../models/user.model' // Assuming UserDocument is the user model document type

const addOrder = async (
  userId: string,
  orderData: Order,
): Promise<Order | null> => {
  const updatedUser = await UserModel.findOne({ userId: userId })
  console.log(updatedUser)

  if (!updatedUser) {
    throw new Error('User not found')
  }

  if (!updatedUser.orders) {
    updatedUser.orders = []
  }

  updatedUser.orders.push(orderData)
  const savedUser = await updatedUser.save()

  return savedUser
}
const getOrder = async (userId: string): Promise<Order | null> => {
  const gettedUser = await UserModel.findOne({ userId: userId })
  console.log(gettedUser?.orders)

  if (!gettedUser) {
    throw new Error('User not found')
  }

  return gettedUser?.orders
}

export const orderService = {
  addOrder,
  getOrder,
}
