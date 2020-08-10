"use strict";
const debug = require("debug");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const tokenMiddleware = require("./middleware/token.middleware");

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

require("./routes/")(app);

passport.use(
  new BearerStrategy(function (token, done) {
    tokenMiddleware.verify(token, done);
  })
);

app.set("port", process.env.PORT || 3000); // app.get('port')
app.listen(3000, function () {
  console.log("Server ready at: http://localhost:3000 \n");
});
