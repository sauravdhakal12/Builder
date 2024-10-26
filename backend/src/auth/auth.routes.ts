import express from "express";
const userRouter = express.Router();

import { loginUser, registerUser } from "./auth.handler";

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
