module.exports = app => {
    const controller = require("../controllers/applications.controller.js");
    const { query, body, checkSchema } = require('express-validator');
    var router = require("express").Router();

    router.get("/", controller.findClientsAll);

    router.get("/applications", [
        /*  query('company_id')
             .notEmpty().withMessage('company_id is required')
             .isUUID(), */
        query('stage_id')
            .notEmpty().withMessage('stage_id is required')
            .isInt()
    ], controller.findClientsApplicationAll);

    router.post("/applications", checkSchema({
        client_id: {
            in: ['body'],
            errorMessage: 'client_id is wrong',
            isUUID: true,
        },
        products: {
            custom: {
                options: (value) => {
                    return value;
                }
            }
        },
    }), controller.createClientsApplication);

    router.get("/applications/payments", [
        query('application_id')
            .notEmpty().withMessage('application_id is required')
            .isUUID()
    ], controller.findClientsApplicationPaymentById);

    router.post("/applications/payments", [
        body('application_id')
            .notEmpty().withMessage('application_id is required')
            .isUUID(),
    ], controller.createClientsApplicationPayment);

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

    router.post("/applications/stages", [
        body('application_id')
            .notEmpty().withMessage('application_id is required')
            .isUUID(),
        body('user_id')
            .notEmpty().withMessage('user_id is required')
            .isUUID(),
        body('stage_id')
            .notEmpty().withMessage('stage_id is required')
            .isInt()
    ], controller.createClientsApplicationStages);

    app.use('/api/clients', router);
};