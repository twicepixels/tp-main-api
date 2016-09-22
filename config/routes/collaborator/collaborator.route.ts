/**
 * Created by Juanjo on 20/09/2016.
 */
import { Router } from 'express';
var authenticatedPolicy = require("../../policies/authenticated");
import { CollaboratorController } from "../../../app/controllers/collaborator/collaborator.controller";

export const COLLABORATOR_ROUTER: Router = Router();
// define routes
//create
COLLABORATOR_ROUTER.post('/', CollaboratorController.create);
//getById
COLLABORATOR_ROUTER.get('/:id', authenticatedPolicy, CollaboratorController.getById);
//getAll
COLLABORATOR_ROUTER.post('/getAll', authenticatedPolicy, CollaboratorController.getAll);
//update
COLLABORATOR_ROUTER.put('/:id', authenticatedPolicy, CollaboratorController.updateById);
//delete
COLLABORATOR_ROUTER.delete('/:id', authenticatedPolicy, CollaboratorController.deleteById);

