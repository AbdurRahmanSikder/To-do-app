import express from "express";
import { login, logout, register } from "../controller/User.controller.js"
const userRoute = express.Router();
userRoute.post("/login", login);
userRoute.post("/register", register);
userRoute.get("/logout", logout);
export default userRoute;