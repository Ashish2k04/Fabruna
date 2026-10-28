import {Router} from 'express';
import {register} from '../controllers/auth.controller.js';
import {registerValidator, loginValidator} from '../validators/auth.validator.js';
import {authenticateToken} from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', registerValidator, register);

authRouter.post('/login', authenticateToken, login);

export default authRouter;