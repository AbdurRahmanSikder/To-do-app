import jwt from "jsonwebtoken";
import User from "../model/User.model.js";
export const authorization = async (req, res, next) => {
    const token = req.cookies.jwt;
    try {

        if (!token) {
            return res.status(401).json("Unauthorize");
        }
        const id = jwt.verify(token, process.env.jwt_secrete_key);
        
        req.user = await User.findById(id.new_user);

    }
    catch (error) {
        console.log(error);
    }
    next();
}
