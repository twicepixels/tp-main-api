import { List } from "../framework/ListItem";
import { Operation } from "./Operation";
import { SQLParameter } from "./SQLParameter";
let DOMParser = require('xmldom').DOMParser;

/**
 * Created by Gabriel on 04/06/2016.
 */
export class DalReader {
  public static ID: string = "id";
  public static SQL: string = "sql";
  public static DAL: string = "dal";
  public static TYPE: string = "type";
  public static ENTITY: string = "entity";
  public static ENTITIES: string = "entities";
  public static OPERATION: string = "operation";
  public static OPERATIONS: string = "operations";
  public static COLUMN: string = "column";
  public static COLUMNS: string = "columns";

  constructor() {
  }

  public readOperation(fileName: string, entityId: string, operationId: string): Promise<Operation> {
    let Promise = require("bluebird");
    let readFile = Promise.promisify(require('fs').readFile);

    return new Promise((resolve: any, reject: any)=> {
      readFile(fileName, "").then(function (data: any) {
        // console.log("Asynchronous read: " + data.toString());
        let text: string = data.toString();
        let oParser: DOMParser = new DOMParser();
        let oDOM = oParser.parseFromString(text, 'text/xml');
        let entitiesList: any = oDOM.getElementsByTagName(DalReader.DAL)[0]
          .getElementsByTagName(DalReader.ENTITIES)[0]
          .getElementsByTagName(DalReader.ENTITY);

        for (let i = 0; i < entitiesList.length; i++) {
          let entity: Element = entitiesList[i];
          if (entity.getAttribute(DalReader.ID).toString() == entityId) {
            let operationsList = entitiesList[i].getElementsByTagName(DalReader.OPERATION);
            for (let j = 0; j < operationsList.length; j++) {
              let operation: any = operationsList[j];
              if (operation.getAttribute(DalReader.ID) == operationId) {
                let sqlNode: Element = operation.getElementsByTagName(DalReader.SQL)[0];
                let sql: string = sqlNode.childNodes.toString();
                let columnsNode: any = operation.getElementsByTagName(DalReader.COLUMNS);
                let columnNode: NodeList = columnsNode[0].getElementsByTagName(DalReader.COLUMN);
                let sqlParameters: List<SQLParameter> = new List<SQLParameter>();
                for (let columns = 0; columns < columnNode.length; columns++) {
                  let eColumn: any = columnNode[columns];
                  let currentParameter: SQLParameter = new SQLParameter();
                  currentParameter.setId(eColumn.getAttribute(DalReader.ID));
                  currentParameter.setType(eColumn.getAttribute(DalReader.TYPE));
                  sqlParameters.add(currentParameter);
                }
                resolve(new Operation(sql, sqlParameters));
                //Romper el ciclo por que encontro la operación
                break;
              }
            }
          }
        }
        resolve(null);
      }).catch((error: any)=> {
        console.error("outer", error.message);
        reject(error);
      });
    });
  }
}
