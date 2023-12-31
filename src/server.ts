import app from './app'
import mongoose from 'mongoose'
import config from './app/config'

async function server() {
  try {
    await mongoose.connect(config.database_url!)
    console.log('conected mongodb')
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

server().catch((err) => console.log(err))
