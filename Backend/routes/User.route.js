import express from "express";
import { isAuth, login, logout, register } from "../controller/User.controller.js"
import { authorization } from "../middleware/authorize.js";
const userRoute = express.Router();
userRoute.post("/login", login);
userRoute.post("/register", register);
userRoute.get("/logout", logout);
userRoute.get("/isauth",authorization, isAuth);
export default userRoute;