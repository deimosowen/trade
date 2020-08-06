const context = require('../prisma');
const { validationResult } = require('express-validator');

exports.findCompaniesAll = (req, res) => {
    context.d_companies.findMany().then(data => {
        return res.status(200).send(data.map(item => {
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
        return res.status(500).send({
            message:
                err.message || "Error"
        });
    });
};

exports.findCompaniesClientsById = (req, res) => {
    const companyId = req.query.company_id,
        errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    context.d_companies_clients.findMany({
        where: {
            d_companies_id: companyId,
        },
        include: {
            d_clients: true
        }
    }).then(data => {
        return res.status(200).send(data.map(item => {
            return {
                id: item.d_clients.id,
                name: item.d_clients.client_name,
                address: item.d_clients.address,
                email: item.d_clients.email,
                phone: item.d_clients.phone_number1,
            };
        }));
    }).catch(err => {
        return res.status(500).send({
            message:
                err.message || "Error"
        });
    });
};

exports.findCompaniesProductsTypesById = (req, res) => {
    const companyId = req.query.company_id,
        errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    context.d_companies_products_types.findMany({
        where: {
            d_companies_id: companyId,
        },
        select: {
            id: true,
            type_name: true,
        }
    }).then(data => {
        return res.status(200).send(data.map(item => {
            return {
                id: item.id,
                name: item.type_name
            };
        }));
    }).catch(err => {
        return res.status(500).send({
            message:
                err.message || "Error"
        });
    });
};

exports.findCompaniesProductsById = (req, res) => {
    const companyId = req.query.company_id,
        categoryId = req.query.category_id,
        typeId = req.query.type_id,
        errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    context.d_companies_products.findMany({
        where: {
            d_companies_id: companyId,
            d_companies_products_types_id: typeId,
            d_companies_products_price: {
                some: {
                    date_start: {
                        lte: new Date()
                    },
                    OR: [{
                        date_stop: null
                    }, {
                        date_stop: {
                            gte: new Date()
                        }
                    }],
                    d_companies_clients_category_id: categoryId
                }
            }
        },
        select: {
            id: true,
            code: true,
            d_products: {
                select: {
                    product_name: true,
                    s_unit_measure: {
                        select: {
                            unit_name: true
                        }
                    }
                }
            },
            d_companies_products_price: {
                select: {
                    price: true,
                    date_start: true,
                    date_stop: true
                }
            }
        }
    }).then(data => {
        return res.status(200).send(data.map(item => {
            return {
                id: item.id,
                code: item.code,
                name: item.d_products.product_name,
                unit: item.d_products.s_unit_measure.unit_name,
                price: item.d_companies_products_price[0].price
            };
        }));
    }).catch(err => {
        return res.status(500).send({
            message:
                err.message || "Error"
        });
    });
}; 