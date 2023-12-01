import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

console.log(process.cwd())
export default app
