module.exports = app => {
    const router = require('express').Router();
    const swaggerUi = require('swagger-ui-express');
    const swaggerDocument = require('../swagger.json');

    router.use('/', swaggerUi.serve);
    router.get('/', swaggerUi.setup(swaggerDocument));
    app.use('/api-docs', router);
};