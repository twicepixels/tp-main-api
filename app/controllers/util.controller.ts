import { Request, Response } from 'express';
import { UtilService } from "../services/util.service";

let c = require("../../base/base.controller");

export class UtilController {
  public static getCatalog(req: Request, res: Response): void {
    let _service = new UtilService(req, res);
    c.handleService(res, _service.getCatalog(req.body));
  }

  public static getCountries(req: Request, res: Response): void {
    let _service = new UtilService(req, res);
    c.handleService(res, _service.getCountries(req.body));
  }
}
