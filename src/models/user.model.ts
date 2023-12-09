import { Schema, model } from 'mongoose'
import { User, Order } from '../interfaces/user.interface'
import validator from 'validator'
const orderSchema = new Schema<Order>({
  productName: { type: String, required: [true, 'Product name is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
})
import bcrypt from 'bcrypt'
import config from '../app/config'
// Create the User schema
const userSchema = new Schema<User>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: { type: String, required: [true, 'Username is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    type: {
      firstName: {
        type: String,
        required: [true, 'First name is required'],
        validate: {
          validator: function (value: string) {
            const isValidFirstName = /^[A-Z][a-zA-Z]*$/.test(value)
            return isValidFirstName
          },
          message:
            '{VALUE} is not in the correct format or contains invalid characters',
        },
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required'],
        validate: {
          validator: function (value: string) {
            const isValidFirstName = /^[A-Z][a-zA-Z]*$/.test(value)
            return isValidFirstName
          },
          message:
            '{VALUE} is not in the correct format or contains invalid characters',
        },
      },
    },
    required: [true, 'Full name is required'],
  },

  age: { type: Number, required: [true, 'Age is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),

      message: '{VALUE} is not correct email',
    },
  },
  isActive: { type: Boolean, required: [true, 'Active status is required'] },
  hobbies: {
    type: [
      {
        type: String,
      },
    ],
    validate: {
      validator: function (arr: string[]) {
        return arr && arr.length > 0
      },
      message: 'At least one hobby is required.',
    },
  },
  address: {
    street: { type: String, required: [true, 'Street is required'] },
    city: { type: String, required: [true, 'City is required'] },
    country: { type: String, required: [true, 'Country is required'] },
  },
  orders: [orderSchema], // Embed the order schema within the User schema
})

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(user?.password, Number(config.salt_round))
  // console.log(this, 'this will be save')
  next()
})
userSchema.post('save', function () {
  // console.log('this is save')
})

const UserModel = model<User>('User', userSchema)
export default UserModel
