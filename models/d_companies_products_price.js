/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_companies_products_price', {
    'id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      comment: "Первичный ключ",
      primaryKey: true
    },
    'd_companies_products_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Продукция представителя",
      references: {
          'model': 'd_companies_products',
          'key': 'd_companies_products_id'
      }
    },
    'd_companies_clients_category_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Категории клиента",
      references: {
          'model': 'd_companies_clients_category',
          'key': 'd_companies_clients_category_id'
      }
    },
    'price': {
      type: DataTypes.DOUBLE,
      allowNull: false,
      comment: "Стоимость"
    },
    'date_start': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Дата начала"
    },
    'date_stop': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Дата окончания"
    }
  }, {
    tableName: 'd_companies_products_price'
  });
};
