import * as session from "express-session";
const MongoStore = require('connect-mongo')(session);

module.exports.session = {
  resave: true,
  name: "connect.tpsid",
  saveUninitialized: true,
  secret: 'f134ec88b47384b00060e72c06cd2012',
  store: new MongoStore({
    url: 'mongodb://172.16.122.12/local'
  })
};
