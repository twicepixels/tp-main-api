import { Router, Request, Response } from "express";
var authenticatedPolicy = require("../policies/authenticated");
import { AUTH_ROUTER } from "./auth.route";
import { USER_ROUTER } from "./user.route";

export class AppRouter {
  public static config(router: Router): void {
    // middleware that is specific to this router -- CORS
    router.use(function (req: Request, res: Response, next: any) {
      console.log('Time: ', Date.now());
      // res.header("Content-Type", "application/json");
      res.setHeader('Access-Control-Allow-Credentials', "true");
      res.header("Access-Control-Allow-Origin", req.header("Origin"));
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,HEAD,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      if ('OPTIONS' == req.method) {
        res.sendStatus(200);
      }
      else {
        next();
      }
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
