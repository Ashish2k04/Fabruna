import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js"

export const authenticateToken  = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Access denied. No token provided.",
            success: false
        });
    }

    try{
        const decode = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decode.id);

        if(!user){
            return res.status(404).json({
                message: "User not found.",
                success: false
            })
        }

        if(user.role !== "seller"){
            return res.status(403).json({
                message: "Forbidden.",
                success: false
            })
        }

        req.user = decode

        next()
    }
    catch(error){
        error.status = 401;
        next(error);
    }
}