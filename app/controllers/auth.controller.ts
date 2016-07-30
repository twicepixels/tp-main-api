import { Request, Response } from 'express';
var passport = require("passport");

export class AuthController {
  public static login(req: Request, res: Response) {
    passport.authenticate('local', (err: any, user: any)=> {
      if (err || !user) {
        return res.status(500).send({
          message: 'login failed'
        });
      }
      req.logIn(user, (err)=> {
        if (err) {
          return res.status(500).send({
            message: err.message
          });
        }
        return res.json(user);
      });
    })(req, res);
  }

  public static logout(req: Request, res: Response) {
    req.logout();
    res.send({message: 'logout successful'});
  }
}
