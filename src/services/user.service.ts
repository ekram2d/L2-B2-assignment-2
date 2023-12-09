import { User } from '../interfaces/user.interface'
import UserModel from '../models/user.model'

const creatUser = async (userData: User): Promise<User> => {
  const result = await UserModel.create(userData)

  return result
}

// const creatUser = async (userData: User) => await UserModel.create(userData)

const getUser = async (): Promise<User[]> => {
  const result = await UserModel.find()
  return result
}

const singleUser = async (userId: string): Promise<User | null> => {
  try {
    const user = await UserModel.findOne({ userId: userId })

    if (user) {
      return user
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
const updateUser = async (
  userId: string,
  updatedValue: Partial<User>,
): Promise<{ success: boolean; message: string; data?: User }> => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { userId: userId }, // Assuming the field to search for is userId
      updatedValue,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!updatedUser) {
      return {
        success: false,
        message: 'User not found or no changes applied',
      }
    }

    return {
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update user. Please try again later.',
    }
  }
}

const deleteUser = async (userId: string): Promise<User | null> => {
  try {
    const deletedUser = await UserModel.findOneAndDelete({ userId }).lean()
    return deletedUser as User | null
  } catch (error) {
    throw new Error('Failed to delete user') // Handle any errors while deleting the user
  }
}
export const userService = {
  creatUser,
  getUser,
  singleUser,
  updateUser,
  deleteUser,
}
