import { Request, Response } from 'express';
import { AccountService } from "../services/account.service";

let c = require("../../base/base.controller");

export class AccountController {

  public static create(req: Request, res: Response) {
    let _service = new AccountService(req, res);
    c.handleService(res, _service.create(req.body));
  }

  public static updateById(req: Request, res: Response) {
    let id = parseInt(req.params["id"]);
    let _service = new AccountService(req, res);
    c.handleService(res, _service.updateById(id, req.body));
  }

  public static getAll(req: Request, res: Response) {
    let _service = new AccountService(req, res);
    c.handleService(res, _service.getAll(req.body));
  }

  public static getById(req: Request, res: Response) {
    let id = parseInt(req.params["id"]);
    let _service = new AccountService(req, res);
    c.handleService(res, _service.getById(id));
  }

  public static deleteById(req: Request, res: Response) {
    let id = parseInt(req.params["id"]);
    let _service = new AccountService(req, res);
    c.handleService(res, _service.deleteById(id));
  }

  public static addAccountUser(req: Request, res: Response) {
    let id = parseInt(req.params["id"]);
    let _service = new AccountService(req, res);
    c.handleService(res, _service.addAccountUser(id, req.body));
  }
}
