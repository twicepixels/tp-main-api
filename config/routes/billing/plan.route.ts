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
BILLING_PLAN_ROUTER.get('/', authenticatedPolicy, PlanController.getPlans);

