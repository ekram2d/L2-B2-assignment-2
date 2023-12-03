import express from 'express'
import { userRoutes } from './routes/user.route'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
app.use('/', userRoutes) // Use the userRoutes directly

// Example route to test the server
// app.get('/', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'Welcome to muster card',
//   })
// })

export default app
