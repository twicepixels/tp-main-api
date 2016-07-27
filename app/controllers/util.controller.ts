import { Request, Response } from 'express';
import { UtilService } from "../services/util.service";

export class UtilController {
  public static getCatalog(req: Request, res: Response) {
    UtilService.getCatalog(req.body, function (err: any, result: any) {
      if (err) {
        res.status(500).send({
          message: err.message
        });
      } else {
        res.json(result);
      }
    });
  }
}
