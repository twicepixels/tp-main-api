import { Router } from 'express';
import { ImageController } from "../../../app/controllers/collaborator/image.controller";

//var authenticatedPolicy = require("../policies/authenticated");


export const IMAGE_ROUTER: Router = Router();
// define routes
//update
IMAGE_ROUTER.post('/upload', ImageController.uploadFiles);
IMAGE_ROUTER.post('/create', ImageController.create);


