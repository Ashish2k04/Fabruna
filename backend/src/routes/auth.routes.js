import {Router} from 'express';
import {register, login} from '../controllers/auth.controller.js';
import {registerValidator, loginValidator} from '../validators/auth.validator.js';
import {authenticateToken} from '../middlewares/auth.middleware.js';
import passport from 'passport';

const authRouter = Router();

authRouter.post('/register', registerValidator, register);

authRouter.post('/login', loginValidator, login);

authRouter.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

authRouter.get('/auth/google/callback', passport.authenticate('google', {session: false}), 

);

export default authRouter;