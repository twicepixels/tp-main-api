import { Request, Response } from 'express';
var passport = require("passport");

export class AuthController {
	public static login(req: Request, res: Response) {
		passport.authenticate('local', function (err: any, user: any) {
			if (err || !user) {
				return res.status(500).send({
					message: 'login failed'
				});
			}
			req.logIn(user, function (err) {
				if (err) {
					return res.status(500).send({
						message: err.message
					});
				}
        console.log(user);
        return res.json({
          user
        });
				/*return res.send({
					message: 'login successful'
				});*/
			});
		})(req, res);
	}

	public static logout(req: Request, res: Response) {
		req.logout();
		res.send('logout successful');
	}
}
