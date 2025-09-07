import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'User First Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: [true, 'User Last Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    userName: {
        type: String,
        required: [true,' Username is required'],
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 100,
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email request'],
    },
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minLength: 8,
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User