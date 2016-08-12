import { Request, Response } from 'express';
import { Map } from "../../base/framework/Map";
import { GenericDao } from "../../base/dao/GenericDao";
import { UserService } from "../services/user.service";

let c = require("../../base/base.controller");
let userDao: GenericDao = new GenericDao("TpUserDal", "tp.user");

export class UserController {

  public static create(req: Request, res: Response): void {
    let _service = new UserService(req, res);
    c.handleService(res, _service.create(req.body));
  }

  public static updateById(req: Request, res: Response): void {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    c.handleService(res, _service.updateById(id, req.body));
  }

  public static getAll(req: Request, res: Response): void {
    let _service = new UserService(req, res);
    c.handleService(res, _service.getAll(req.body));
  }

  public static getCurrent(req: Request, res: Response): void {
    c.handleService(res, new Promise((resolve: any)=> {
      resolve(req.user.toJSON());
    }));
  }

  public static getById(req: Request, res: Response): void {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    c.handleService(res, _service.getById(id));
  }

  public static deleteById(req: Request, res: Response): void {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    c.handleService(res, _service.deleteById(id));
  }

  public static getUsersByAccount(req: Request, res: Response): void {
    let accountId = parseInt(req.params["idAccount"]);
    let data: Map = new Map();
    data.insert("ACCOUNTID", accountId);
    c.handleService(res, userDao.getList("getUsersByAccount", data));
  }
}
