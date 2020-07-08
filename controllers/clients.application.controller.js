const db = require('../models');
const op = db.Sequelize.Op;

exports.findByCompanyId = (req, res) => {
    const name = req.query.name;
    var condition = name ? { companies_name: { [op.iLike]: `%${name}%` } } : null;
    
    db.companies.findAll({

        include: [
            {
              model: db.addressLocalities
            }
        ]
    }).then(data => {
        res.status(200).send(data.map(item => {
            return {
                id: item.id,
                companies_name: item.companies_name,
                locality_name: item.s_address_locality.locality_name
            };
        }));
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