module.exports = app => {
    const controller = require("../controllers/companies.controller.js");
    const { checkSchema } = require('express-validator');
    const passport = require('passport');
    var router = require("express").Router();
    router.get("/", passport.authenticate('bearer', { session: false }), controller.findCompaniesAll);
    router.get("/products", checkSchema({
        company_id: {
            in: ['params', 'query'],
            errorMessage: 'company_id is wrong',
            isUUID: true,
        },
        category_id: {
            in: ['params', 'query'],
            errorMessage: 'category_id is wrong',
            optional: { options: { nullable: true } },
            isUUID: true,
        },
        type_id: {
            in: ['params', 'query'],
            errorMessage: 'type_id is wrong',
            optional: { options: { nullable: true } },
            isUUID: true,
        }
    }),
        controller.findCompaniesProductsById);
    app.use('/api/companies', router);
};