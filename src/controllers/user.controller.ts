import { Request, Response } from 'express'
import UserModel from '../models/user.model'
const createUser = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find() // Fetch users from the database using your model

    res.status(200).json({
      status: 'success',
      message: 'Users fetched successfully',
      data: users,
    })
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Failed to fetch users',
      error: error,
    })
  }
}
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find() // Fetch users from the database using your model

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error,
    })
  }
}

export const userController = {
  getUsers,
  createUser,
}
