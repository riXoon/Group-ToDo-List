import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post('/sign-up', signUp)
authRouter.post('/sign-in', (req, res) => 'signed in')
authRouter.post('/sign-out', (req, res) => 'signed out')

export default authRouter