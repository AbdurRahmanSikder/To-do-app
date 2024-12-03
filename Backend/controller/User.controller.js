import User from "../model/User.model.js";
import { z } from "zod"
import bcrypt from "bcryptjs"
import { generatewebtoken } from "../JWT/JWT.js";
const userSchema = z.object({
    username: z.string().min(3, { message: "Username length should be at least 3\n" }),
    email: z.string().email({ message: "Invalid email address\n" }),
    password: z.string().min(5, { message: "Password length should be at least 5\n" })
});

export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "please fill all the given field" });
        }
        const validation = userSchema.safeParse({ email, username, password });
        if (!validation.success) {
            const errors = validation.error.errors.map((err) => err.message);
            return res.status(400).json({ Error: errors });
        }
        const check = await User.findOne({ email });

        if (check) {
            return res.status(400).json({ message: "Already registered email", check });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const new_user = new User({ email, username, password: hashPassword });
        const token = await generatewebtoken(new_user._id,res);
        await new_user.save();
        return res.status(201).json({ message: "Successfully registered", new_user , token });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Registration Error", error });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Please fill all the require field" });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid Email address or Password" });
        }
        const token = await generatewebtoken(user._id,res);
        return res.status(201).json({ message: "Successfully Login", user, token });
    }
    catch(error){
        return res.status(400).json({ message: "Login Error", error });
    }
}


export const logout = (req, res) => {
    try{
        res.clearCookie("jwt",{
            path: "/"
        })
        return res.status(201).json({ message: "Logout Successfully"});
    }
    catch(error){
        console.log(error);
        return res.status(400).json({ message: "Logout Error",error});
    }
}
