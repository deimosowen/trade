module.exports = app => {
    const router = require('express').Router();
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    const swaggerDocument = YAML.load('./swagger.yaml');

    router.use('/', swaggerUi.serve);
    router.get('/', swaggerUi.setup(swaggerDocument));
    app.use('/api-docs', router);
};