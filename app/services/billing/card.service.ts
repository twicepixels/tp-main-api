// import { Request, Response } from "express";
import { BillingService } from "./billing.service";

export class CardService extends BillingService {
  
  public addCard(accountId: number, tokenId: string): Promise<any> {
    let _service = this;
    return new Promise((resolve: any, reject: any)=> {
      _service.getBillingId(accountId, tokenId).then(
        (billingId: string)=> {
          _service.billingAPI.customers.createSource
          (billingId, {source: tokenId}).then(
            (result: any)=>resolve(result),
            (error: any)=>reject(error)
          );
        }, (error: any)=>reject(error)
      );
    });
  }

  public getCustomerCards(accountId?: number): Promise<any> {
    let _service = this;
    return new Promise((resolve: any, reject: any)=> {
      _service.getBillingId(accountId).then(
        (billingId: string)=> {
          _service.billingAPI.customers.listCards(billingId).then(
            (result: any)=>resolve(result),
            (error: any)=>reject(error)
          );
        }, (error: any)=>reject(error)
      );
    });
  }
}
