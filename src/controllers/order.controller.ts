import { Request, Response } from 'express'
import { Order } from '../interfaces/user.interface'
import { orderService } from '../services/order.service'
import { userService } from '../services/user.service'

const addToOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId
    const { productName, price, quantity } = req.body

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

    // Fetch orders for the specified user from the database
    const getsingle = await userService.singleUser(userId)

    if (!getsingle) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
      return
    }
    const orders = await orderService.getOrder(userId)
    // Extract only the necessary fields from orders
    const userOrders = orders?.map((order: Order) => ({
      productName: order.productName,
      price: order.price,
      quantity: order.quantity,
    }))

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

const getSinleUserOrdersSum = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.userId

    // Check if the user exists

    const getsingle = await userService.singleUser(userId)

    if (!getsingle) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
      return
    }
    const Orders = await orderService.getOrderTotal(userId)
    // User found, retrieve orders
    const userOrders = Orders?.orders
    // const userOrders = user.orders;
    const totalPrice = userOrders?.reduce(
      (acc: number, order: Order) => acc + order.price * order.quantity,
      0,
    )

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: totalPrice?.toFixed(2), // Convert to fixed decimal places if needed
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate total price',
      error: {
        code: 500,
        description: error,
      },
    })
  }
}
export const orderController = {
  addToOrder,
  getSinleUserOrders,
  getSinleUserOrdersSum,
}
