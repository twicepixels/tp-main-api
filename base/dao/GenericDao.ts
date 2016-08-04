var util = require("util");

import { Map } from "../framework/Map";
import { List } from "../framework/ListItem";
import { DalReader } from './DalReader';
import { Service } from '../base.service';
import { Operation } from "./Operation";
import { SQLParameter } from "./SQLParameter";

export class GenericDao extends Service {
  constructor(private file: string, private schema: string) {
    super();
    this.file = util.format("dals/%s.xml", file);
  }

  public getList(operationId: string, data?: Map, connection?: string): Promise<any> {
    let _class = this;
    var reader = new DalReader();
    return new Promise((resolve: any, reject: any)=> {
      reader.readOperation(_class.file, _class.schema, operationId)
        .then((op: Operation)=> {
          let params = op.getSqlParameters();
          connection = connection || "tpMySQL01";
          let sequelize = _class.DBs[connection];
          if (sequelize) {
            sequelize.query(op.getSql(), {
              type: sequelize.QueryTypes.SELECT,
              bind: GenericDao.buildParams(params, data)
            }).then(function (result: any) {
              console.log(util.format("Operation [%s]%s executed.",
                _class.schema, operationId));
              resolve(result);
            });
          } else {
            throw new Error(util.format("Connection %s not available.", connection))
          }
        })
        .catch((error: any)=> {
          console.error(error);
          reject(error);
        });
    });
  }

  private static buildParams(opParams: List<SQLParameter>, params: Map): any {
    let resultParameters: any = {};
    if (params) {
      for (var i = 0; i < opParams.size(); i++) {
        let id = opParams.get(i).value.getId();
        resultParameters[id] = params.get(id);
      }
    }
    return resultParameters;
  }
}
