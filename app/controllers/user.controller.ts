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

  public static get(req: Request, res: Response) {
    UserService.get(null, function (err: any, result: any) {
      if (err) {
        res.status(500).send({
          message: err.message
        });
      } else {
        res.send(result);
      }
    });
  }

  public static delete(req: Request, res: Response) {
    UserService.delete(null, function (err: any, result: any) {
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
