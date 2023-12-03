import { Request, Response } from 'express'
import UserModel from '../models/user.model'
import { User } from '../interfaces/user.interface'

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newUser: User = await UserModel.create(req.body)

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: newUser,
    })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to create user', error: error })
  }
}

// Retrieve a list of all users (with specific fields)
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find(
      {},
      'username fullName age email address',
    ) // Select specific fields
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch users', error: error })
  }
}

// Retrieve a specific user by ID
export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.userId
    const user = await UserModel.findById(userId, '-password')
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' })
      return
    }
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch user', error: error })
  }
}

// Update user information
export const updateUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.userId
    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedUser) {
      res.status(404).json({ success: false, message: 'User not found' })
      return
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to update user', error: error })
  }
}

// Delete a user
export const deleteUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.userId
    const deletedUser = await UserModel.findByIdAndDelete(userId)
    if (!deletedUser) {
      res.status(404).json({ success: false, message: 'User not found' })
      return
    }
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to delete user', error: error })
  }
}

export default {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
}
