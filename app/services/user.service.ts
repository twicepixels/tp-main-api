import { Service } from "../../base/base.service";
import { CryptoService } from "../../base/crypto.service";
import {error} from "util";

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

  public changePassword(data:any, user:any): Promise<any> {
    //let userData = user;
    let _service = this;
    let oldPassword = data["oldpassword"];
    let newPassword = data["newpassword"];
    return new Promise((resolve: any, reject: any)=> {
      CryptoService.compare(oldPassword, user.password).then(
        (isEqual: boolean)=> {
          if (!isEqual) {
            reject({message: 'Invalid Password'});
          }else if(oldPassword == newPassword){
            reject({message: 'Must be diferent password'});
          } else {
            user.password = newPassword;
            _service.Models.User.update(user, {where: {"id": user.id}}).then(
              (result:any) => resolve(result),
              (error:any) => reject(error)
            ).catch((error: any)=>reject(error));
          }
        }, (error: any)=>reject(error)
      );
    });
  }
}
