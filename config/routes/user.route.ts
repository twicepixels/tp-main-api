import { Router } from 'express';
import { UserController } from "../../app/controllers/user.controller";


export const USER_ROUTER: Router = Router();
// define routes
USER_ROUTER.get('/', UserController.getAll);
//TODO: ESTO ES UNA PRUEBA
USER_ROUTER.post('/', UserController.getAll);

USER_ROUTER.get('/get', UserController.get);

USER_ROUTER.delete('/delete', UserController.delete);
