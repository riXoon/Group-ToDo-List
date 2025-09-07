import express from 'express'
import { PORT } from './config/env.js'
import connectToDatabase from './database/mongodb.js'

import userRouter from './routes/user.routes.js'

const app = express()


app.use('api/v1/users', userRouter)


app.get('/', (req, res) => {
    res.send('Welcome to To-Do List!')
})

app.listen(PORT, async() => {
    console.log(`I am listening on port ${PORT}`)

    await connectToDatabase()
})

export default app