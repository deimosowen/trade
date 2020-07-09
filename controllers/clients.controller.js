const db = require('../models');
const context = db.sequelize.models;
const op = db.Sequelize.Op;

exports.findClientsApplicationAll = (req, res) => {
    const companyId = req.query.company_id,
        stageId = req.query.stage_id;

    context.d_clients_application.findAll({
        include: [
            {
                required: true,
                model: context.d_clients,
                include: [
                    {
                        where: {
                            d_companies_id : companyId
                        },
                       model: context.d_companies_clients
                    }
                ]
            }
        ]
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error"
        });
    });

    /*  db.companies.findAll({ 
          where: condition,
          include: [
              {
                model: db.addressLocalities
              }
          ]
      })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        });*/
};