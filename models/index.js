const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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
  }
});

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.clients = require("./d_clients.js")(sequelize, Sequelize);
//db.clientsApplication = require("./d_clients_application.js")(sequelize, Sequelize);
//db.clientsApplicationPay = require("./d_clients_application_pay.js")(sequelize, Sequelize);
//db.clientsApplicationPayDetail = require("./d_clients_application_pay_detail.js")(sequelize, Sequelize);
//db.clientsApplicationProducts = require("./d_clients_application_products.js")(sequelize, Sequelize);
//db.clientsApplicationRoutesStage = require("./d_clients_application_routes_stage.js")(sequelize, Sequelize);

//db.companies = require("./d_companies.js")(sequelize, Sequelize); 
//db.companiesClients = require("./d_companies_clients.js")(sequelize, Sequelize);
//db.companiesClientsCategory = require("./d_companies_clients_category.js")(sequelize, Sequelize);
//db.companiesProducts = require("./d_companies_products.js")(sequelize, Sequelize);
//db.companiesProductsPrice = require("./d_companies_products_price.js")(sequelize, Sequelize);
//db.companiesProductsTypes = require("./d_companies_products_types.js")(sequelize, Sequelize);
//db.companiesRoutesStage = require("./d_companies_routes_stage.js")(sequelize, Sequelize);

//db.manufacturers = require("./d_manufacturers.js")(sequelize, Sequelize);
//db.products = require("./d_products.js")(sequelize, Sequelize);
//db.user = require("./d_user.js")(sequelize, Sequelize);

//db.addressCountries = require("./s_address_countries.js")(sequelize, Sequelize);
//db.addressLocalities = require("./s_address_localities.js")(sequelize, Sequelize);
//db.addressRegions = require("./s_address_regions.js")(sequelize, Sequelize);
//db.currency = require("./s_currency.js")(sequelize, Sequelize);
//db.payTerm = require("./s_pay_term.js")(sequelize, Sequelize);
//db.role = require("./s_role.js")(sequelize, Sequelize);
//db.routesStage = require("./s_routes_stage.js")(sequelize, Sequelize);
//db.routesStageNext = require("./s_routes_stage_next.js")(sequelize, Sequelize);
//db.unitMeasure = require("./s_unit_measure.js")(sequelize, Sequelize);

//db.companies.belongsTo(db.addressLocalities, { foreignKey: 's_address_localities_id' });
//db.addressLocalities.hasMany(db.companies, { foreignKey: 's_address_localities_id' });

const tableModel = {};

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

module.exports = db;