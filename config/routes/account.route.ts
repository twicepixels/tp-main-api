import { Router } from 'express';
import { AccountController } from "../../app/controllers/account.controller";

export const ACCOUNT_ROUTER: Router = Router();
// define routes
//update
ACCOUNT_ROUTER.post('/', AccountController.create);
//getById
ACCOUNT_ROUTER.get('/:id', AccountController.getById);
//getAll
ACCOUNT_ROUTER.post('/getAll', AccountController.getAll);
//update
ACCOUNT_ROUTER.put('/:id', AccountController.updateById);
//delete
ACCOUNT_ROUTER.delete('/:id', AccountController.deleteById);
