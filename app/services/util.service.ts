import { Service } from "../../base/base.service";

export class UtilService extends Service {

  public getCatalog(criteria: any): Promise<any> {
    return this.Models.Catalog.findAll({where: criteria});
  }
}
