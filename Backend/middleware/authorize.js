import jwt from "jsonwebtoken";
export const authorization = async (req, res, next) => {
    const token = req.cookies.token;
    try {

        if (!token) {
            return res.json({success: true , message: error.message});
        }
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = {id:tokenDecode.id};
        next();

    }
    catch (error) {
        console.log(error);
    }
}
