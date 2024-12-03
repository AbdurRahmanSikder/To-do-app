import express from "express";
import { login, logout, register } from "../controller/User.controller.js"
const userRoute = express.Router();
userRoute.post("/login", login);
userRoute.get("/logout", logout);
userRoute.post("/register", register);
export default userRoute;