module.exports = app => {
    const controller = require("../controllers/user.controller.js");
    const passport = require('passport');
    var router = require("express").Router();
    //router.get("/", passport.authenticate('bearer', { session: false }), controller.findAll);
    router.get("/", controller.findAll);
    app.use('/api/reference/user', router);
};