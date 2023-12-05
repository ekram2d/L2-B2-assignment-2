import { Request, Response } from 'express'

import { userService } from '../services/user.service'
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    // console.log('o', userData)
    const result = await userService.creatUser(userData)
    console.log(result)
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error,
    })
  }
}
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUser()
    //     console.log('ekram')
    const formattedUsers = users.map((user) => ({
      username: user.username,
      fullName: {
        firstName: user.fullName.firstName,
        lastName: user.fullName.lastName,
      },
      age: user.age,
      email: user.email,
      address: {
        street: user.address.street,
        city: user.address.city,
        country: user.address.country,
      },
    }))

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: formattedUsers,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error,
    })
  }
}
const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId

    const user = await userService.singleUser(userId)

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error, // Change 'error' to 'error.message' to capture the error message
    })
  }
}
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId
    const userDataToUpdate = req.body

    // Check if the user exists and update the data
    // console.log({ userId }, { userDataToUpdate })
    const updatedUser = await userService.updateUser(userId, userDataToUpdate)
    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
      return
    }
    // console.log({ updateUser })
    res.status(200).json({
      success: true,
      message: 'User updated successfully!!!!!!!!',
      data: updateUser,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error,
    })
  }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId

    // Find the user by ID and delete
    // console.log({ userId })
    const deletedUser = await userService.deleteUser(userId)

    // Check if the user was found and deleted
    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error,
    })
  }
}

export const userController = {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
