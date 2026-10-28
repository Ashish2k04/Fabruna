import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const authenticateToken  = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({message: "Access denied. No token provided."});
    }

    try{
        const decode = jwt.verify(token, config.JWT_SECRET);

        req.user = decode

        next()
    }
    catch(error){
        error.status = 401;
        next(error);
    }
}