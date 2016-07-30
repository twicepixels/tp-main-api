export class Map {
  private mapItems:Array<MapItem>;

  constructor() {
    this.mapItems = new Array<MapItem>();
  }

  public empty():boolean {
    return (this.mapItems.length === 0);
  }

  public size():number {
    return (this.mapItems.length);
  }

  public insert(key:string, value:Object) {
    this.mapItems[this.mapItems.length] = {key: key, value: value};
  }

  public update(key:string, value:Object):boolean {
    for (var i = 0; i < this.mapItems.length; i++) {
      if (this.mapItems[i].key === key) {
        this.mapItems[i].value = value;
        return true;
      }
    }
    return false;
  }

  public contains(key:string):boolean {
    for (var i = 0; i < this.mapItems.length; i++) {
      if (this.mapItems[i].key === key) {
        return true;
      }
    }
    return false;
  }

  public get(key:string):Object {
    for (var i = 0; i < this.mapItems.length; i++) {
      if (this.mapItems[i].key === key) {
        return this.mapItems[i].value;
      }
    }
    return String(null);
  }
}

class MapItem {
  public key:string;
  public value:Object;
}
