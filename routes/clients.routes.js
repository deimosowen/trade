module.exports = app => {
    const controller = require("../controllers/clients.controller.js");
    const { query } = require('express-validator');
    var router = require("express").Router();

    router.get("/applications", [
        query('company_id')
            .notEmpty().withMessage('company_id is required')
            .isUUID(),
        query('stage_id')
            .notEmpty().withMessage('stage_id is required')
            .isInt()
    ], controller.findClientsApplicationAll);

    router.get("/applications/products", [
        query('application_id')
            .notEmpty().withMessage('application_id is required')
            .isUUID()
    ], controller.findClientsApplicationProductsById);

    router.get("/applications/stages", [
        query('application_id')
            .notEmpty().withMessage('application_id is required')
            .isUUID()
    ], controller.findClientsApplicationStagesById);

    app.use('/api/clients', router);
};