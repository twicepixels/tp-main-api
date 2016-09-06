/**
 * Created by Juanjo on 19/08/2016.
 */

import {BillingService} from "./billing.service";
import {UtilService} from "../util.service";

export class PlanService extends BillingService {


  public addPlan(amount:number, interval:string, name:string, currency:string, id:string):Promise<any> {

    //amount: 5000, interval: "month", name: "Emerald essentials", currency: "usd", id: "emerald-essentials"

    let _service = this;
    return new Promise((resolve:any, reject:any)=> {
      // _service.getBillingId(accountId, tokenId).then(
      //   (billingId: string)=> {
      _service.billingAPI.plans.create({
        amount: amount,
        interval: interval,
        name: name,
        currency: currency,
        id: id
      }).then(
        (result:any)=>resolve(result),
        (error:any)=>reject(error)
      );
      //   }, (error: any)=>reject(error)
      // );
    });
  }




  public create(data: any): Promise<any> {
    let _service = this;
    return new Promise((resolve: any, reject: any)=> {
      //obtiene la descripcion del intervalo, se necesita para enviarla a stripe
      _service.Models.Catalog.find({where: {catalogId: data.intervalId }}).then((dataCat: any) => {
        let interval = dataCat.description ;

        //guarda en base de datos
        _service.Models.Package.create(data).then(
          (customerPackage: any)=> {
            //guarda en stripe
            _service.billingAPI.plans.create({
              amount: customerPackage.amount ,
              interval: interval ,
              name: customerPackage.name ,
              currency: customerPackage.currency ,
              id: customerPackage.name,
              interval_count: customerPackage.interval_count

            }).then(
              (result:any)=>resolve(result),
              (error: any)=> {
                //_service.deleteById(customerPackage.id);
                this.deleteById(customerPackage.id);
                reject(error);
              }
            );
          },
          (error: any)=>reject(error)
        );

      }, (reason: string) => {
        console.log(reason);
      },
        (error: any)=>reject(error));
    });
  }




  public getPlans():Promise<any> {
    let _service = this;
    return new Promise((resolve:any, reject:any)=> {
      //_service.getBillingId(accountId).then(
      //(billingId: string)=> {
      _service.billingAPI.plans.list().then(
        (result:any)=>resolve(result),
        (error:any)=>reject(error)
      );
      //}, (error: any)=>reject(error)
      //);
    });
  }

  public deleteById(id: number): Promise<any> {
    return this.Models.Package.destroy({where: {"id": id}});
  }
}
