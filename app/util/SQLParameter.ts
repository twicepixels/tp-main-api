/**
 * Created by Gabriel on 04/06/2016.
 */
class SQLParameter {
    private id:string;
    private type:string;

    public getId():string {
        return this.id;
    }

    public setId(id:string):void {
        this.id = id;
    }

    public getType():string {
        return this.type;
    }

    public setType(type:string):void {
        this.type = type;
    }
}
