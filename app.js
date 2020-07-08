'use strict';
const debug = require('debug');
const express = require('express');
const logger = require('morgan');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require("./models");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

db.sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
});

require("./routes/companies.routes")(app);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
