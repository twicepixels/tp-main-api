import { Request, Response } from 'express';
import { AccountService } from "../services/account.service";

let c = require("../../base/base.controller");
let accountService: AccountService = new AccountService();

export class AccountController {

  public static create(req: Request, res: Response) {
    c.handleService(res, accountService.create(req.body));
  }

  public static updateById(req: Request, res: Response) {
    let id = parseInt(req.params["id"]);
    c.handleService(res, accountService.updateById(id, req.body));
  }

  public static getAll(req: Request, res: Response) {
    c.handleService(res, accountService.getAll(req.body));
  }

  public static getById(req: Request, res: Response) {
    let id = parseInt(req.params["id"]);
    c.handleService(res, accountService.getById(id));
  }

  public static deleteById(req: Request, res: Response) {
    let id = parseInt(req.params["id"]);
    c.handleService(res, accountService.deleteById(id));
  }

  public static addAccountUser(req: Request, res: Response) {
    let id = parseInt(req.params["id"]);
    c.handleService(res, accountService.addAccountUser(id, req.body));
  }
}
