import express from 'express'
import { PORT } from './config/env.js'
import connectToDatabase from './database/mongodb.js'
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'

import errorMiddleware from './middleware/error.middleware.js';

const app = express()

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('Welcome to To-Do List!')
})

app.listen(PORT, async() => {
    console.log(`I am listening on port ${PORT}`)

    await connectToDatabase()
})

export default app