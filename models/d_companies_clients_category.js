/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_companies_clients_category', {
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
    'category_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Наименование категории"
    }
  }, {
    tableName: 'd_companies_clients_category'
  });
};
