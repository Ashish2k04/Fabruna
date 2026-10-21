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
    body('name').isLength({min: 2, max: 100}).withMessage('Name must be between 2 and 100 characters long'),
    authValidator
]