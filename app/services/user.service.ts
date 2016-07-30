import {Service} from "../../base/base.service";

export class UserService extends Service {


  public static create(data:any, next:any) {
    this.Models.User.create(
      data
    ).then(function (user:any) {
      // was created successfully!
      next(null, user);
    }, function (error:any) {
      // error handling
      next(error, null);
    });
  }

  public static updateById(id:number, data:any, next:any) {
    this.Models.User.update(
      data,
      {where: {"id": id}}
    ).then(function (user:any) {
      // was created successfully!
      next(null, user);
    }, function (error:any) {
      // error handling
      next(error, null);
    });
  }


  public static getAll(criteria:any, next:any) {
    this.Models.User.findAll({
      where: criteria
    }).then(function (user:any) {
      // was found successfully!
      next(null, user);
    }, function (error:any) {
      // error handling
      next(error, null);
    });
  }

  public static getById(id:number, next:any) {
    this.Models.User.find({
      where: {"id": id}
    }).then(function (user:any) {
      // was found successfully!
      next(null, user);
    }, function (error:any) {
      // error handling
      next(error, null);
    });
  }

  public static deleteById(id:number, next:any) {
    this.Models.User.delete({
      where: {"id": id}
    }).then(function (user:any) {
      // was found successfully!
      next(null, user);
    }, function (error:any) {
      // error handling
      next(error, null);
    });
  }
}
