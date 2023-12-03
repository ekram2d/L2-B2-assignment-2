import { User } from '../interfaces/user.interface'
import UserModel from '../models/user.model'

const creatUser = async (userData: User): Promise<User> => {
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
  id: string,
  userData: Partial<User>,
): Promise<User | null> => {
  const result = await UserModel.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  })

  return result ? result : null
}
const deleteUser = async (id: string): Promise<User | null> => {
  const result = await UserModel.findByIdAndDelete(id)

  // Check if result exists and map it to the User type
  if (result) {
    return result.value
  } else {
    return null
  }
}
export const userService = {
  creatUser,
  getUser,
  singleUser,
  updateUser,
  deleteUser,
}
