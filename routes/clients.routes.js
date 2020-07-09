module.exports = app => {
    const controller = require("../controllers/clients.controller.js");
    var router = require("express").Router();
    router.get("/application", controller.findClientsApplicationAll);

    app.use('/api/clients', router);
};