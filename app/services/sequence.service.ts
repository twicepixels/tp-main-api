var util = require("util");
import { Map } from "../../base/framework/Map";
import { GenericDao } from "../../base/dao/GenericDao";
let seqDao = new GenericDao("UtilitiesDal", "general.sequence");

export class SequenceService {

  public getNextSequence(sequenceName: string): Promise<any> {
    let data: Map = new Map();
    data.insert("pName", sequenceName);
    return new Promise((resolve: any, reject: any)=> {
      seqDao.execRaw("P_NextSequence", data).then(
        (result: any)=> {
          if (result) {
            resolve(result[0]);
          }
          throw new Error(util.format("Sequence %s not available.", sequenceName));
        },
        (error: any)=>reject(error)
      ).catch((error: any)=>reject(error));
    });
  }
}
