module.exports = app => {
    const controller = require("../controllers/routes_stage.controller.js");
    var router = require("express").Router();
    router.get("/", controller.findAll);
    app.use('/api/routes_stage', router);
};