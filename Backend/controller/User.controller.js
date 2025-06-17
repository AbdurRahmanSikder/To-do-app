import User from "../model/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.json({ success: false, message: "please fill all the given field"});
        }

        const check = await User.findOne({ email });
        if (check)
            return res.json({ success: false, message: "Already registered" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, username, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, message: "User successfully registered", user });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "Please fill all the require field" });
        }
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.json({ success: false, message: "Invalid Email address or Password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie(
            'token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
        )
        return res.json({ success: true, message: "Successfully Login", user, token });
    }
    catch (error) {
        return res.json({success:false, message: "Login Error", error });
    }
}


export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        })
        return res.json({ success: true, message: "Logout Successfully" });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message, error });
    }
}

export const isAuth = async (req, res) => {
    try {
        const id   = req.user.id;
        if(!id) {
            return res.json({success: false , message : "No User Id"});
        } 
        const user = await User.findById(id);

        if(user) {
            return  res.json({success: true , message : "Authorized user" , name:user.username});
        }
        else {
            return  res.json({success: false , message : "User Not Found"});
        }
    }
    catch (error) {
        console.log(error);
    }
}