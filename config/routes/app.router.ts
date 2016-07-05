import { Router } from "express";
var authenticatedPolicy = require("../policies/authenticated");
import { AUTH_ROUTER } from "./auth.route";
import { USER_ROUTER } from "./user.route";

export class AppRouter {
	public static config(router: Router): void {
		// middleware that is specific to this router
		router.use(function timeLog(req, res, next) {
			console.log('Time: ', Date.now());
			next();
		});
		var APP_ROUTER: Router = Router();
		// define routes
		APP_ROUTER.get("/", function (req, res) {
			res.send('Twicepixels on-line');
		});
		router.use("/", APP_ROUTER);
		router.use("/auth", AUTH_ROUTER);
		router.use("/users", authenticatedPolicy, USER_ROUTER);
	}
}