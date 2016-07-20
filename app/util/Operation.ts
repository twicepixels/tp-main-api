///<reference path="../framework/ListItem.ts" />
///<reference path="SQLParameter.ts" />
/**
 * Created by Gabriel on 04/06/2016.
 */
class Operation {
    constructor(private sql:string, private sqlParameters:List<SQLParameter>) {
      
    }

    public getSqlParameters():List<SQLParameter> {
        return this.sqlParameters;
    }

    public setSqlParameters(sqlParameters:List<SQLParameter>) {
        this.sqlParameters = sqlParameters;
    }

    public getSql():string {
        return this.sql;
    }

    public setSql(sql:string):void {
        this.sql = sql;
    }

    public getColumn(columnName:string):SQLParameter {
        var i = 0;//this.sqlParameters.size();
        var find:boolean = false;
        var resultParameter:SQLParameter = null;
        while (i < this.sqlParameters.size() && !find) {
            var column:SQLParameter = this.sqlParameters.get(i).value;
            if (column.getId() == columnName) {
                find = true;
                resultParameter = column;
            }
        }
        return resultParameter;
    }

}
