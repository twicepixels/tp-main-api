import { Request, Response } from 'express';
import { UserService } from "../services/user.service";

export class UserController {
	public static getAll(req: Request, res: Response) {
		UserService.getAll(null, function (err: any, result: any) {
			if (err) {
				res.status(500).send({
					message: err.message
				});
			} else {
				res.send(result);
			}
		});
	}
}