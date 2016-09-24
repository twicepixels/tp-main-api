import { Request, Response } from 'express';
import { ImageService } from "../../services/collaborator/image.service";

let c = require("../../../base/base.controller");

export class ImageController {

  public static uploadFiles(req: Request, res: Response) { //the variables req and res are Request and Response types
    let _service = new ImageService(req, res);
    c.handleService(res, _service.uploadFiles(req));
  }

  public static create(req: Request, res: Response) {
    let _service = new ImageService(req, res);
    c.handleService(res, _service.create(req.body));
  }

}
