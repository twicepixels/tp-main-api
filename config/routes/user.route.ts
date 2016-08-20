import { Router } from 'express';
import { UserController } from "../../app/controllers/user.controller";
var authenticatedPolicy = require("../policies/authenticated");


export const USER_ROUTER: Router = Router();
// define routes
//update
USER_ROUTER.post('/', UserController.create);
//getCurrent
USER_ROUTER.get('/me', authenticatedPolicy, UserController.getCurrent);
//getById
USER_ROUTER.get('/:id', authenticatedPolicy, UserController.getById);
//getAll
USER_ROUTER.post('/getAll', UserController.getAll);
//getByEmail
USER_ROUTER.get('/getByEmail/:email', UserController.getByEmail);
//update
USER_ROUTER.put('/:id', authenticatedPolicy, UserController.updateById);
//delete
USER_ROUTER.delete('/:id', authenticatedPolicy, UserController.deleteById);
//getUsersByAccount
USER_ROUTER.get('/getUsersByAccount/:idAccount', authenticatedPolicy, UserController.getUsersByAccount);
//changePassword
USER_ROUTER.post('/changePassword', UserController.changePassword);

