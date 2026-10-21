import userModel from '../models/user.model.js';

async function register(req, res) {
    const {email, password, contact, fullName} = req.body;

    const existingUser = await userModel.findOne({email});

    if (existingUser) {
        return res.status(400).json({
            message: 'User with this email already exists',
            success: false
        });
    }

    

    res.status(200).json({
        message: 'User registered successfully',
        success: true,
        data: req.body
    })
}

export {register};   