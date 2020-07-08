/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_companies_products', {
    'id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      comment: "Первичный ключ",
      primaryKey: true
    },
    'd_products_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Товар"
    },
    'd_companies_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Компания"
    },
    'code': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Код"
    },
    'd_companies_products_types_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Вид товара"
    }
  }, {
    tableName: 'd_companies_products'
  });
};
