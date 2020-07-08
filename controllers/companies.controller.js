const db = require('../models');
const context = db.sequelize.models;
const op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { companies_name: { [op.iLike]: `%${name}%` } } : null;

    context.d_companies.findAll({
        where: condition,
        include: [
            {
                model: context.s_address_localities
            }
        ]
    }).then(data => {
        res.status(200).send(data.map(item => {
            return {
                id: item.id,
                companies_name: item.companies_name,
                locality_name: item.s_address_locality.locality_name,
                address: item.address,
                email: item.email,
                phone_number: item.phone_number,
                website: item.website
            };
        }));
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