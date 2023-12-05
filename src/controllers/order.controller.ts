import { Request, Response } from 'express'
import { Order } from '../interfaces/user.interface'
import { orderService } from '../services/order.service'

const addToOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId
    const { productName, price, quantity } = req.body

    // Check if the user exists
    // const userExists = await UserModel.findById(userId)
    // if (!userExists) {
    //   res.status(404).json({ success: false, message: 'User not found' })
    //   return
    // }

    const orderData: Order = {
      productName,
      price,
      quantity,
    }
    // console.log({ userId }, { orderData })
    const updatedUser = await orderService.addOrder(userId, orderData)

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: updatedUser, // Assuming orders is an array in the User model
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error,
    })
  }
}

const getSinleUserOrders = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.userId

    // Check if the user exists
    const Orders = await orderService.getOrder(userId)
    if (!Orders) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
      return
    }

    // User found, retrieve orders
    const userOrders = Orders

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders: userOrders,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error,
    })
  }
}
export const orderController = {
  addToOrder,
  getSinleUserOrders,
}
