const context = require('../prisma');
const { validationResult } = require('express-validator');

exports.findClientsAll = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    context.d_clients.findMany().then(data => {
        res.status(200).send(data.map(item => {
            return {
                id: item.id,
                name: item.client_name,
                address: item.address,
                email: item.email,
                phone: item.phone_number1
            };
        }));
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error"
        });
    });
};

exports.findClientsApplicationAll = (req, res) => {
    const companyId = req.query.company_id,
        stageId = req.query.stage_id,
        errors = validationResult(req);
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
        res.status(200).send(data.map(item => {
            return {
                id: item.id,
                number: item.application_number,
                date: item.application_date.toDateString(),
                time: item.application_time.toTimeString(),
                client: {
                    name: item.d_clients.client_name,
                    address: item.d_clients.address,
                    email: item.d_clients.email,
                    phone: item.d_clients.phone_number1,
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

exports.createClientsApplication = (req, res) => {
    console.log(req.body);
    const clientId = req.body.client_id,
        products = req.body.products,
        errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    let curentData = new Date();
    context.d_clients_application.create({
        data: {
            application_date: curentData,
            application_time: curentData,
            date_execution: new Date(curentData.setTime(curentData.getTime() + 30 * 86400000)),
            d_clients: {
                connect: {
                    id: clientId
                }
            },
            d_clients_application_products: {
                create: products.map(function (val) {
                    return {
                        count_product: val.count,
                        d_companies_products: {
                            connect: {
                                id: val.id
                            }
                        }
                    }
                })
            }
        }
    }).then(data => {
        return res.status(200).send({
            id: data.id,
            number: data.application_number
        });
    }).catch(err => {
        return res.status(500).send({
            message:
                err.message || "Error"
        });
    });
};

exports.findClientsApplicationPayById = (req, res) => {
    const applicationId = req.query.application_id,
        errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    context.d_clients_application_pay.findMany({
        where: {
            d_clients_application_id: applicationId
        }
    }).then(data => {
        res.status(200).send(data.map(item => {
            return {
                id: item.id,
                number: item.pay_number,
                date: item.pay_date.toLocaleDateString(),
                sum_pay: item.sum_pay,
            };
        }));
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error"
        });
    });
};

exports.createClientsApplicationPay = (req, res) => {
    const applicationId = req.body.application_id,
        userId = req.body.user_id,
        sumPay = req.body.sum_pay,
        errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    context.d_clients_application_pay.create({
        data: {
            d_clients_application: {
                connect: {
                    id: applicationId
                },
            },
            sum_pay: parseInt(sumPay),
            pay_date: new Date(),
            d_user: {
                connect: {
                    id: userId
                }
            },
        }
    }).then(data => {
        return res.status(200).send({
            id: data.id,
            number: data.pay_number,
            date: data.pay_date,
            sum_pay: data.sum_pay
        });
    }).catch(err => {
        return res.status(500).send({
            message:
                err.message || "Error"
        });
    });
};

exports.findClientsApplicationProductsById = (req, res) => {
    const applicationId = req.query.application_id,
        errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    context.d_clients_application_products.findMany({
        where: {
            d_clients_application_id: applicationId
        },
        include: {
            d_clients_application: true,
            d_clients_application_pay_detail: {
                select: {
                    sum_pay: true
                }
            }
        }
    }).then(data => {
        res.status(200).send(data.map(item => {
            return {
                id: item.id,
                name: item.product_name,
                date: item.d_clients_application.application_date.toLocaleDateString(),
                time: item.d_clients_application.application_time.toLocaleTimeString(),
                count: item.count_product,
                price: item.price,
                paid: item.d_clients_application_pay_detail.reduce(function (sum, el) {
                    return sum + el.sum_pay;
                }, 0)
            };
        }));
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error"
        });
    });
};

exports.findClientsApplicationStagesById = (req, res) => {
    const applicationId = req.query.application_id,
        errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    context.d_clients_application_routes_stage.findMany({
        where: {
            d_clients_application_id: applicationId
        },
        include: {
            s_routes_stage: {
                select: {
                    stage_name: true
                }
            },
        }
    }).then(data => {
        res.status(200).send(data.map(item => {
            return {
                id: item.id,
                stage: {
                    id: item.s_routes_stage_id,
                    name: item.s_routes_stage.stage_name
                },
                user: {
                    id: item.d_user_id,
                    name: item.user_name
                },
                date: item.stage_date.toLocaleDateString(),
                time: item.stage_time.toLocaleTimeString(),
            };
        }).sort(function (a, b) {
            if (`${a.date + a.time}` < `${b.date + b.time}`) return 1;
            if (`${a.date + a.time}` > `${b.date + b.time}`) return -1;
            return 0;
        }));
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error"
        });
    });
};

exports.createClientsApplicationStages = (req, res) => {
    const applicationId = req.body.application_id,
        userId = req.body.user_id,
        stageId = req.body.stage_id,
        errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    context.d_clients_application_routes_stage.create({
        data: {
            d_clients_application: {
                connect: {
                    id: applicationId
                }
            },
            d_user: {
                connect: {
                    id: userId
                }
            },
            s_routes_stage: {
                connect: {
                    id: parseInt(stageId)
                }
            },
            user_name: '',
            count_day_execution: 0,
            stage_date: new Date(),
            stage_time: new Date()
        }
    }).then(data => {
        return res.status(200).send("Запись добавлена");
    }).catch(err => {
        return res.status(500).send({
            message:
                err.message || "Error"
        });
    });
}; 