const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
        define: {
            timestamps: false
        },
        logging: dbConfig.logging
    });

const fs = require('fs'),
    path = require('path'),
    db = {},
    tableModel = {};

fs.readdirSync(__dirname).filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize);
        tableModel[model.name] = model;
    });

Object.getOwnPropertyNames(sequelize.models).forEach(function (modelName) {
    const currentModel = sequelize.models[modelName];
    Object.getOwnPropertyNames(currentModel.rawAttributes).forEach(function (attributeName) {
        if (Object.prototype.hasOwnProperty.call(currentModel.rawAttributes[attributeName], "references") &&
            Object.prototype.hasOwnProperty.call(currentModel.rawAttributes[attributeName].references, "model") &&
            Object.prototype.hasOwnProperty.call(currentModel.rawAttributes[attributeName].references, "key")) {
            if (!(currentModel.rawAttributes[attributeName].references.model &&
                currentModel.rawAttributes[attributeName].references.key)) {
                return;
            }
            const referencedTable = tableModel[currentModel.rawAttributes[attributeName].references.model];
            currentModel.belongsTo(referencedTable, { foreignKey: attributeName });
            referencedTable.hasMany(currentModel, { foreignKey: attributeName });
        }
    });
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;