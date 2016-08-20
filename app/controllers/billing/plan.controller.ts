/**
 * Created by Juanjo on 19/08/2016.
 */

import { Request, Response } from 'express';
import { PlanService } from "../../services/billing/plan.service";

let c = require("../../../base/base.controller");

export class PlanController {

  /* public static create(req: Request, res: Response) {
   let _service = new CustomerService(req, res);
   let description: string = req.body["description"];
   let source: string = req.body["source"];
   c.handleService(res, _service.addCustomer(description, source));
   }*/

  public static getPlans(req: Request, res: Response) {
    let _service = new PlanService(req, res);
    c.handleService(res, _service.getPlans());
  }
}
