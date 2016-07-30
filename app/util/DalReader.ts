///<reference path="Operation.ts" />
///<reference path="../framework/ListItem.ts" />

var DOMParser = require('xmldom').DOMParser;
import {List} from "../framework/ListItem";
import {SQLParameter} from "../util/SQLParameter";
import {Operation} from "../util/Operation";
/**
 * Created by Gabriel on 04/06/2016.
 */
export class DalReader {
  public static ENTITY:string = "entity";
  public static ENTITIES:string = "entities";
  public static DAL:string = "dal";
  public static OPERATIONS:string = "operations";
  public static OPERATION:string = "operation";
  public static COLUMNS:string = "columns";
  public static COLUMN:string = "column";
  public static ID:string = "id";
  public static TYPE:string = "type";
  public static SQL:string = "sql";
  private currentOperationResult:Operation = null;
  private fs = require('fs');

  constructor() {

  }

  public readOperation(fileName:string, entityId:string, operationId:string, miCallback:any):void {
    try {
      let _class = this;
      var text:string = "";
      this.fs.readFile(fileName, function (err:any, data:any) {
        if (err) {
          return console.error(err);
        }
        console.log("Asynchronous read: " + data.toString());
        text = data.toString();
        let oParser:DOMParser = new DOMParser();
        //let oParser = ( new DOMParser() ).parseFromString( text, "application/xml" );//new XMLDocument();

        var oDOM = oParser.parseFromString(text, 'text/xml');
        //var oDOM = oParser.open(null, text, "text/xml");
        var entitiesList:any = oDOM.getElementsByTagName(DalReader.DAL)[0].getElementsByTagName(DalReader.ENTITIES)[0].getElementsByTagName(DalReader.ENTITY);
        for (var i = 0; i < entitiesList.length; i++) {
          var currentEntity:Element = entitiesList[i];
          if (currentEntity.getAttribute(DalReader.ID).toString() == entityId) {
            var operationsList = entitiesList[i].getElementsByTagName(DalReader.OPERATION);
            for (var j = 0; j < operationsList.length; j++) {
              var currentOperation:any = operationsList[j];
              if (currentOperation.getAttribute(DalReader.ID) == operationId) {
                var sqlNode:Element = currentOperation.getElementsByTagName(DalReader.SQL)[0];
                var sql:string = sqlNode.childNodes.toString(); //getAttributeNode(); //TODO
                var columnsNode:any = currentOperation.getElementsByTagName(DalReader.COLUMNS);
                var columnNode:NodeList = columnsNode[0].getElementsByTagName(DalReader.COLUMN);
                var sqlParameters:List<SQLParameter> = new List<SQLParameter>();
                for (var columns = 0; columns < columnNode.length; columns++) {
                  var eColumn:any = columnNode[columns];
                  var currentParameter:SQLParameter = new SQLParameter();
                  currentParameter.setId(eColumn.getAttribute(DalReader.ID));
                  currentParameter.setType(eColumn.getAttribute(DalReader.TYPE));
                  sqlParameters.add(currentParameter);
                }
                _class.currentOperationResult = new Operation(sql, sqlParameters);
                //Romper el ciclo por que encontro la operación
                break;
              }
            }
          }
        }
      });
      this.fs.close();
      miCallback(this.getScript(), this.getParameters());
    } catch (ex) {
      // print the name of the root element or error message
      //dump(oDOM.documentElement.nodeName == "parsererror" ? "error while parsing" : oDOM.documentElement.nodeName);
      console.error("outer", ex.message);
    }
  }

  public getScript():String {
    return this.currentOperationResult.getSql();
  }

  public getParameters():List<SQLParameter> {
    return this.currentOperationResult.getSqlParameters();
  }

  public getParametersASArray():Object[] {
    var parameters:List<SQLParameter> = this.currentOperationResult.getSqlParameters();
    var arrayParameters:any = {};
    for (var i = 0; i < parameters.size(); i++) {
      var current:SQLParameter = parameters.get(i).value;
      arrayParameters[i] = current.getId();
    }
    return;
  }

}
