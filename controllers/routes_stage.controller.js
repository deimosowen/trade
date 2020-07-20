const context = require('../prisma');

exports.findAll = (req, res) => {
    context.s_routes_stage.findMany().then(data => {
        return res.status(200).send(data.map(item => {
            return {
                id: item.id,
                name: item.stage_name
            };
        }));
    }).catch(err => {
        return res.status(500).send({
            message:
                err.message || "Error"
        });
    });
};