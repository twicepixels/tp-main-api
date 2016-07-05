import * as fs from "fs";
import * as path from "path";
var Sequelize = require("sequelize");
var connections = require("../config/connections");

export class ModelLoader {
	private static _instance: ModelLoader;
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

	public getModels(): any {
		return this._models;
	}

	private setupModels() {
		var dir = "app/models";
		var models = this._models;
		var connects = connections["connections"];
		Object.keys(connects).forEach(function (key) {
			var coll = connects[key];
			if (coll["dialect"] == "mysql") {
				var sqlz = new Sequelize(coll["database"],
					coll["user"], coll["password"], coll);
				fs.readdirSync(dir).filter(function (file) {
					return path.extname(file) == ".js";
				}).forEach(function (file) {
					var c = path.join("../" + dir, file);
					var model = sqlz.import(c);
					models[model.name] = model;
				});
			}
		});
	}
}