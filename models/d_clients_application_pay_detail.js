/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_clients_application_pay_detail', {
    'id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      comment: "Первичный ключ",
      primaryKey: true
    },
    'd_clients_application_pay_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Оплата к продукции в заявке"
    },
    'd_clients_application_products_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Продукции в заявке"
    },
    'sum_pay': {
      type: DataTypes.DOUBLE,
      allowNull: false,
      comment: "Сумма оплаты"
    }
  }, {
    tableName: 'd_clients_application_pay_detail'
  });
};