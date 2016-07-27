var bcrypt = require("bcrypt");
var passport = require("passport");
import { Passport } from "passport";
var LocalStrategy = require("passport-local").Strategy;

import { Service } from "./base.service";

export class PassportService extends Service {

	public static config(): Passport {
		var auth = this;
		passport.use(new LocalStrategy(function (username: string, password: string, done: any) {
			// asynchronous verification, for effect...
			process.nextTick(function () {
				// Find the user by username. If there is no user with the given
				// username, or the password is not correct, set the user to `false` to
				// indicate failure and set a flash message. Otherwise, return the
				// authenticated `user`.
				auth.findByUsername(username, function (err: any, user: any) {
					if (err)
						return done(null, err);
					if (!user) {
						return done(null, false, {
							message: 'Unknown user ' + username
						});
					}
					bcrypt.compare(password, user.password, function (err: any, res: any) {
						if (!res)
							return done(null, false, {
								message: 'Invalid Password'
							});
						var returnUser = {
							username: user.username,
							createdAt: user.createdAt,
							id: user.id
						};
						return done(null, returnUser, {
              returnUser
							//message: 'Logged In Successfully'
						});
					});
				})
			});
		}));

		passport.serializeUser(function (user: any, done: any) {
				done(null, user.id);
			}
		);

		passport.deserializeUser(function (id: number, done: any) {
				auth.findById(id, function (err: any, user: any) {
					if (err || !user) {
						return done(err, false);
					}
					return done(null, user);
				});
			}
		);
		return passport;
	}

	//helper functions	
	private static findById(id: number, next: any) {
		this.Models.User.findOne({where: {id: id}})
			.then(function (user: any) {
				return next(null, user);
			}, function (error: any) {
				return next(error, null);
			});
	}

	private static findByUsername(username: string, next: any) {
		this.Models.User.findOne({
			where: {
				$or: [
					{email: {$eq: username}},
					{username: {$eq: username}}
				]
			}
		}).then(function (user: any) {
			// was found successfully!
			next(null, user);
		}, function (error: any) {
			// error handling
			next(error, null);
		});
	}
}
