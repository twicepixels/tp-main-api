import { Service } from "../../base/base.service";

export class UserService extends Service {

  public create(data: any): Promise<any> {
    return this.Models.User.create(data);
  }

  public updateById(id: number, data: any): Promise<any> {
    return this.Models.User.update(data, {where: {"id": id}});
  }

  public getAll(criteria: any): Promise<any> {
    return this.Models.User.findAll({where: criteria});
  }

  public getById(id: number): Promise<any> {
    return this.Models.User.find({where: {"id": id}});
  }

  public deleteById(id: number): Promise<any> {
    return this.Models.User.destroy({where: {"id": id}});
  }
}
