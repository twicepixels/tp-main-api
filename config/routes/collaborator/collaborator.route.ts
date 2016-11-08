import { Router } from 'express';
var authenticatedPolicy = require("../../policies/authenticated");
import { CollaboratorController } from "../../../app/controllers/collaborator/collaborator.controller";

export const COLLABORATOR_MAIN_ROUTER: Router = Router();
// define routes
//create
COLLABORATOR_MAIN_ROUTER.post('/', CollaboratorController.create);
//getById
COLLABORATOR_MAIN_ROUTER.get('/:id', authenticatedPolicy, CollaboratorController.getById);
//getAll
COLLABORATOR_MAIN_ROUTER.post('/getAll', CollaboratorController.getAll);
//update
COLLABORATOR_MAIN_ROUTER.put('/:id', authenticatedPolicy, CollaboratorController.updateById);

//delete
COLLABORATOR_MAIN_ROUTER.delete('/:id', authenticatedPolicy, CollaboratorController.deleteById);

