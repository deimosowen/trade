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
      comment: "Компания"
    },
    'd_companies_clients_category_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Категория клиента"
    },
    'd_clients_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Клиент"
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
