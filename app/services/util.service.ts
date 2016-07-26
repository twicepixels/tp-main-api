import { Service } from "../../base/base.service";

export class UtilService extends Service {
  public static getCatalog(criteria: any, next: any) {
    this.Models.Catalog.findAll({
      where: criteria
    }).then(function (user: any) {
      // was found successfully!
      next(null, user);
    }, function (error: any) {
      // error handling
      next(error, null);
    });
  }
}
