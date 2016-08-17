import { Router } from 'express';
var authenticatedPolicy = require("../../policies/authenticated");
import { CardController } from "../../../app/controllers/billing/card.controller";

export const BILLING_CARD_ROUTER: Router = Router();
// define routes
//create
BILLING_CARD_ROUTER.post('/', authenticatedPolicy, CardController.create);
BILLING_CARD_ROUTER.get('/', authenticatedPolicy, CardController.getByCustomer);
