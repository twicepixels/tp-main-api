import { Router } from 'express';
import { UtilController } from "../../app/controllers/util.controller";

export const UTIL_ROUTER: Router = Router();
// define routes
UTIL_ROUTER.post('/catalog', UtilController.getCatalog);
