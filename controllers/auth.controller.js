const context = require('../prisma');
const { validationResult } = require('express-validator');
const tokenMiddleware = require('../middleware/token.middleware');
const bcrypt = require('bcrypt');

exports.getToken = async (req, res) => {
    const email = req.body.email,
        password = req.body.password,
        errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    var account = await context.s_accounts.findOne({
        where: { login: email },
        include: {
            d_user: true,
            d_clients: true,
            s_role: true
        }
    });

    if (!account)
        return res.status(400).send('incorrect email or password');

    if (!await bcrypt.compare(password, account.password))
        return res.status(400).send('incorrect email or password');

    return res.status(200).json({
        token: tokenMiddleware.sign({
            client: account.d_clients.map((client) => {
                return {
                    id: client.id,
                    name: client.client_name,
                }
            })[0],
            user: account.d_user.map((user) => {
                return {
                    id: user.id,
                    name: user.user_name,
                    job: user.job_pos_name,
                }
            })[0],
            role: account.s_role.role_name
        })
    });
};

exports.refreshToken = async (req, res) => {
    const token = req.body.token,
        errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    var result = tokenMiddleware.refresh(token);

    return res.status(200).json(result);
};