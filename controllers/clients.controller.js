const context = require('../prisma');
const { validationResult } = require('express-validator');

exports.findClientsApplicationAll = (req, res) => {
    const companyId = req.query.company_id,
        stageId = req.query.stage_id,
        errors = validationResult(req);
        console.log(req.query);
        console.log(companyId);
        console.log(stageId);
        console.log(errors.array());
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    context.d_clients_application.findMany({
        where: {
            d_clients_application_products: {
                some: {
                    product_name: {
                        contains: '',
                    },
                }
            },
            d_clients: {
                d_companies_clients: {
                    some: {
                        d_companies_id: {
                            equals: companyId
                        }
                    }
                }
            },
            d_clients_application_routes_stage: {
                some: {
                    s_routes_stage_id: parseInt(stageId)
                }
            }
        },
        include: {
            d_clients: {
                include: {
                    d_companies_clients: {
                        select: {
                            d_companies_id: true
                        }
                    }
                }
            },
            d_clients_application_routes_stage: {
                select: {
                    s_routes_stage_id: true
                }
            },
            d_clients_application_products: {
                include: {
                    d_clients_application_pay_detail: {
                        select: {
                            sum_pay: true
                        }
                    }
                }
            },
        }
    }).then(data => {
        //res.status(200).send(data);
        res.status(200).send(data.map(item => {
            return {
                id: item.id,
                number: item.application_number,
                date: item.application_date.toDateString(),
                time: item.application_time.toTimeString(),
                client: {
                    name: item.d_clients.client_name,
                    address: item.d_clients.address
                },
                total: item.d_clients_application_products.reduce(function (sum, el) {
                    return sum + el.total;
                }, 0),
                paid: item.d_clients_application_products.reduce(function (sum1, el1) {
                    return sum1 + el1.d_clients_application_pay_detail.reduce(function (sum2, el2) {
                        return sum2 + el2.sum_pay;
                    }, 0);
                }, 0),
            };
        }));
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error"
        });
    });
};