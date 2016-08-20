/**
 * Created by Juanjo on 19/08/2016.
 */

import { BillingService } from "./billing.service";

export class PlanService extends BillingService {

  /* public addCustomer(description: string, source: string): Promise<any> {
   let _service = this;
   return new Promise((resolve: any, reject: any)=> {
   // _service.getBillingId(accountId, tokenId).then(
   //   (billingId: string)=> {
   _service.billingAPI.customers.create({description: description, source: source}).then(
   (result: any)=>resolve(result),
   (error: any)=>reject(error)
   );
   //   }, (error: any)=>reject(error)
   // );
   });
   }*/

  public getPlans(): Promise<any> {
    let _service = this;
    return new Promise((resolve: any, reject: any)=> {
      //_service.getBillingId(accountId).then(
      //(billingId: string)=> {
      _service.billingAPI.plans.list().then(
        (result: any)=>resolve(result),
        (error: any)=>reject(error)
      );
      //}, (error: any)=>reject(error)
      //);
    });
  }
}
