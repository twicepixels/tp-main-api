var util = require("util");

import { Map } from "../framework/Map";
import { List } from "../framework/ListItem";
import { DalReader } from './DalReader';
import { Operation } from "./Operation";
import { SQLParameter } from "./SQLParameter";
import { ModelLoader } from "../mysql.loader";

export class GenericDao {
  constructor(private file: string, private schema: string) {
    this.file = util.format("dals/%s.xml", file);
  }

  public execRaw(operationId: string, data?: Map, connection?: string): Promise<any> {
    return this.executeStatement(operationId, data, connection, 'RAW');
  }

  public getList(operationId: string, data?: Map, connection?: string): Promise<any> {
    return this.executeStatement(operationId, data, connection, 'SELECT');
  }

  private executeStatement(operationId: string, data: Map, connection: string,
                           statementType: string): Promise<any> {
    let _class = this;
    var reader = new DalReader();
    return new Promise((resolve: any, reject: any)=> {
      let dbs = ModelLoader.getInstance().getDBs();
      reader.readOperation(_class.file, _class.schema, operationId)
        .then((op: Operation)=> {
          let params = op.getSqlParameters();
          let sequelize = dbs[connection || "tpMySQL01"];
          if (sequelize) {
            sequelize.query(op.getSql(), {
              type: statementType,
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
