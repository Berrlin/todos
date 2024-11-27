import express from 'express'
import {registerUser, loginUser, forgetPassword, getUserInfo} from '../controller/UserController.js';
import authMiddleware from '../middleware/auth.js'

const userRoute = express.Router();
userRoute.post("/register",registerUser)
userRoute.post("/login",loginUser)
userRoute.post("/forget",forgetPassword)
userRoute.post("/get-user-info", authMiddleware, getUserInfo);
export default userRoute