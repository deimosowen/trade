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
      comment: "Товар",
      references: {
          'model': 'd_products',
          'key': 'd_products_id'
      }
    },
    'd_companies_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Компания",
      references: {
          'model': 'd_companies',
          'key': 'd_companies_id'
      }
    },
    'code': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Код"
    },
    'd_companies_products_types_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Вид товара",
      references: {
          'model': 'd_companies_products_types',
          'key': 'd_companies_products_types_id'
      }
    }
  }, {
    tableName: 'd_companies_products'
  });
};
