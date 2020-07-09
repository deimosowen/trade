module.exports = {
    HOST: "192.168.35.89",
    USER: "postgres",
    PASSWORD: "1234567890",
    DB: "Trade",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
};