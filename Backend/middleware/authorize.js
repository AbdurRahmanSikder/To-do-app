import jwt from "jsonwebtoken";
export const authorization = async (req, res, next) => {
    const token = req.cookies.token;
    try {

        if (!token) {
            return res.json({success: true , message: error.message});
        }
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRETE);
        
        req.user = {id:tokenDecode.id};

    }
    catch (error) {
        console.log(error);
    }
    next();
}
