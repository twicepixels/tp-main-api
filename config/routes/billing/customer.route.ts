/**
 * Created by Juanjo on 17/08/2016.
 */

import { Router } from 'express';
var authenticatedPolicy = require("../../policies/authenticated");
import { CustomerController } from "../../../app/controllers/billing/customer.controller";

export const BILLING_CUSTOMER_ROUTER: Router = Router();
// define routes
//create
BILLING_CUSTOMER_ROUTER.post('/', authenticatedPolicy, CustomerController.create);
BILLING_CUSTOMER_ROUTER.get('/', authenticatedPolicy, CustomerController.getCustomers);
