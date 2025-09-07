import express from 'express'
import { PORT } from './config/env.js'
import connectToDatabase from './database/mongodb.js'
const app = express()

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(PORT, async() => {
    console.log(`I am listening on port ${PORT}`)

    await connectToDatabase()
})

export default app