import {Request, Response} from 'express';
import {AccountService} from "../services/account.service";

export class AccountController {

  public static create(req:Request, res:Response) {
    AccountService.create(req.body, function (err:any, result:any) {
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
    AccountService.updateById(id, req.body, function (err:any, result:any) {
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
    AccountService.getAll(req.body, function (err:any, result:any) {
      if (err) {
        res.status(500).send({
          message: err.message
        });
      } else {
        res.send(result);
      }
    });
  }


  public static getMaxAccountId(req:Request, res:Response) {
    AccountService.getMaxAccountId(req.body, function (err:any, result:any) {
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
    AccountService.getById(id, function (err:any, result:any) {
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
    AccountService.deleteById(id, function (err:any, result:any) {
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
