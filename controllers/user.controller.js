const context = require('../prisma');

exports.findAll = (req, res) => {
    context.d_user.findMany().then(data => {
        return res.status(200).send(data.map(item => {
            return {
                id: item.id,
                name: item.user_name,
                name: item.job_pos_name,
            };
        }));
    }).catch(err => {
        return res.status(500).send({
            message:
                err.message || "Error"
        });
    });
};