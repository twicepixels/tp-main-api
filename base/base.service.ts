import { ModelLoader } from "./mysql.loader";
export abstract class Service {
  DBs = ModelLoader.getInstance().getDBs();
  static DBs = ModelLoader.getInstance().getDBs();
  Models = ModelLoader.getInstance().getModels();
  static Models = ModelLoader.getInstance().getModels();
}
