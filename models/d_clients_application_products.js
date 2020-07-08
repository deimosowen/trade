/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_clients_application_products', {
    'id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      comment: "Первичный ключ",
      primaryKey: true
    },
    'd_clients_application_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Заявка"
    },
    'd_representatives_products_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Продукция представителя"
    },
    'product_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Наименование продукции"
    },
    'd_companies_clients_category_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Категория клиента"
    },
    'price': {
      type: DataTypes.DOUBLE,
      allowNull: false,
      comment: "Стоимость"
    },
    'count_product': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Количество продукции"
    },
    'total': {
      type: DataTypes.DOUBLE,
      allowNull: false,
      comment: "Всего (кол-во * стоимость)"
    }
  }, {
    tableName: 'd_clients_application_products'
  });
};
