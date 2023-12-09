import { Order, User } from '../interfaces/user.interface'
import UserModel from '../models/user.model' // Assuming UserDocument is the user model document type

const addOrder = async (
  userId: string,
  orderData: Order,
): Promise<Order | null> => {
  const updatedUser = await UserModel.findOne({ userId: userId })
  // console.log(updatedUser)

  if (!updatedUser) {
    throw new Error('User not found')
  }

  if (!updatedUser.orders) {
    updatedUser.orders = []
  }

  updatedUser.orders.push(orderData)
  await updatedUser.save()

  return null
}
const getOrder = async (userId: string): Promise<Order[] | null> => {
  const gettedUser = await UserModel.findOne({ userId: userId })

  if (!gettedUser) {
    throw new Error('User not found')
  }

  const order = gettedUser?.orders
  return order || null
}

const getOrderTotal = async (userId: string): Promise<User | null> => {
  const gettedUser = await UserModel.findOne({ userId: userId })
  // console.log(gettedUser?.orders)

  if (!gettedUser) {
    throw new Error('User not found')
  }

  return gettedUser
}

export const orderService = {
  addOrder,
  getOrder,
  getOrderTotal,
}
