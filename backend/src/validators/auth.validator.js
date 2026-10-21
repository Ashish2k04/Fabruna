import {body, validationResult} from 'express-validator';

const authValidator = (req,res,next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({
        message: 'Validation failed',
        success: false,
        errors: errors.array()
    });
}

export const registerValidator = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('contact').isMobilePhone().withMessage('Invalid contact number').matches(/^\d{10}$/).withMessage('Contact number must be 10 digits long'),
    body('fullName').notEmpty().withMessage('Full name is required').isLength({min: 3}).withMessage('Full name must be at least 3 characters long'),
    authValidator
]