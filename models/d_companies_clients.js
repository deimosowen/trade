/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_companies_clients', {
    'id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      comment: "Первичный ключ",
      primaryKey: true
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
    'd_companies_clients_category_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Категория клиента",
      references: {
          'model': 'd_companies_clients_category',
          'key': 'd_companies_clients_category_id'
      }
    },
    'd_clients_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Клиент",
      references: {
          'model': 'd_clients',
          'key': 'd_clients_id'
      }
    },
    'date_add': {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "Дата добавления"
    }
  }, {
    tableName: 'd_companies_clients'
  });
};
