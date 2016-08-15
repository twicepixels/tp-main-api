import { Request, Response } from "express";
import { Service } from "../../base/base.service";
//import { UserService } from "../services/user.service";

export class CountryService extends Service {
  
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  public create(data: any): Promise<any> {
     return null;
  }

  public updateById(id: number, data: any): Promise<any> {
    return this.Models.Country.update(data, {where: {"id": id}});
  }

  public getAll(criteria: any): Promise<any> {
    return this.Models.Country.findAll({where: criteria});
  }

  public getById(id: number): Promise<any> {
    return this.Models.Country.find({where: {"id": id}});
  }

  public deleteById(id: number): Promise<any> {
    return this.Models.Country.destroy({where: {"id": id}});
  }
  
}

