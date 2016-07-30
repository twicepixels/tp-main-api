import {Router} from 'express';
import {UserController} from "../../app/controllers/user.controller";


export const USER_ROUTER:Router = Router();
// define routes
//update
USER_ROUTER.post('/', UserController.create);
//getById
USER_ROUTER.get('/:id', UserController.getById);
//getAll
USER_ROUTER.post('/getAll', UserController.getAll);
//update
USER_ROUTER.put('/:id', UserController.updateById);
//delete
USER_ROUTER.delete('/:id', UserController.deleteById);
