import { ModelLoader } from "./mysql.loader";
import { Request, Response } from "express";
const formidable = require('formidable');
let parameters = require('../config/parameters');

export abstract class Service {
  DBs = ModelLoader.getInstance().getDBs();
  Models = ModelLoader.getInstance().getModels();

  constructor(protected req: Request, protected res: Response) {
  }

  user(): any {
    return this.req.user;
  }

  public upload(multiple: boolean): Promise<any> {
    var form = new formidable.IncomingForm();
    form.uploadDir = parameters.uploadFolder;
    form.multiples = multiple;
    let arrayFiles: Array<any> = [];
    return new Promise((resolve: any, reject: any)=> {
      form.on('file', (field: any, file: any)=> {
        arrayFiles.push(file);
      });
      form.on('error', (err: any) => {
        reject('error:' + err);
      });
      form.on('end', () => {
        resolve(arrayFiles);
      });
      form.parse(this.req);
    });
  }
}
