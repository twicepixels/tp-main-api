/**
 * Created by Juanjo on 17/08/2016.
 */

// import { Request, Response } from "express";
import { BillingService } from "./billing.service";

export class CustomerService extends BillingService {

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

  public getCustomers(): Promise<any> {
    let _service = this;
    return new Promise((resolve: any, reject: any)=> {
      //_service.getBillingId(accountId).then(
        //(billingId: string)=> {
          _service.billingAPI.customers.list().then(
            (result: any)=>resolve(result),
            (error: any)=>reject(error)
          );
        //}, (error: any)=>reject(error)
      //);
    });
  }
}
