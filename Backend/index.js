import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import route from "./routes/Todo.route.js";
import userRoute from "./routes/User.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();


await connectDB();
const app = express();
const allowedOrigin = ['http://localhost:5173'];
const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => {
     res.send("Api is working!!!");
});
app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json());
app.use("/todo",route);
app.use("/user", userRoute);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

