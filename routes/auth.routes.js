module.exports = app => {
    const controller = require("../controllers/auth.controller.js");
    const { query, body } = require('express-validator');
    var router = require("express").Router();
    router.post("/token", [
        body('email')
            .notEmpty().withMessage('email is required'),
        body('password')
            .notEmpty().withMessage('password is required')
    ], controller.getToken);
    app.use('/api/auth', router);
};