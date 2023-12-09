import { Request, Response } from 'express'

import { userService } from '../services/user.service'
// import { ObjectSchema } from 'joi'
import createUserValidation from '../validation/user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const { error, value } = createUserValidation.validate(userData)

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.details,
      })
    }

    const result = await userService.creatUser(value)

    // Define the specific response structure when the user is created successfully
    const responseData = {
      success: true,
      message: 'User created successfully!',
      data: {
        userId: result.userId,
        username: result.username,
        fullName: {
          firstName: result.fullName.firstName,
          lastName: result.fullName.lastName,
        },
        age: result.age,
        email: result.email,
        isActive: result.isActive,
        hobbies: result.hobbies,
        address: result.address,
      },
    }

    return res.status(201).json(responseData)
  } catch (error: any) {
    // In case of an error, return a standard error response
    return res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error?.message,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error?.message,
    })
  }
}
export const getSingleUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId: string = req.params.userId
    const user = await userService.singleUser(userId)

    if (!user) {
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

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: {
        userId: user?.userId,
        username: user?.username,
        fullName: user?.fullName,
        age: user?.age,
        email: user?.email,
        isActive: user?.isActive,
        hobbies: user?.hobbies,
        address: user?.address,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: {
        code: 500,
        description: error.message || 'Internal Server Error',
      },
    })
  }
}
const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.userId
    const userDataToUpdate = req.body

    const { success, data } = await userService.updateUser(
      userId,
      userDataToUpdate,
    )

    if (!success) {
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

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: {
        userId: data?.userId,
        username: data?.username,
        fullName: data?.fullName,
        age: data?.age,
        email: data?.email,
        isActive: data?.isActive,
        hobbies: data?.hobbies,
        address: data?.address,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: {
        code: 500,
        description: error?.message || 'Internal Server Error',
      },
    })
  }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.userId

    const deletedUser = await userService.deleteUser(userId)

    if (!deletedUser) {
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

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: {
        code: 500,
        description: error?.message || 'Internal Server Error',
      },
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
