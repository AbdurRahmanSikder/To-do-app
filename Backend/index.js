import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import route from "./routes/Todo.route.js";
import userRoute from "./routes/User.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
await connectDB();
const allowedOrigin = ['http://localhost:5173' , 'https://todo-app-040.vercel.app'];
const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => {
     res.send("Api is working!!!");
});
app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}))
app.use("/todo",route);
app.use("/user", userRoute);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

