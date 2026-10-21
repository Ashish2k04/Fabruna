import userModel from '../models/user.model.js';

async function register(req, res) {
    const {email, password, contact, fullName} = req.body;

    try{
    const existingUser = await userModel.findOne({
        $or: [
            {email},
            {contact}
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
        fullName
    });

    res.status(200).json({
        message: 'User registered successfully',
        success: true,
        
    })
   }
   catch (error) {
    res.status(500).json({
        message: 'Internal server error',
        success: false,
        error: error.message
    })
   }
}

export {register};   