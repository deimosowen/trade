'use strict';
const debug = require('debug');
const express = require('express');
const logger = require('morgan');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(cors({origin: "http://localhost:3000"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require("./routes/")(app);

app.set('port', process.env.PORT || 3000); // app.get('port')
app.listen(3000, function () {
    console.log(
        'Server ready at: http://localhost:3000 \n',
      );
});