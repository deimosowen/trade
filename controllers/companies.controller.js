const context = require('../prisma');

exports.findAll = (req, res) => {
    context.d_companies.findMany().then(data => {
        res.status(200).send(data.map(item => {
            return {
                id: item.id,
                name: item.companies_name,
                address: item.address,
                email: item.email,
                phone: item.phone_number1,
                website: item.website
            };
        }));
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error"
        });
    });
}; 