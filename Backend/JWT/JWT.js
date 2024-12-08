import jwt from "jsonwebtoken";
import User from "../model/User.model.js";
export const generatewebtoken = async (new_user, res) => {
    const Token = jwt.sign({new_user}, process.env.jwt_secrete_key, {
        expiresIn: "10d"
    })
    res.cookie("jwt", Token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    })
    await User.findByIdAndUpdate(new_user, { token: Token });
    return Token;
}
