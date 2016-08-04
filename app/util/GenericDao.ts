import {Service} from '../../base/base.service';
import {DalReader} from './DalReader';
import {Map} from "../framework/Map";
import {List} from "../framework/ListItem";
import {SQLParameter} from "./SQLParameter";
/**
 * Created by Gabriel on 29/06/2016.
 */
export class GenericDao extends Service {
  constructor(private file:string, private schema:string) {
    super();
  }

  public getList(data:Map, operationID:string) {
    let _class = this;
    var reader = new DalReader();
    reader.readOperation(this.file, this.schema, operationID, function (sql:string, parameters:List<SQLParameter>) {
      var arrayParameters = new Array();
      for (var i = 0; i < parameters.size(); i++) {
        var value = data.get(parameters.get(i).value.getId()); 
        arrayParameters[i] = value;
      }
      _class.Models.query(sql, arrayParameters, function (err:any, results:any) {
        if (err) results.send(404, err.message);
        return results.ok(results);
      });
    });
  }
}
