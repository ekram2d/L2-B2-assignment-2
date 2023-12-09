export interface Order {
  productName: string
  price: number
  quantity: number
}

// Define the User interface
export interface User {
  userId: number
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: {
    street: string
    city: string
    country: string
  }
  orders: Order[]
}
