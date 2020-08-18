const jwt = require('jsonwebtoken');
const config = require('../config/token.config');
const { d_companies_products } = require('../prisma');
const tokenMiddleware = new TokenMiddleware();

function TokenMiddleware() {
    this.secretKey = config.secretKey;
    this.options = config.options;
    this.buffer = Buffer.from(this.secretKey, 'base64');
}

TokenMiddleware.prototype.sign = function (payload, signOptions) {
    const jwtSignOptions = Object.assign({}, signOptions, this.options);
    return jwt.sign(payload, this.buffer, jwtSignOptions);
}

TokenMiddleware.prototype.verify = function (token, done) {
    jwt.verify(token, this.buffer, function (err, decoded) {
        if (err)
            return done(null, false);
        return done(null, {});
    });
}

TokenMiddleware.prototype.refresh = function (token, refreshOptions) {
    const payload = jwt.verify(token, this.buffer); // const payload = jwt.verify(token, this.secretKey, refreshOptions.verify);
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.sub;
    delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
    const jwtSignOptions = Object.assign({}, refreshOptions, this.options);
    return jwt.sign(payload, this.buffer, jwtSignOptions);
}

module.exports = tokenMiddleware;