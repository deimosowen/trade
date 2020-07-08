const db = require('../models');
const context = db.sequelize.models;
const op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    context.s_routes_stage.findAll().then(data => {
        res.status(200).send(data.map(item => {
            return {
                id: item.id,
                name: item.stage_name
            };
        }));
    });
};