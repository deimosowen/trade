'use strict';
const debug = require('debug');
const express = require('express');
const logger = require('morgan');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

const app = express();

app.use(logger('dev'));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

require("./routes/")(app);

passport.use(new BearerStrategy(function (token, done) {
  jwt.verify(token, '!Q@W#E$R%T^Y&U*I(O)P', function (err, decoded) {
    if (err) {
      return done(null, false);
    }
    return done(null, {});
  });
}));

app.set('port', process.env.PORT || 3000); // app.get('port')
app.listen(3000, function () {
  console.log(
    'Server ready at: http://localhost:3000 \n',
  );
});