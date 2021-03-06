import { Request, Response } from "express";
import { Service } from "../../base/base.service";
import { UserService } from "../services/user.service";

export class AccountService extends Service {

  private userService: UserService;

  constructor(req: Request, res: Response) {
    super(req, res);
    this.userService = new UserService(req, res);
  }

  public create(data: any): Promise<any> {
    let _service = this;
    return new Promise((resolve: any, reject: any)=> {
      _service.Models.Account.create(data).then(
        (account: any)=> {
          //get account register saved into account table
          data.accountId = account.id;
          // create user, using email, accountId,
          // userId and password fields
          _service.userService.create(data).then(
            (user: any)=> resolve(user),
            (error: any)=> {
              _service.deleteById(account.id);
              reject(error);
            }
          );
        },
        (error: any)=>reject(error)
      );
    });
  }

  public updateById(id: number, data: any): Promise<any> {
    return this.Models.Account.update(data, {where: {"id": id}});
  }

  public getAll(criteria: any): Promise<any> {
    return this.Models.Account.findAll({where: criteria});
  }

  public getById(id: number): Promise<any> {
    return this.Models.Account.find({where: {"id": id}});
  }

  public deleteById(id: number): Promise<any> {
    return this.Models.Account.destroy({where: {"id": id}});
  }

  //noinspection JSMethodCanBeStatic
  public addAccountUser(id: number, data: any): Promise<any> {
    data["accountId"] = id;
    return this.userService.create(data);
  }
}
