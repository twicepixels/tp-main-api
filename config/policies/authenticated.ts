import { Request, Response } from 'express';

module.exports = function (req: Request, res: Response, next: any) {
  // User is allowed, proceed to controller
  var is_auth = req.isAuthenticated();
  if (is_auth) return next();
  // User is not allowed
  return res.sendStatus(401);
};
