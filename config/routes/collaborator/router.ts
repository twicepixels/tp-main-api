import { Router } from "express";
import { COLLABORATOR_MAIN_ROUTER } from "./collaborator.route";
import { IMAGE_ROUTER } from "./image.route";

let router: Router = Router();
router.use("/", COLLABORATOR_MAIN_ROUTER);
router.use("/image", IMAGE_ROUTER);

export const COLLABORATOR_ROUTER: Router = router;
