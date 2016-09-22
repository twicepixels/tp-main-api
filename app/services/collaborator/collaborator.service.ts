/**
 * Created by Juanjo on 20/09/2016.
 */
import { Service } from "../../../base/base.service";


export class CollaboratorService extends Service {

  public create(data: any): Promise<any> {
    return this.Models.Collaborator.create(data);
  }

  public updateById(id: number, data: any): Promise<any> {
    return this.Models.Collaborator.update(data, {where: {"id": id}});
  }

  public getAll(criteria: any): Promise<any> {
    return this.Models.Collaborator.findAll({where: criteria});
  }

  public getById(id: number): Promise<any> {
    return this.Models.Collaborator.find({where: {"id": id}});
  }

  public deleteById(id: number): Promise<any> {
    return this.Models.Collaborator.destroy({where: {"id": id}});
  }

}
