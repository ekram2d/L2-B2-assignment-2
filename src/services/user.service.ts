import { User } from '../interfaces/user.interface'
import UserModel from '../models/user.model'

const creatUser = async (userData: User): Promise<User> => {
  // console.log({ userData })
  const result = await UserModel.create(userData)
  return result
}

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
  updatedValue: User,
): Promise<User | { success: boolean; message: string }> => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updatedValue,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!updatedUser) {
      return { success: false, message: 'User not found or no changes applied' }
    }

    return updatedUser
  } catch (error) {
    // Handle specific errors or log them for debugging
    // console.error('Error updating user:', error)

    // Return appropriate error message
    return {
      success: false,
      message: 'Failed to update user. Please try again later.',
    }
  }
}

const deleteUser = async (userId: string): Promise<User | null> => {
  // const validUserId = new mongoose.Types.ObjectId(userId) // Use mongoose.Types.ObjectId
  // console.log({ validUserId })
  const deletedUser = await UserModel.findOneAndDelete({ userId })

  return deletedUser ? deletedUser : null // Return the deleted user or null if not found
}

export const userService = {
  creatUser,
  getUser,
  singleUser,
  updateUser,
  deleteUser,
}
