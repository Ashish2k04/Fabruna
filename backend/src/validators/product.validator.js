import {body, validationResult} from "express-validator";

const productValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()){
        return next()
    }

       return res.status(400).json({
        message: 'Validation failed',
        success: false,
        errors: errors.array()
    });
}

export const loginValidator = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    authValidator
]