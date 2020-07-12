const context = require('../prisma');

exports.findAll = (req, res) => {
    context.s_routes_stage.findMany().then(data => {
        res.status(200).send(data.map(item => {
            return {
                id: item.id,
                name: item.stage_name
            };
        }));
    });
};