///<reference path="Operation.ts" />
///<reference path="../framework/ListItem.ts" />
/**
 * Created by Gabriel on 04/06/2016.
 */
export class DalReader {
  public static ENTITY:string = "entity";
  public static ENTITIES:string = "entities";
  public static OPERATIONS:string = "operations";
  public static OPERATION:string = "operation";
  public static COLUMNS:string = "columns";
  public static COLUMN:string = "column";
  public static ID:string = "id";
  public static TYPE:string = "type";
  public static SQL:string = "sql";
  currentOperationResult:Operation = null;
  private fs = require('fs');
  constructor() {

  }

  public readOperation(fileName:string, entityId:string, operationId:string, miCallback:any):void {
    try {
      /*var file = new File(new toString[fileName.length], fileName);
      var fileReader = new FileReader();
      var text:string;
      fileReader.onload = file => {
        var contents:any = file.target;
        text = contents.result;
      };
      fileReader.readAsText(file);*/
      var text:string;
      this.fs.readFile(fileName, function (err:any, data:any) {
        if (err) {
          return console.error(err);
        }
        console.log("Asynchronous read: " + data.toString());
        text = data.toString();
      });
      var oParser = new DOMParser();
      var oDOM = oParser.parseFromString(text, "text/xml");
      var entitiesList:any = oDOM.getElementsByTagName(DalReader.ENTITIES);
      for (var i = 0; i < entitiesList.length; i++) {
        var currentEntity:Element = entitiesList.item[i];
        if (currentEntity.getAttribute(DalReader.ID).toString() == entityId) {
          var operationsList = entitiesList[i].getElementsByTagName(DalReader.OPERATION);
          for (var j = 0; j < operationsList.length; j++) {
            var currentOperation:any = operationsList.item[i];
            if (currentOperation.getAttribute(DalReader.ID) == operationId) {
              var sqlNode = currentOperation.getElementsByTagName(DalReader.SQL).item[0];
              var sql:string = sqlNode.getFirstToken().getValue(); //getAttributeNode(); //TODO
              var columnsNode:any = currentOperation.getElementsByTagName(DalReader.COLUMNS);
              var columnNode = columnsNode.item[0].getElementsByTagName(DalReader.COLUMN);
              var sqlParameters:List<SQLParameter> = new List<SQLParameter>();
              for (var columns = 0; columns < columnNode.getLength(); columns++) {
                var eColumn:Element = columnNode.item[columns];
                var currentParameter:SQLParameter = new SQLParameter();
                currentParameter.setId(eColumn.getAttribute(DalReader.ID));
                currentParameter.setType(eColumn.getAttribute(DalReader.TYPE));
                sqlParameters.add(currentParameter);
              }
              this.currentOperationResult = new Operation(sql, sqlParameters);
              //Romper el ciclo por que encontro la operación
              break;
            }
          }
          break;
        }
      }
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
    for(var i = 0; i < parameters.size(); i++){
      var current:SQLParameter= parameters.get(i).value;
      arrayParameters[i] = current.getId();
    }
    return ;
  }

}
