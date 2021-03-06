import * as fs from "fs";
import * as path from "path";
var Sequelize = require("sequelize");
var connections = require("../config/connections");

export class ModelLoader {
  private static _instance: ModelLoader;
  private _dbs: any = {};
  private _models: any = {};

  constructor() {
    if (ModelLoader._instance) {
      throw new Error("Error: Instantiation failed: Use ModelLoader.getInstance() instead of new.");
    }
    this.setupModels();
    ModelLoader._instance = this;
  }

  public static getInstance(): ModelLoader {
    if (!ModelLoader._instance) {
      this._instance = new ModelLoader();
    }
    return ModelLoader._instance;
  }

  public getDBs(): any {
    return this._dbs;
  }

  public getModels(): any {
    return this._models;
  }

  private setupModels() {
    var dir = "app/models";
    var dbs = this._dbs;
    var models = this._models;
    var conn = connections.tpMySQL01;
    if (conn["dialect"] == "mysql") {
      var sqlz = new Sequelize(conn["database"],
        conn["user"], conn["password"], conn);
      fs.readdirSync(dir).filter(function (file) {
        return path.extname(file) == ".js";
      }).forEach(function (file) {
        var c = path.join("../" + dir, file);
        var model = sqlz.import(c);
        models[model.name] = model;
      });
      dbs["tpMySQL01"] = sqlz;
    }
  }
}
