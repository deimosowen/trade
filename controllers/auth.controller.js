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

    var user = await context.d_user.findOne({
        where: { email: email },
        include: {
            s_role: true
        }
    });

    if (!user)
        return res.status(400).send('incorrect email or password');

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send('incorrect email or password');

    return res.status(200).json({
        token: tokenMiddleware.sign({
            user: {
                id: user.id,
                client_id: user.d_clients_id,
                name: user.user_name,
                role: user.s_role.role_name
            }
        })
    });
};