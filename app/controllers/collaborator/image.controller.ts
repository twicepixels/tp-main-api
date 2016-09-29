import { Request, Response } from 'express';
import { ImageService } from "../../services/collaborator/image.service";

let c = require("../../../base/base.controller");

export class ImageController {

  public static uploadFiles(req: Request, res: Response) {
    let _service = new ImageService(req, res);
    c.handleService(res, _service.uploadFiles());
  }
  
}
