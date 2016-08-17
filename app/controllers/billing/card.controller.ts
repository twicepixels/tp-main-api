import { Request, Response } from 'express';
import { CardService } from "../../services/billing/card.service";

let c = require("../../../base/base.controller");

export class CardController {

  public static create(req: Request, res: Response) {
    let _service = new CardService(req, res);
    let tokenId: string = req.body["tokenId"];
    let accountId: number = req.user["accountId"];
    c.handleService(res, _service.addCard(accountId, tokenId));
  }

  public static getByCustomer(req: Request, res: Response) {
    let _service = new CardService(req, res);
    let accountId: number = req.user["accountId"];
    c.handleService(res, _service.getCustomerCards(accountId));
  }
}

