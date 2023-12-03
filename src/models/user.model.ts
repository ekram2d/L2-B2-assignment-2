import { Schema, model } from 'mongoose'
import { User } from '../interfaces/user.interface'

const userSchema = new Schema<User>({
  userId: { type: Number, required: [true, 'User ID is required'] },
  username: { type: String, required: [true, 'Username is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: { type: Boolean, required: [true, 'Active status is required'] },
  hobbies: [{ type: String }],
  address: {
    street: { type: String, required: [true, 'Street is required'] },
    city: { type: String, required: [true, 'City is required'] },
    country: { type: String, required: [true, 'Country is required'] },
  },
  orders: [
    {
      productName: {
        type: String,
        required: [true, 'Product name is required'],
      },
      price: { type: Number, required: [true, 'Price is required'] },
      quantity: { type: Number, required: [true, 'Quantity is required'] },
    },
  ],
})

const UserModel = model<User>('User', userSchema)
export default UserModel
