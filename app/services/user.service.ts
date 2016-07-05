import { Service } from "../../base/base.service";

export class UserService extends Service {
	public static getAll(criteria: any, next: any) {
		this.Models.User.findAll({
			where: criteria
		}).then(function (user: any) {
			// was found successfully!
			next(null, user);
		}, function (error: any) {
			// error handling
			next(error, null);
		});
	}
}
