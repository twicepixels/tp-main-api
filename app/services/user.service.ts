import { Service } from "../../base/base.service";
import { CryptoService } from "../../base/crypto.service";

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

  public getByEmail(email: string): Promise<any> {
    return this.Models.User.find({where: {"email": email}});
  }

  public deleteById(id: number): Promise<any> {
    return this.Models.User.destroy({where: {"id": id}});
  }

  public changePassword(data: any, user?: any): Promise<any> {
    user = user || this.user();
    let oldPassword = data["oldPassword"];
    let newPassword = data["newPassword"];
    return new Promise((resolve: any, reject: any)=> {
      CryptoService.compare(oldPassword, user.password).then(
        (isEqual: boolean)=> {
          if (!isEqual) {
            reject({message: 'Invalid password'});
          } else if (oldPassword == newPassword) {
            reject({message: 'New password must be diferent'});
          } else {
            user.update({password: newPassword}).then(
              (result: any) => resolve(result),
              (error: any) => reject(error)
            ).catch((error: any)=>reject(error));
          }
        }, (error: any)=>reject(error)
      );
    });
  }
}
