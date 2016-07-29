var passport = require("passport");
import { Passport } from "passport";
import { Service } from "./base.service";
import { CryptoService } from "./crypto.service";
var LocalStrategy = require("passport-local").Strategy;

export class PassportService extends Service {

  public static config(): Passport {
    var auth = this;
    passport.use(new LocalStrategy((username: string, password: string, done: any)=> {
      // asynchronous verification, for effect...
      process.nextTick(()=> {
        // Find the user by username. If there is no user with the given
        // username, or the password is not correct, set the user to `false` to
        // indicate failure and set a flash message. Otherwise, return the
        // authenticated `user`.
        auth.findByUsername(username, (err: any, user: any)=> {
          if (err) {
            return done(null, err);
          }
          if (!user) {
            return done(null, false, {
              message: 'Unknown user ' + username
            });
          }
          CryptoService.compare(password, user.password, (err: any, isEqual: boolean)=> {
            if (!isEqual) {
              return done(null, false, {message: 'Invalid Password'});
            }
            return done(null, user.toJSON(), {message: 'Logged In Successfully'});
          });
        });
      });
    }));

    passport.serializeUser((user: any, done: any)=> {
        done(null, user.id);
      }
    );

    passport.deserializeUser((id: number, done: any)=> {
        auth.findById(id, (err: any, user: any)=> {
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
      .then(
        (user: any)=> next(null, user),
        (error: any)=> next(error, null));
  }

  private static findByUsername(username: string, next: any) {
    this.Models.User.findOne({
      where: {
        $or: [
          {email: {$eq: username}},
          {username: {$eq: username}}
        ]
      }
    }).then(
      (user: any)=> next(null, user),
      (error: any)=> next(error, null)
    );
  }
}
