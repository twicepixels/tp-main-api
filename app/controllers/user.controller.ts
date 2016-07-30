import {Request, Response} from 'express';
import {UserService} from "../services/user.service";

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
    UserService.getAll(null, function (err:any, result:any) {
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



}
