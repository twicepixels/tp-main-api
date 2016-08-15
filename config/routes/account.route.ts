import { Router } from 'express';
import { AccountController } from "../../app/controllers/account.controller";
var authenticatedPolicy = require("../policies/authenticated");

export const ACCOUNT_ROUTER: Router = Router();
// define routes
//update
ACCOUNT_ROUTER.post('/', AccountController.create);
//getById
ACCOUNT_ROUTER.get('/:id', authenticatedPolicy, AccountController.getById);
//getAll
ACCOUNT_ROUTER.post('/getAll', authenticatedPolicy, AccountController.getAll);
//update
ACCOUNT_ROUTER.put('/:id', authenticatedPolicy, AccountController.updateById);
//delete
ACCOUNT_ROUTER.delete('/:id', authenticatedPolicy, AccountController.deleteById);
//add user
ACCOUNT_ROUTER.post('/:id/users', authenticatedPolicy, AccountController.addAccountUser);
