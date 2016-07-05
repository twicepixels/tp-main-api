import { ModelLoader } from "./mysql.loader";
export abstract class Service {
	Models = ModelLoader.getInstance().getModels();
	static Models = ModelLoader.getInstance().getModels();
}
