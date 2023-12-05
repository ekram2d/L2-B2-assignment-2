export interface Order {
  productName: string
  price: number
  quantity: number
}
interface Fullname {
  firstName: string
  lastName: string
}
interface Address {
  street: string
  city: string
  country: string
}
export interface User {
  userId: number
  username: string
  password: string
  fullName: Fullname
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: Address
  orders: Order[]
}
