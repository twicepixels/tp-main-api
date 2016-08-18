/**
 * Created by Juanjo on 17/08/2016.
 */

import { Request, Response } from 'express';
import { CustomerService } from "../../services/billing/customer.service";

let c = require("../../../base/base.controller");

export class CustomerController {

  public static create(req: Request, res: Response) {
    let _service = new CustomerService(req, res);
    let description: string = req.body["description"];
    let source: string = req.body["source"];
    c.handleService(res, _service.addCustomer(description, source));
  }

  public static getCustomers(req: Request, res: Response) {
    let _service = new CustomerService(req, res);
    c.handleService(res, _service.getCustomers());
  }
}
