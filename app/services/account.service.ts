import {Service} from "../../base/base.service";
var sequelize = require("sequelize");
var Promise = require('promise');

export class AccountService extends Service {


  public static create(data:any, next:any) {

    let model:any = this.Models;
    this.Models.Account.max('id')   /// get the max of the accounts registers from account table
     .then(function (accountMax:any) {
       let account:any = {"id":accountMax};
       data.id = account.id + 1;    /// sum one to get the next account number
       model.Account.create( data
       ).then(function (account:any) {  ///get account register saved into account table

         data.accountId = account.id;
         model.User.create( data        ///create user, using email, accountId, userId and password fields
         ).then(function (user:any) {
           next(null, user);
         }, function (error:any) {
           next(error, null);
         });

         return account;
       }, function (error:any) {
         next(error, null);
       });
    }, function (error:any) {
      next(error, null);
    });

  }


  public static updateById(id:number, data:any, next:any) {
    this.Models.Account.update(
      data,
      {where: {"id": id}}
    ).then(function (account:any) {
      // was created successfully!
      next(null, account);
    }, function (error:any) {
      // error handling
      next(error, null);
    });
  }


  public static getMaxAccountId(data:any, next:any):any{
      this.Models.Account.max('id')   /// get the max of the accounts registers from account table
        .then(function (accountMax:any) {
          let account:any = {"id":accountMax};
          account.id = account.id + 1;    /// sum one to get the next account number
          next(null, account);
        }, function (error:any) {
          next(error, null);
        });
  }

  public static getAll(criteria:any, next:any) {
   this.Models.Account.findAll({
      where: criteria
    }).then(function (account:any) {
      // was found successfully!
      next(null, account);
    }, function (error:any) {
      // error handling
      next(error, null);
    });
  }

  public static getById(id:number, next:any) {
    console.log(id);
    this.Models.Account.find({
      where: {"id": id}
    }).then(function (account:any) {
      // was found successfully!
      next(null, account);
    }, function (error:any) {
      // error handling
      next(error, null);
    });
  }

  public static deleteById(id:number, next:any) {
    this.Models.Account.destroy({
      where: {"id": id}
    }).then(function (account:any) {
      // was found successfully!
      next(null, account);
    }, function (error:any) {
      // error handling
      next(error, null);
    });
  }
}
