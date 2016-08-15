import { Service } from "../../../base/base.service";
import { Request, Response } from "express";
import { AccountService } from "../account.service";

let parameters = require('../../../config/parameters');
let stripe = require('stripe')(parameters.billingKey);

export class CardService extends Service {
  private accountService: AccountService;

  constructor(req: Request, res: Response) {
    super(req, res);
    this.accountService = new AccountService(req, res);
  }

  public addCard(tokenId: string): Promise<any> {
    let _service = this;
    return new Promise((resolve: any, reject: any)=> {
      _service.getBillingId(tokenId).then(
        (billingId: string)=> {
          stripe.customers.createSource(billingId, {
            source: tokenId
          }).then(
            (result: any)=>resolve(result),
            (error: any)=>reject(error)
          );
        }, (error: any)=>reject(error)
      );
    });
  }

  private getBillingId(tokenId: string): Promise<any> {
    let _service = this;
    let accountId = _service.user()["accountId"];
    return new Promise((resolve: any, reject: any)=> {
      _service.accountService.getById(accountId).then(
        (account: any)=> {
          let billingId: string = account["billingId"];
          if (billingId) {
            resolve(billingId);
          } else {
            _service.addCustomer(tokenId).then(
              (customer: any)=>resolve(customer["id"]),
              (error: any)=>reject(error)
            );
          }
        }, (error: any)=>reject(error)
      );
    });
  }

  private addCustomer(tokenId: string): Promise<any> {
    let _service = this;
    return new Promise((resolve: any, reject: any)=> {
      stripe.customers.create({
        source: tokenId,
        email: _service.user()["email"]
      }).then(
        (customer: any)=> {
          let accountId = _service.user()["accountId"];
          _service.accountService.updateById(accountId,
            {billingId: customer["id"]});
          resolve(customer);
        }, (error: any)=>reject(error)
      );
    });
  }
}
