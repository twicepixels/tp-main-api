/**
 * Created by Juanjo on 19/08/2016.
 */

import { Router } from 'express';
var authenticatedPolicy = require("../../policies/authenticated");
import { PlanController } from "../../../app/controllers/billing/plan.controller";

export const BILLING_PLAN_ROUTER: Router = Router();
// define routes
//create
BILLING_PLAN_ROUTER.post('/', authenticatedPolicy, PlanController.create);
//get all
BILLING_PLAN_ROUTER.get('/', authenticatedPolicy, PlanController.getPlans);
//update
BILLING_PLAN_ROUTER.put('/:id', authenticatedPolicy, PlanController.update);
//delete
BILLING_PLAN_ROUTER.delete('/:id', authenticatedPolicy, PlanController.delete);

