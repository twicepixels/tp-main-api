import { Service } from "../../../base/base.service";
import { Request, Response } from "express";
import { AccountService } from "../account.service";

let parameters = require('../../../config/parameters');

export class BillingService extends Service {
  protected accountService: AccountService;
  protected billingAPI = require('stripe')(parameters.billingKey);

  constructor(req: Request, res: Response) {
    super(req, res);
    this.accountService = new AccountService(req, res);
  }

  protected getBillingId(accountId?: number, tokenId?: string): Promise<any> {
    let _service = this;
    return new Promise((resolve: any, reject: any)=> {
      _service.accountService.getById(accountId).then(
        (account: any)=> {
          let billingId: string = account["billingId"];
          if (billingId) {
            resolve(billingId);
          } else if (tokenId) {
            _service.billingAPI.customers.create({
              source: tokenId,
              email: account["email"]
            }).then((customer: any)=> {
                billingId = customer["id"];
                _service.accountService.updateById
                (accountId, {billingId: billingId});
                resolve(billingId);
              }, (error: any)=>reject(error)
            );
          } else {
            throw new Error("No billing information");
          }
        }, (error: any)=>reject(error)
      ).catch((error: any)=>reject(error));
    });
  }
}
