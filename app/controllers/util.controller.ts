import { Request, Response } from 'express';
import { UtilService } from "../services/util.service";

let c = require("../../base/base.controller");
let utilService: UtilService = new UtilService();

export class UtilController {
  public static getCatalog(req: Request, res: Response): void {
    c.handleService(res, utilService.getCatalog(req.body));
  }
}
