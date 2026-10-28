import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

async function sendTokenResponse(user, res, message) {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token)

    res.status(200).json({
        message: message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullName: user.fullName
        }
    })
}


async function register(req, res, next) {
    const { email, password, contact, fullName, isSeller } = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'User with this email already exists',
                success: false
            });
        }

        const newUser = await userModel.create({
            email,
            password,
            contact,
            fullName,
            role: isSeller ? 'seller' : 'buyer'
        });

        await sendTokenResponse(newUser, res, 'User registered successfully');
    }
    catch (error) {
        error.status = 400;
        next(error)
    }
}

async function login(req, res, next) {
      const {email, password} = req.body;

      try{
         const user = await userModel.findOne({email});

         if(!user){
            return res.status(404).json({
                message: "User not found with this email.",
                success: false
            })
         }

         const passwordValidation = await userModel.comparePassword(password);

         if(!passwordValidation){
            return res.status(400).json({
                message: "Invalid credentials.",
                success: false
            })
         }

         return res.status(200).json({
            message: "User logged in successfully.",
            success: true,
            user: {
                id: user._id,
                email: user.email,
                contact: user.contact,
                fullName: user.fullName
            }   
         })
      }
      catch(error){
        error.status = 400;
        next(error)
      }
}

export { register, login };   