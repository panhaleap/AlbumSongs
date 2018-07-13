import { Router } from 'express';
import { postSignIn, postSignUp } from './auth.api';

const authRoute = Router();

authRoute.post('/sign-in', postSignIn);
authRoute.post('/sign-up', postSignUp);
// authRoute.get('/sign-out', getSingOut);

export default authRoute;



