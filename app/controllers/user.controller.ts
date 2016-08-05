import { Request, Response } from 'express';
import { Map } from "../../base/framework/Map";
import { GenericDao } from "../../base/dao/GenericDao";
import { UserService } from "../services/user.service";

let c = require("../../base/base.controller");
let userService: UserService = new UserService();
let userDao: GenericDao = new GenericDao("TpUserDal", "tp.user");

export class UserController {

  public static create(req: Request, res: Response): void {
    c.handleService(res, userService.create(req.body));
  }

  public static updateById(req: Request, res: Response): void {
    let id = parseInt(req.params["id"]);
    c.handleService(res, userService.updateById(id, req.body));
  }

  public static getAll(req: Request, res: Response): void {
    c.handleService(res, userService.getAll(req.body));
  }

  public static getById(req: Request, res: Response): void {
    let id = parseInt(req.params["id"]);
    c.handleService(res, userService.getById(id));
  }

  public static deleteById(req: Request, res: Response): void {
    let id = parseInt(req.params["id"]);
    c.handleService(res, userService.deleteById(id));
  }

  public static getUsersByAccount(req: Request, res: Response): void {
    let accountId = parseInt(req.params["idAccount"]);
    let data: Map = new Map();
    data.insert("ACCOUNTID", accountId);
    c.handleService(res, userDao.getList("getUsersByAccount", data));
  }
}
