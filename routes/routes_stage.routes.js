module.exports = app => {
    const controller = require("../controllers/routes_stage.controller.js");

    var router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/", controller.findAll);

    app.use('/api/routes_stage', router);
};