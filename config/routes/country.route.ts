import { Router } from 'express';
import { CountryController } from "../../app/controllers/country.controller";
var authenticatedPolicy = require("../policies/authenticated");

export const COUNTRY_ROUTER: Router = Router();
// define routes
//update
COUNTRY_ROUTER.post('/', CountryController.create);
//getById
COUNTRY_ROUTER.get('/:id', authenticatedPolicy, CountryController.getById);
//getAll
COUNTRY_ROUTER.post('/getAll', authenticatedPolicy, CountryController.getAll);
//update
COUNTRY_ROUTER.put('/:id', authenticatedPolicy, CountryController.updateById);
//delete
COUNTRY_ROUTER.delete('/:id', authenticatedPolicy, CountryController.deleteById);
