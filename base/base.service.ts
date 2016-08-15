import { ModelLoader } from "./mysql.loader";
import { Request, Response } from "express";

export abstract class Service {
  DBs = ModelLoader.getInstance().getDBs();
  Models = ModelLoader.getInstance().getModels();

  constructor(protected req: Request, protected res: Response) {
  }

  user(): any {
    return this.req.user;
  }
}
