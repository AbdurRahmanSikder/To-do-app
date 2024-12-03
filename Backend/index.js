import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import route from "./routes/Todo.route.js";
import userRoute from "./routes/User.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;
try {
    mongoose.connect(URI);
    console.log(`MongoDB connected`);
}
catch (error){
    console.log(error);
}
app.get('/', (req, res) => {
    res.send("Hello worlds!!");
});
app.use(cors({
    origin: process.env.Forntend_URL,
    credentials: true,
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type" , "Authorization"]

}))
app.use(cookieParser());
app.use(express.json());
app.use("/todo",route);
app.use("/user", userRoute);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

