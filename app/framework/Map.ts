module MapModule {
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

    public insert(key:string, value:string) {
      this.mapItems[this.mapItems.length] = {key: key, value: value};
    }

    public update(key:string, value:string):boolean {
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

    public get(key:string):string {
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
    public value:string;
  }
}

/*function assert(condition:any) {
  if (!condition) {
    throw "Assertion failed";
  }
}

console.log("Starting tests");

var test:MapModule.Map;
test = new MapModule.Map();

assert(test.empty());
assert(test.size() === 0);

var newSize = 10;
for (var i = 0; i < newSize; i++) {
  test.insert(i, String(i));
  assert(test.size() === i + 1);
}

for (var i = 0; i < newSize; i++) {
  assert(test.update(i, String("100")));
  assert(test.contains(i));
  assert(test.get(i) === String("100"));
}

assert(!test.empty());
assert(test.size() !== 0);

console.log("Tests complete");*/

// vim: set ft=javascript :
