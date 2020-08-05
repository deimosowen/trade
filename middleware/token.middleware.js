const jwt = require('jsonwebtoken');
const config = require('../config/token.config')
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

module.exports = tokenMiddleware;