import {Request, Response} from 'express';
import {UserService} from "../services/user.service";
import {GenericDao} from "../util/GenericDao";
import {Map} from "../framework/Map";

export class UserController {

  public static create(req:Request, res:Response) {
    UserService.create(req.body, function (err:any, result:any) {
      if (err) {
        res.status(500).send({
          message: err.message
        });
      } else {
        res.send(result);
      }
    });
  }

  public static updateById(req:Request, res:Response) {
    let id = parseInt(req.param("id"));
    UserService.updateById(id, req.body, function (err:any, result:any) {
      if (err) {
        res.status(500).send({
          message: err.message
        });
      } else {
        res.send(result);
      }
    });
  }

  public static getAll(req:Request, res:Response) {
    UserService.getAll(req.body, function (err:any, result:any) {
      if (err) {
        res.status(500).send({
          message: err.message
        });
      } else {
        res.send(result);
      }
    });
  }

  public static getById(req:Request, res:Response) {
    let id = parseInt(req.param("id"));
    UserService.getById(id, function (err:any, result:any) {
      if (err) {
        res.status(500).send({
          message: err.message
        });
      } else {
        res.send(result);
      }
    });
  }

  public static deleteById(req:Request, res:Response) {
    let id = parseInt(req.param("id"));
    UserService.deleteById(id, function (err:any, result:any) {
      if (err) {
        res.status(500).send({
          message: err.message
        });
      } else {
        res.send(result);
      }
    });
  }

  public static getUsersByAccount(req:Request, res:Response){
    let accountId = parseInt(req.param("accountId"));
    var data:Map = new Map();
    data.insert("accountId", accountId);
    let dao:GenericDao = new GenericDao("dals/TpUserDal.xml", "tp.user");
   return dao.getList(data,"getUsersByAccount");
  }
}
