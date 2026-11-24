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

export const CreateProductValidator = [
    body('title').notEmpty().withMessage('Title is required').isLength({min: 3}).withMessage('Title must be at least 3 characters long'),
    body('description').notEmpty().withMessage('Description is required').isLength({min: 10}).withMessage('Description must be at least 10 characters long'),
]