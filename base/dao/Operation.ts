import { List } from "../framework/ListItem";
import { SQLParameter } from "./SQLParameter";

export class Operation {
  constructor(private sql: string, private sqlParameters: List<SQLParameter>) {

  }

  public getSqlParameters(): List<SQLParameter> {
    return this.sqlParameters;
  }

  public setSqlParameters(sqlParameters: List<SQLParameter>): void {
    this.sqlParameters = sqlParameters;
  }

  public getSql(): string {
    return this.sql;
  }

  public setSql(sql: string): void {
    this.sql = sql;
  }

  public getColumn(columnName: string): SQLParameter {
    var i = 0;//this.sqlParameters.size();
    var find: boolean = false;
    var resultParameter: SQLParameter = null;
    while (i < this.sqlParameters.size() && !find) {
      var column: SQLParameter = this.sqlParameters.get(i).value;
      if (column.getId() == columnName) {
        find = true;
        resultParameter = column;
      }
    }
    return resultParameter;
  }
}
