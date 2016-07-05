import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import { AppRouter } from "./config/routes/app.router";
import { PassportService } from "./base/passport.service";

class Server {
	public app: express.Express;

	public static bootstrap(): Server {
		return new Server();
	}

	constructor() {
		//create expressjs application
		this.app = express();
		//configure application
		this.config();
		//configure routes
		this.routes();
		//configure errors
		this.errors();
	}

	private config() {
		//mount logger
		//this.app.use(logger("dev"));
		//mount json form parser
		this.app.use(bodyParser.json());
		//mount query string parser
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));
		this.app.use(session({
			resave: true,
			name: "connect.tpsid",
			saveUninitialized: true,
			secret: 'f134ec88b47384b00060e72c06cd2012'
		}));
		//configure security
		var auth = PassportService.config();
		this.app.use(auth.initialize());
		this.app.use(auth.session());
	}

	private routes() {
		//get router
		let router: express.Router;
		router = express.Router();
		//create routes
		AppRouter.config(router);
		//use router middleware
		this.app.use(router);
	}

	private errors() {
		this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
			console.error(err.stack);
			if (res.headersSent) {
				return next(err);
			}
			res.status(404);
			res.send({error: err.message});
		});
	}
}

var server = Server.bootstrap();
export default server.app;