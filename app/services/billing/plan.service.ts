/**
 * Created by Juanjo on 19/08/2016.
 */

import { BillingService } from "./billing.service";

export class PlanService extends BillingService {


  public addPlan(amount: number, interval: string, name: string, currency: string, id: string): Promise<any> {

    //amount: 5000, interval: "month", name: "Emerald essentials", currency: "usd", id: "emerald-essentials"

   let _service = this;
   return new Promise((resolve: any, reject: any)=> {
   // _service.getBillingId(accountId, tokenId).then(
   //   (billingId: string)=> {
   _service.billingAPI.plans.create({
       amount: amount,
       interval: interval,
       name: name,
       currency: currency,
       id: id
   }).then(
   (result: any)=>resolve(result),
   (error: any)=>reject(error)
   );
   //   }, (error: any)=>reject(error)
   // );
   });
   }

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
