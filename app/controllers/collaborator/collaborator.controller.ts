/**
 * Created by Juanjo on 20/09/2016.
 */
import { Request, Response } from 'express';
import { CollaboratorService } from "../../services/collaborator/collaborator.service";


let c = require("../../../base/base.controller");

export class CollaboratorController {

  public static create(req: Request, res: Response): void {
    let _service = new CollaboratorService(req, res);
    c.handleService(res, _service.create(req.body));
  }

  public static updateById(req: Request, res: Response): void {
    let id = parseInt(req.params["id"]);
    let _service = new CollaboratorService(req, res);
    c.handleService(res, _service.updateById(id, req.body));
  }

  public static getAll(req: Request, res: Response): void {
    let _service = new CollaboratorService(req, res);
    c.handleService(res, _service.getAll(req.body));
  }

  public static getById(req: Request, res: Response): void {
    let id = parseInt(req.params["id"]);
    let _service = new CollaboratorService(req, res);
    c.handleService(res, _service.getById(id));
  }

  public static deleteById(req: Request, res: Response): void {
    let id = parseInt(req.params["id"]);
    let _service = new CollaboratorService(req, res);
    c.handleService(res, _service.deleteById(id));
  }

  /*  public static getCurrent(req: Request, res: Response): void {
   c.handleService(res, new Promise((resolve: any)=> {
   resolve(req.user.toJSON());
   }));
   }*/


}
