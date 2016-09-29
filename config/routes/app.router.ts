import * as util from "util";
import { Router, Request, Response } from "express";
import { AUTH_ROUTER } from "./auth.route";
import { USER_ROUTER } from "./user.route";
import { UTIL_ROUTER } from "./util.route";
import { ACCOUNT_ROUTER } from "./account.route";
import { BILLING_ROUTER } from "./billing/router";
import { COLLABORATOR_ROUTER } from "./collaborator/router";

export class AppRouter {
  public static config(router: Router): void {
    // middleware that is specific to this router -- CORS
    router.use((req: Request, res: Response, next: any)=> {
      util.log(util.format("Request to: %s:%s -- Params:%s",
        req.url, req.method, JSON.stringify(req.body)));
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
    APP_ROUTER.get("/", (req, res)=> {
      res.send('Twicepixels on-line');
    });
    router.use("/", APP_ROUTER);
    router.use("/auth", AUTH_ROUTER);
    router.use("/utils", UTIL_ROUTER);
    router.use("/users", USER_ROUTER);
    router.use("/accounts", ACCOUNT_ROUTER);
    //billing routers
    router.use("/billing", BILLING_ROUTER);
    //collaborator routers
    router.use("/collaborator", COLLABORATOR_ROUTER);
  }
}
