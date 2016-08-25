/**
 * Created by Juanjo on 19/08/2016.
 */

import {Request, Response} from 'express';
import {PlanService} from "../../services/billing/plan.service";

let c = require("../../../base/base.controller");

export class PlanController {

  //amount: 5000, interval: "month", name: "Emerald essentials", currency: "usd", id: "emerald-essentials"

  public static create(req:Request, res:Response) {
    let _service = new PlanService(req, res);
    let amount:number = req.body["amount"];
    let interval:string = req.body["interval"];
    let name:string = req.body["name"];
    let currency:string = req.body["currency"];
    let id:string = req.body["id"];

    c.handleService(res, _service.addPlan(amount, interval, name, currency, id));
  }

  public static getPlans(req:Request, res:Response) {
    let _service = new PlanService(req, res);
    c.handleService(res, _service.getPlans());
  }
}
