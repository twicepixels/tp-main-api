import { Service } from "../../base/base.service";

export class UtilService extends Service {
  public static getCatalog(criteria: any, next: any) {
    this.Models.Catalog.findAll({where: criteria}).then(
      (result: any)=> {
        // was found successfully!
        next(null, result);
      },
      (error: any)=> {
        // error handling
        next(error, null);
      }
    );
  }
}
