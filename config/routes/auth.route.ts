import { Router } from 'express';
import { AuthController } from '../../app/controllers/auth.controller';
export const AUTH_ROUTER: Router = Router();
// define routes
AUTH_ROUTER.post('/login', AuthController.login);
AUTH_ROUTER.post('/logout', AuthController.logout);