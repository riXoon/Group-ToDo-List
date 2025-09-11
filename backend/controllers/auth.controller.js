import mongoose from 'mongoose'
import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {JWT_SECRET, JWT_EXPIRES_IN} from '../config/env.js'

export const signUp = async(req, res, next) => {
    //user creation logic
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {firstName, lastName, userName, email, password, confirmPassword} = req.body

        //check if the user already exist
        const existingUser = await User.findOne({email})

        if(existingUser){
            const error = new Error('User already exist')
            error.statusCode = 409
            throw error
        }

        if(password !== confirmPassword){
            const error = new Error('Passwords do not match')
            error.statusCode = 400 
            throw error
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUsers = await User.create([{firstName, lastName, userName, email, password: hashedPassword}], {session})

        //token creation
        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        await session.commitTransaction()
        session.endSession()

        //response
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUsers[0],
            }
        })
        
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
    
}

export const signIn = async(req, res, next) =>{
    //signin login
}