module.exports = app => {
    const controller = require("../controllers/companies.controller.js");
    var router = require("express").Router();
    router.get("/", controller.findAll);
    app.use('/api/companies', router);
};