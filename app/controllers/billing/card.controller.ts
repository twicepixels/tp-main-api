import { Request, Response } from 'express';
import { CardService } from "../../services/billing/card.service";

let c = require("../../../base/base.controller");

export class CardController {

  public static create(req: Request, res: Response) {
    let _service = new CardService(req, res);
    let tokenId: string = req.body["tokenId"];
    c.handleService(res, _service.addCard(tokenId));
  }
}

