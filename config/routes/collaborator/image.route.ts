import { Router } from 'express';
import { ImageController } from "../../../app/controllers/collaborator/image.controller";

export const IMAGE_ROUTER: Router = Router();
// define routes
//update
IMAGE_ROUTER.post('/upload', ImageController.uploadFiles);
