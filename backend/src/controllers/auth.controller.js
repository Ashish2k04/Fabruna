import userModel from '../models/user.model.js';

async function register(req, res) {
    res.status(200).json({
        message: 'User registered successfully',
        success: true,
        data: req.body
    })
}

export {register};   