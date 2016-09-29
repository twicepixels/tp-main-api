import { Router } from "express";
import { BILLING_PLAN_ROUTER } from "./plan.route";
import { BILLING_CARD_ROUTER } from "./card.route";
import { BILLING_CUSTOMER_ROUTER } from "./customer.route";

let router: Router = Router();
router.use("/cards", BILLING_CARD_ROUTER);
router.use("/plans", BILLING_PLAN_ROUTER);
router.use("/customers", BILLING_CUSTOMER_ROUTER);

export const BILLING_ROUTER: Router = router;
