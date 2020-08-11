module.exports = app => {
    const controller = require("../controllers/clients.controller.js");
    const { query, body, checkSchema } = require('express-validator');
    const passport = require('passport');
    var router = require("express").Router();

    router.get("/", passport.authenticate('bearer', { session: false }), controller.findClientsAll);

    router.get("/applications", passport.authenticate('bearer', { session: false }), [
        /*  query('company_id')
             .notEmpty().withMessage('company_id is required')
             .isUUID(), */
        query('stage_id')
            .notEmpty().withMessage('stage_id is required')
            .isInt()
    ], controller.findClientsApplicationAll);

    router.get("/companies", passport.authenticate('bearer', { session: false }), [
        query('client_id')
            .notEmpty().withMessage('client_id is required')
            .isUUID()
    ], controller.findClientsCompanyAll);

    router.post("/applications", passport.authenticate('bearer', { session: false }), checkSchema({
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

    router.get("/applications/payments", passport.authenticate('bearer', { session: false }), [
        query('application_id')
            .notEmpty().withMessage('application_id is required')
            .isUUID()
    ], controller.findClientsApplicationPaymentById);

    router.post("/applications/payments", passport.authenticate('bearer', { session: false }), [
        body('application_id')
            .notEmpty().withMessage('application_id is required')
            .isUUID(),
        body('user_id')
            .notEmpty().withMessage('user_id is required')
            .isUUID(),
        body('sum_pay')
            .notEmpty().withMessage('sum_pay is required')
    ], controller.createClientsApplicationPayment);

    router.get("/applications/products", passport.authenticate('bearer', { session: false }), [
        query('application_id')
            .notEmpty().withMessage('application_id is required')
            .isUUID()
    ], controller.findClientsApplicationProductsById);

    router.get("/applications/stages", passport.authenticate('bearer', { session: false }), [
        query('application_id')
            .notEmpty().withMessage('application_id is required')
            .isUUID()
    ], controller.findClientsApplicationStagesById);

    router.post("/applications/stages", passport.authenticate('bearer', { session: false }), [
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