import { Router } from 'express';
import { UserController } from "../../app/controllers/user.controller";


export const USER_ROUTER: Router = Router();
// define routes
USER_ROUTER.get('/', UserController.getAll);
USER_ROUTER.post('/user', UserController.get);
USER_ROUTER.put('/create', UserController.create);
