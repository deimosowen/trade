/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s_currency', {
    'id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      comment: "Первичный ключ",
      primaryKey: true
    },
    'code': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Код"
    },
    'currency_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Наименование"
    }
  }, {
    tableName: 's_currency'
  });
};
