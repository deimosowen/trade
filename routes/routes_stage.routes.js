module.exports = app => {
    const controller = require("../controllers/routes_stage.controller.js");
    var router = require("express").Router();
    const passport = require('passport');
    router.get("/", passport.authenticate('bearer', { session: false }), controller.findAll);
    app.use('/api/reference/routes_stage', router);
};