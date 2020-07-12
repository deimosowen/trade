module.exports = app => {
    const controller = require("../controllers/clients.controller.js");
    const { query } = require('express-validator');
    var router = require("express").Router();
    router.get("/application", [
        query('company_id')
            .notEmpty().withMessage('company_id is required')
            .isUUID(),
        query('stage_id')
            .notEmpty().withMessage('stage_id is required')
            .isInt()
    ], controller.findClientsApplicationAll);

    app.use('/api/clients', router);
};